// Usage: node scripts/tighten-audio.mjs <input> <output.wav> [gapSeconds]
// Shortens every pause in a voiceover to a fixed gap and brings it to reel loudness.
// Cuts land in the middle of silence, so no word or breath tail gets clipped.
import {execFileSync, spawnSync} from 'node:child_process';

const [input, output, gapArg = '0.2'] = process.argv.slice(2);
const gap = Number(gapArg);
const duration = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', input]).toString().trim());
const log = spawnSync('ffmpeg', ['-hide_banner', '-nostats', '-i', input, '-af', 'silencedetect=noise=-35dB:d=0.1', '-f', 'null', '-']).stderr.toString();
const starts = [...log.matchAll(/silence_start: ([\d.]+)/g)].map((m) => Number(m[1]));
const ends = [...log.matchAll(/silence_end: ([\d.]+)/g)].map((m) => Number(m[1]));

const keep = [];
let cursor = 0;
starts.forEach((s, i) => {
	const e = ends[i] ?? duration;
	if (s <= 0.001) {
		cursor = Math.max(0, e - 0.03);
	} else if (e >= duration - 0.01) {
		keep.push([cursor, s + 0.08]);
		cursor = duration;
	} else if (e - s > gap) {
		keep.push([cursor, s + gap / 2]);
		cursor = e - gap / 2;
	}
});
if (cursor < duration) keep.push([cursor, duration]);

const parts = keep.map(([a, b], i) => `[0:a]atrim=${a.toFixed(4)}:${b.toFixed(4)},asetpts=N/SR/TB,afade=t=in:d=0.004,afade=t=out:st=${(b - a - 0.004).toFixed(4)}:d=0.004[s${i}]`);
const labels = keep.map((_, i) => `[s${i}]`).join('');
const filter = `${parts.join(';')};${labels}concat=n=${keep.length}:v=0:a=1,loudnorm=I=-15:TP=-1.5:LRA=9,aresample=44100[out]`;
execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', input, '-filter_complex', filter, '-map', '[out]', output]);
const after = execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', output]).toString().trim();
console.log(`${duration.toFixed(2)}s -> ${Number(after).toFixed(2)}s, ${keep.length} speech blocks`);
