// Usage: node scripts/timing.mjs <voice.wav> <script.txt> <out.json>
// Times the subtitles without any speech-recognition model:
//  1. ffmpeg silencedetect splits the (tightened) voice into speech blocks.
//  2. The words of script.txt are spread over those blocks.
//     If script.txt has exactly one line per block, each line goes to its own block.
//     Otherwise words are spread over the total speech time by their length.
//  3. One spoken phrase per line; blank lines separate scenes. No blank lines at all -> every line is a scene.
//  4. An optional first line starting with "#" is the small title tag at the top.
import {execFileSync, spawnSync} from 'node:child_process';
import {readFileSync, writeFileSync} from 'node:fs';

const [voice, scriptPath, out] = process.argv.slice(2);
const MAX_WORDS = 6;

const duration = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', voice]).toString().trim());
const log = spawnSync('ffmpeg', ['-hide_banner', '-nostats', '-i', voice, '-af', 'silencedetect=noise=-35dB:d=0.12', '-f', 'null', '-']).stderr.toString();
const sStarts = [...log.matchAll(/silence_start: (-?[\d.]+)/g)].map((m) => Math.max(0, Number(m[1])));
const sEnds = [...log.matchAll(/silence_end: ([\d.]+)/g)].map((m) => Number(m[1]));

// Speech blocks = the spaces between silences.
let blocks = [];
let cur = 0;
sStarts.forEach((s, i) => {
	if (s - cur > 0.05) blocks.push({start: cur, end: s});
	cur = sEnds[i] ?? duration;
});
if (duration - cur > 0.05) blocks.push({start: cur, end: duration});
// Very short blips (a click, a breath) join the previous block.
blocks = blocks.reduce((acc, b) => {
	if (acc.length && b.end - b.start < 0.15) acc[acc.length - 1].end = b.end;
	else acc.push({...b});
	return acc;
}, []);
if (!blocks.length) blocks = [{start: 0, end: duration}];

// Read the script: title, lines, words.
const raw = readFileSync(scriptPath, 'utf8').replace(/^\uFEFF/, '').replace(/\r/g, '');
let title = '';
const body = raw.split('\n').filter((l) => {
	if (!title && l.trim().startsWith('#')) {
		title = l.trim().replace(/^#+\s*/, '');
		return false;
	}
	return true;
});
// One spoken phrase per line; a blank line starts the next scene.
const lines = [];
let scene = 0;
let open = false;
for (const l of body) {
	if (!l.trim()) {
		if (open) scene++;
		open = false;
		continue;
	}
	open = true;
	lines.push({scene, words: l.trim().split(/\s+/)});
}
if (!lines.length) throw new Error('script.txt khaali hai. Isme apni voice ke shabd likho (Roman Hinglish).');
// No blank lines at all: every line is its own scene.
if (scene === 0) lines.forEach((l, i) => (l.scene = i));
const sceneCount = Math.max(...lines.map((l) => l.scene)) + 1;
const perBlock = lines.length === blocks.length;

const weight = (w) => w.replace(/[^\p{L}\p{N}]/gu, '').length + 2;
const words = []; // {text, line, block, t}
lines.forEach((l, li) => l.words.forEach((text) => words.push({text, line: li, block: li, t: 0})));

// Spread a list of words across [a, b] by their length.
const spread = (list, a, b) => {
	const total = list.reduce((s, w) => s + weight(w.text), 0);
	let acc = 0;
	for (const w of list) {
		w.t = a + ((b - a) * acc) / total;
		acc += weight(w.text);
	}
};

if (perBlock) {
	lines.forEach((_, li) => spread(words.filter((w) => w.line === li), blocks[li].start, blocks[li].end));
} else {
	// Glue the blocks into one speech timeline, spread every word on it, then map back to real time.
	const speech = blocks.reduce((s, b) => s + (b.end - b.start), 0);
	spread(words, 0, speech);
	for (const w of words) {
		let left = w.t;
		for (let bi = 0; bi < blocks.length; bi++) {
			const b = blocks[bi];
			const len = b.end - b.start;
			// A word that would start in the last 0.08 s of a block moves to the next block.
			if (left < len - 0.08 || bi === blocks.length - 1) {
				w.t = b.start + Math.min(left, len);
				w.block = bi;
				break;
			}
			left = Math.max(0, left - len);
		}
	}
}

// Subtitle groups: words of one script line inside one speech block, at most MAX_WORDS at a time.
const groups = [];
let run = [];
const flush = () => {
	// Split long lines into even pieces (7 words -> 4 + 3, not 6 + 1).
	const pieces = Math.ceil(run.length / MAX_WORDS);
	const size = Math.ceil(run.length / pieces);
	for (let i = 0; i < run.length; i += size) groups.push(run.slice(i, i + size));
	run = [];
};
for (const w of words) {
	if (run.length && (run[0].line !== w.line || run[0].block !== w.block)) flush();
	run.push(w);
}
flush();
const subtitle = groups.map((g, i) => {
	const last = g[g.length - 1];
	const next = groups[i + 1]?.[0].t ?? duration;
	return {end: Math.round(Math.min(next, Math.max(blocks[last.block].end, last.t + 0.3)) * 100) / 100, w: g.map((w) => [w.text, Math.round(w.t * 100) / 100])};
});

// Scenes: scene k starts at the first word of its first line; scene 0 starts at 0.
const shots = Array.from({length: sceneCount}, (_, k) => {
	const first = words.find((w) => lines[w.line].scene === k);
	return {at: k === 0 ? 0 : Math.round(first.t * 100) / 100, text: lines.filter((l) => l.scene === k).map((l) => l.words.join(' ')).join(' / ')};
});

const result = {duration: Math.round((duration + 0.4) * 100) / 100, title, blocks: blocks.length, mode: perBlock ? 'line-per-block' : 'spread', shots, subtitle};
writeFileSync(out, JSON.stringify(result, null, 1));
console.log(`${blocks.length} speech blocks, ${lines.length} script lines (${result.mode}), ${words.length} words, ${shots.length} scenes -> ${out}`);
if (!perBlock) console.log(`Tip: subtitles sabse sahi tab baithte hain jab script.txt ki lines (${lines.length}) = voice ke phrases (${blocks.length}).`);
