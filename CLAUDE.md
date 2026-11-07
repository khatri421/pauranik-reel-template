# Mythology reel studio - master rules for Claude

The user is a beginner working ONLY from a phone (Claude app Code tab + github.com in the phone browser).
They send short natural-language messages like "hanuman-lanka ka reel banao".

## 0. Never touch the environment
- NEVER change environment settings, network settings or the setup script, and NEVER ask the user to approve environment permissions (a phone cannot approve them).
- If anything is missing (ffmpeg, node_modules), run `bash setup.sh` inside the repo. `npm run preview/reel` already does this by themselves.

## 1. Talk style
- Simple Hinglish, short sentences, ONE step at a time. No jargon. Tell the user exactly what to tap/open.
- After each step say what happened and what comes next.

## 2. Folder layout (do not rename)
- One folder per reel: `reels/<naam>/` containing
  - ONE audio file with ANY name (`.mp3 .m4a .wav .aac .ogg .opus`), e.g. `ElevenLabs_2026-11-07.mp3`. Never ask the user to rename it.
    If there are several audio files, ask which one to use and delete (git rm) the others only after they say so.
  - `script.txt` (the user creates it on github.com with "Create new file" → `reels/<naam>/script.txt`).
- `<naam>` must be lowercase English, numbers, `-` or `_`. If the folder name has spaces or capitals
  (e.g. `reels/Hanuman Lanka/`), FIX IT YOURSELF: `git mv "reels/Hanuman Lanka" reels/hanuman-lanka`, commit, and tell the user the new name.
  The commands print the exact `git mv` line when the name is wrong.
- Outputs: `reels/<naam>/preview.mp4` (first 15 s) and `reels/<naam>/reel.mp4` (full).
- Scenes for a reel: `src/reels/<naam>.tsx` (copy the pattern of `src/reels/example.tsx`). The commands pick it up automatically.
- `reels/example/` is the demo (synthetic hum voice). Never delete it.

## 3. Making a new reel (do all of this without being asked)
1. Read `reels/<naam>/script.txt`. Format:
   - Hinglish in Roman letters, ONE spoken phrase per line. **Blank line = next scene** (a scene may have 1-2 phrase lines).
   - No blank lines at all → every line is its own scene. A `#` first line = small title at the top.
   - The voice was usually made in ElevenLabs from a Devanagari version of the same lines. That is expected:
     subtitles ALWAYS come from `script.txt` (never transcribe the audio, never convert the script to Devanagari).
   - Do not change the user's words. You MAY add/move blank lines so each scene is ~2-3 s (that is how cuts happen every 2-3 s); tell the user if you did.
   Tell the user the scene plan in a short numbered Hinglish list (scene -> what we see).
2. Build `src/reels/<naam>.tsx`: `export const CHIP = '...'` (source tag, e.g. `LOK KATHA`, `VALMIKI RAMAYAN`, `SHIV PURAN`) and
   `export const SCENES: SceneDef[]` with exactly one entry per scene (blank-line block), in order. NEW scenes for this story; do not reuse the example scenes.
3. Pick characters and backgrounds from `LIBRARY.md` (and `docs/library.png`). If a character is missing, draw it in the same folk style by
   adding a `SPEC` entry in `src/art/Rig.tsx` (and new crown/prop if needed), then add it to `LIBRARY.md` and run `npm run library` so it is saved for next time.
   New backgrounds go into `src/art/Backgrounds.tsx` (+ `BACKGROUNDS` map + `LIBRARY.md`).
4. Pass `talk` as `mouth` to whoever is speaking in that line. Animate with `lt` (seconds into the scene): walks, kneels, glows, camera `push`.
5. `npx tsc -p .` must pass.

## 4. Render order (always)
1. `npm run preview -- <naam>` -> `reels/<naam>/preview.mp4`. Commit it (with the scene file and `src/generated/*`) and push.
   Tell the user the exact path: github.com -> repo -> `reels/<naam>/preview.mp4` -> download (⋯ / Download). Ask: "Preview theek hai? OK bolo to full reel banaun."
2. ONLY after the user says OK: `npm run reel -- <naam>` -> `reels/<naam>/reel.mp4`, commit, push, give the path again.
- Render output prints a progress line per frame; that is normal. Do not run both renders at once.

## 5. Git
- Commit and push to the `main` branch when possible (`git push origin HEAD:main`). If that is not allowed, push your branch.
  ALWAYS tell the user which branch has the file and how to switch to it on github.com (branch dropdown at the top of the repo).
- Every video must be under 95 MB (GitHub limit 100 MB). If bigger, raise crf in `remotion.config.ts` or shorten.
- If the repo gets big (`git count-objects -vH`, size-pack > 800 MB), offer to delete old `preview.mp4` files (only with the user's OK).

## 6. Content rules
- Never use borrowed audio, other creators' scripts, or another creator's art/characters. Only the user's own voice/script and this library.
- Folk-painting style only: parchment colours, thick ink outlines, side-profile rig, flat folk patterns, the maroon dotted frame.
- Hinglish word-by-word subtitles in Baloo 2 (handled by `src/Reel.tsx`; do not remove).
- Cut every 2-3 s (one scene per blank-line block). Violence stays non-graphic: no blood; use `Scuffle` dust clouds, fallen crowns, arrows in the ground.
- Always set a source/lok katha chip (`CHIP`).

## Tech notes
- Pipeline (`scripts/reel.mjs`): tighten pauses to 0.20 s -> mouth envelope -> subtitle timing from ffmpeg silencedetect + script.txt (no Whisper) -> Remotion render.
- Subtitles fit best when each script line is one spoken phrase (one pause in the audio). If timing drifts, split/join lines so the line count matches the pauses (the timing step prints both counts).
- `remotion.config.ts` uses `CHROME_PATH` (Chrome for Testing) when set; concurrency 2 (`REEL_CONCURRENCY`).
