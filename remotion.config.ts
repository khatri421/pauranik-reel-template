import {Config} from '@remotion/cli/config';

Config.setEntryPoint('src/index.ts');
Config.setVideoImageFormat('jpeg');
Config.setCodec('h264');
// crf 23 keeps a 15-60 s reel at a few MB, far under GitHub's 100 MB file limit.
Config.setCrf(23);
// The cloud machine has ~4 CPUs; 2 tabs at once is safe for memory. Override with REEL_CONCURRENCY.
Config.setConcurrency(Number(process.env.REEL_CONCURRENCY ?? 2));
Config.setOverwriteOutput(true);

// Claude Code cloud sessions ship Chrome for Testing and set CHROME_PATH.
// Full Chrome needs the new headless mode, so switch the Chrome mode with it.
// Without CHROME_PATH (e.g. on a laptop) Remotion downloads its own headless shell once.
if (process.env.CHROME_PATH) {
	Config.setBrowserExecutable(process.env.CHROME_PATH);
	Config.setChromeMode('chrome-for-testing');
}
