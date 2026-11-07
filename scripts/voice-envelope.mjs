// Usage: node scripts/voice-envelope.mjs <voice.wav> <out.json> [fps]
// Writes one loudness value (0..1) per video frame, used to open characters' mouths in sync.
import {execFileSync} from 'node:child_process';
import {writeFileSync} from 'node:fs';
const [src, out, fpsArg = '30'] = process.argv.slice(2);
const fps = Number(fpsArg);
const SR = 48000;
const pcm = execFileSync('ffmpeg', ['-v', 'error', '-i', src, '-ac', '1', '-ar', String(SR), '-f', 's16le', '-'], {maxBuffer: 1 << 28});
const per = SR / fps;
const n = Math.floor(pcm.length / 2 / per);
const rms = [];
for (let f = 0; f < n; f++) {
	let s = 0;
	for (let i = 0; i < per; i++) {
		const v = pcm.readInt16LE((f * per + i) * 2) / 32768;
		s += v * v;
	}
	rms.push(Math.sqrt(s / per));
}
const sorted = [...rms].sort((a, b) => a - b);
const hi = sorted[Math.floor(sorted.length * 0.97)];
const lo = sorted[Math.floor(sorted.length * 0.3)];
writeFileSync(out, JSON.stringify(rms.map((v) => Math.round(Math.max(0, Math.min(1, (v - lo) / (hi - lo))) * 100) / 100)));
console.log(`${n} frames -> ${out}`);
