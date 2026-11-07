// npm run preview -- <naam>   -> reels/<naam>/preview.mp4 (first 15 s)
// npm run reel -- <naam>      -> reels/<naam>/reel.mp4    (full length)
// Inputs: reels/<naam>/<any ONE audio file: mp3/m4a/wav/aac/ogg/opus> and reels/<naam>/script.txt
// Scenes: src/reels/<naam>.tsx (one scene per blank-line-separated block of script.txt). Missing -> example scenes are used.
import {execFileSync, spawnSync} from 'node:child_process';
import {existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

process.chdir(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'));
const [mode, nameArg] = process.argv.slice(2);
const PREVIEW_SECONDS = 15;
const step = (msg) => console.log(`\n== ${msg}`);
const fail = (msg) => {
	console.error(`\nERROR: ${msg}`);
	process.exit(1);
};
const run = (cmd, args) => {
	// Windows needs a shell to find npx.cmd; Linux (the cloud) runs it directly.
	const r = process.platform === 'win32' ? spawnSync([cmd, ...args].map((a) => (/\s/.test(a) ? `"${a}"` : a)).join(' '), {stdio: 'inherit', shell: true}) : spawnSync(cmd, args, {stdio: 'inherit'});
	if (r.status !== 0) fail(`"${cmd} ${args.join(' ')}" fail hua (exit ${r.status}).`);
};
const hasFfmpeg = () => {
	try {
		execFileSync('ffmpeg', ['-version'], {stdio: 'ignore'});
		return true;
	} catch {
		return false;
	}
};

// Install what is missing (ffmpeg, npm packages) without touching any environment settings.
if (!hasFfmpeg() || !existsSync('node_modules')) {
	if (process.platform === 'win32') {
		if (!hasFfmpeg()) fail('ffmpeg nahi mila. Windows par: winget install Gyan.FFmpeg');
		step('0/4 npm packages install');
		run('npm', ['ci', '--no-audit', '--no-fund']);
	} else {
		step('0/4 Setup: bash setup.sh (ffmpeg + npm packages)');
		run('bash', ['setup.sh']);
	}
}
if (!hasFfmpeg()) fail('ffmpeg nahi mila. Chalao: bash setup.sh');

if (mode === 'library') {
	step('Character + background contact sheet -> docs/library.png');
	mkdirSync('docs', {recursive: true});
	run('npx', ['remotion', 'still', 'Library', 'docs/library.png']);
	process.exit(0);
}

const reels = existsSync('reels') ? readdirSync('reels').filter((d) => statSync(path.join('reels', d)).isDirectory()) : [];
if (!nameArg) fail(`Reel ka naam do, jaise: npm run ${mode} -- example\nMaujooda reels: ${reels.join(', ') || '(koi nahi)'}`);
const name = nameArg.trim();
// Folder names must be lowercase-with-dashes. Print the exact fix (Claude does the git mv itself).
const slug = (x) => x.toLowerCase().trim().replace(/[^a-z0-9_-]+/g, '-').replace(/^-+|-+$/g, '');
if (!/^[a-z0-9][a-z0-9_-]*$/.test(name)) {
	const real = reels.find((d) => d === name || slug(d) === slug(name)) ?? name;
	fail(`Naam "${name}" me space / capital letters hain. Folder ka naam badlo:\n  git mv "reels/${real}" "reels/${slug(name)}"\nphir: npm run ${mode} -- ${slug(name)}`);
}
const dir = path.join('reels', name);
if (!existsSync(dir)) {
	const near = reels.find((d) => slug(d) === name);
	if (near) fail(`Folder "reels/${near}" ka naam theek karo:\n  git mv "reels/${near}" "reels/${name}"\nphir: npm run ${mode} -- ${name}`);
	fail(`Folder reels/${name} nahi mila. Maujooda reels: ${reels.join(', ')}`);
}
// Any single audio file with any name (phone users cannot easily rename files).
const AUDIO = /\.(mp3|m4a|wav|aac|ogg|opus)$/i;
const audios = readdirSync(dir).filter((f) => AUDIO.test(f) && statSync(path.join(dir, f)).isFile());
if (!audios.length) fail(`reels/${name}/ me koi audio file nahi mili (.mp3 .m4a .wav .aac .ogg .opus). GitHub par isi folder me apni voice upload karo.`);
if (audios.length > 1) fail(`reels/${name}/ me ${audios.length} audio files hain: ${audios.join(', ')}. Sirf ek rakho, baaki delete karo.`);
const voice = audios[0];
if (!existsSync(path.join(dir, 'script.txt'))) fail(`reels/${name}/script.txt nahi mila.`);
for (const d of ['public', 'src/generated']) mkdirSync(d, {recursive: true});

// Point the renderer at this reel's scenes.
const sceneFile = existsSync(`src/reels/${name}.tsx`) ? name : 'example';
if (sceneFile !== name) console.log(`\nNOTE: src/reels/${name}.tsx nahi mila, isliye example ke scenes lag rahe hain. Naye scenes ke liye Claude se bolo: "${name} ke liye naye scenes banao".`);
writeFileSync('src/generated/current.ts', `// Written by scripts/reel.mjs: which reel's scenes to render.\nexport {SCENES, CHIP} from '../reels/${sceneFile}';\nexport const NAME = '${name}';\n`);

step(`1/4 Pauses ko 0.20s tak chhota karna (reels/${name}/${voice})`);
run('node', ['scripts/tighten-audio.mjs', path.join(dir, voice), 'public/voice.wav', '0.2']);

step('2/4 Muh hilane ke liye awaaz ka envelope');
run('node', ['scripts/voice-envelope.mjs', 'public/voice.wav', 'src/generated/env.json', '30']);

step('3/4 Subtitle timing (silence detection + script.txt)');
run('node', ['scripts/timing.mjs', 'public/voice.wav', path.join(dir, 'script.txt'), 'src/generated/timing.json']);

const preview = mode === 'preview';
const out = `reels/${name}/${preview ? 'preview' : 'reel'}.mp4`;
step(`4/4 Video render (1080x1920, 30fps${preview ? `, pehle ${PREVIEW_SECONDS}s` : ''}) -> ${out}`);
const total = Math.max(30, Math.round(JSON.parse(readFileSync('src/generated/timing.json', 'utf8')).duration * 30));
const last = Math.min(total, PREVIEW_SECONDS * 30) - 1;
const t0 = Date.now();
run('npx', ['remotion', 'render', 'Reel', out, ...(preview ? [`--frames=0-${last}`] : []), '--log=warn']);
const mb = statSync(out).size / 1e6;
console.log(`\nDONE: ${out}  (${mb.toFixed(1)} MB, render ${Math.round((Date.now() - t0) / 1000)}s)`);
if (mb > 95) console.log('WARNING: file 95MB se badi hai, GitHub par push nahi hogi. Voice chhoti karo ya crf badhao.');
