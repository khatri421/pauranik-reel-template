// Makes reels/example/voice.mp3 (or the path given): a synthetic hum in 10 phrase-shaped bursts with pauses between them.
// It is NOT a real voice. It only exists so the pipeline can be tested end to end.
// Replace it with your own voiceover (reels/<naam>/voice.mp3).
import {execFileSync} from 'node:child_process';

const phrases = [1.3, 1.35, 1.45, 1.2, 1.4, 1.2, 1.45, 1.3, 1.1, 1.05];
let t = 0.35;
const gates = [];
for (const d of phrases) {
	gates.push(`between(t\\,${t.toFixed(2)}\\,${(t + d).toFixed(2)})`);
	t += d + 0.6;
}
const total = (t + 0.2).toFixed(2);
// A 150 Hz buzz with a 5 Hz "syllable" wobble, so the mouths open and close.
const expr = `(${gates.join('+')})*0.35*(0.55+0.45*sin(2*PI*5*t))*(sin(2*PI*150*t)+0.5*sin(2*PI*300*t)+0.25*sin(2*PI*450*t))`;
execFileSync('ffmpeg', ['-v', 'error', '-y', '-f', 'lavfi', '-i', `aevalsrc=${expr}:s=44100:d=${total}`, '-ac', '1', '-b:a', '96k', process.argv[2] ?? 'reels/example/voice.mp3']);
console.log(`${process.argv[2] ?? 'reels/example/voice.mp3'} (${total}s placeholder, ${phrases.length} phrases)`);
