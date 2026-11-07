import {loadFont as loadBaloo} from '@remotion/google-fonts/Baloo2';
import {Audio} from '@remotion/media';
import React from 'react';
import {AbsoluteFill, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {pop, overshoot, ramp, snappy} from './art/anim';
import {INK, RigDefs} from './art/Rig';
import {F} from './art/World';
import env from './generated/env.json';
import {CHIP, SCENES} from './generated/current';
import timing from './generated/timing.json';

// The shared reel engine: frame, subtitles, title, chip, camera and voice.
// The story's scenes come from src/reels/<naam>.tsx (picked by `npm run reel -- <naam>` via src/generated/current.ts).
type Timing = {duration: number; title: string; shots: {at: number}[]; subtitle: {end: number; w: [string, number][]}[]};
const T = timing as unknown as Timing;
const envData = env as number[];

export const baloo = loadBaloo('normal', {weights: ['800'], subsets: ['latin', 'devanagari']}).fontFamily;

// Hinglish subtitle at the top: words land one by one, the spoken word in yellow.
const Subtitle: React.FC<{t: number}> = ({t}) => {
	const line = T.subtitle.find((l) => t >= l.w[0][1] && t < l.end + 0.2);
	if (!line) return null;
	return (
		<div style={{position: 'absolute', left: 90, right: 90, top: 190, textAlign: 'center', fontFamily: baloo, fontWeight: 800, fontSize: 64, lineHeight: 1.15}}>
			{line.w.map(([word, at], i) => {
				const on = t >= at;
				const cur = on && (i === line.w.length - 1 || t < line.w[i + 1][1]);
				const k = ramp(t, at, at + 0.12, overshoot);
				return (
					<span key={i} style={{display: 'inline-block', marginRight: 16, opacity: on ? 1 : 0, scale: String(0.7 + 0.3 * k), color: cur ? '#ffd23f' : F.cream, WebkitTextStroke: `12px ${INK}`, paintOrder: 'stroke fill'}}>
						{word}
					</span>
				);
			})}
		</div>
	);
};

const TitleTag: React.FC = () =>
	T.title ? (
		<div style={{position: 'absolute', top: 104, left: 0, right: 0, textAlign: 'center', fontFamily: baloo, fontWeight: 800, fontSize: 30, letterSpacing: 4, color: '#ffd23f', WebkitTextStroke: `8px ${INK}`, paintOrder: 'stroke fill'}}>{T.title}</div>
	) : null;

// Source tag chip (e.g. "LOK KATHA" or "VALMIKI RAMAYAN"), shown for a few seconds near the start.
const Chip: React.FC<{t: number; text: string}> = ({t, text}) => {
	const s = pop(t, 1.2, 4.4);
	if (s <= 0 || !text) return null;
	return <div style={{position: 'absolute', top: 368, left: 540, translate: '-50% 0', scale: String(s), fontFamily: baloo, fontWeight: 800, fontSize: 32, letterSpacing: 3, color: F.cream, background: F.maroon, border: `5px solid ${INK}`, borderRadius: 40, padding: '2px 30px', whiteSpace: 'nowrap'}}>{text}</div>;
};

// Folk frame: maroon border with white dots, and burnt paper edges.
const Frame: React.FC = () => (
	<svg width={1080} height={1920} style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
		<defs>
			<radialGradient id="burn" cx="0.5" cy="0.5" r="0.75">
				<stop offset="0.62" stopColor="#3a1a08" stopOpacity="0" />
				<stop offset="1" stopColor="#3a1a08" stopOpacity="0.7" />
			</radialGradient>
			<filter id="grainS">
				<feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={3} seed={3} />
				<feColorMatrix values="0 0 0 0 0.35  0 0 0 0 0.22  0 0 0 0 0.1  0 0 0 1.3 -0.3" />
			</filter>
		</defs>
		<rect width={1080} height={1920} filter="url(#grainS)" opacity={0.28} style={{mixBlendMode: 'multiply'}} />
		<rect width={1080} height={1920} fill="url(#burn)" />
		<rect x={12} y={12} width={1056} height={1896} fill="none" stroke={F.maroon} strokeWidth={24} />
		<rect x={12} y={12} width={1056} height={1896} fill="none" stroke={F.cream} strokeWidth={6} strokeDasharray="2 22" strokeLinecap="round" />
		<rect x={26} y={26} width={1028} height={1868} fill="none" stroke={INK} strokeWidth={5} />
	</svg>
);

export const Reel: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const t = frame / fps;
	const shots = T.shots.length ? T.shots : [{at: 0}];
	let idx = 0;
	for (let i = 0; i < shots.length; i++) if (t >= shots[i].at) idx = i;
	// Scene k draws line k. If the reel file has fewer scenes than lines, spread them evenly.
	const n = shots.length;
	const m = SCENES.length;
	const sceneIdx = n <= m ? idx : n === 1 ? 0 : Math.round((idx * (m - 1)) / (n - 1));
	const scene = SCENES[sceneIdx];
	const at = shots[idx].at;
	const dur = Math.max(0.5, (shots[idx + 1]?.at ?? T.duration) - at);
	const lt = t - at;
	const talk = Math.min(1, (envData[frame] ?? 0) * 1.1);
	const settle = 1 + 0.04 * (1 - ramp(lt, 0, 0.22, snappy));
	const zoom = settle * (1 + (scene.push ?? 0.06) * (lt / dur));
	const end = T.duration;
	// Hand-drawn "boil": the ink lines shift a touch every 3 frames.
	const seed = Math.floor(frame / 3) % 6;
	return (
		<AbsoluteFill style={{backgroundColor: F.paper, overflow: 'hidden'}}>
			<svg width={0} height={0} style={{position: 'absolute'}}>
				<RigDefs />
				<filter id="boil">
					<feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves={2} seed={seed} />
					<feDisplacementMap in="SourceGraphic" scale={4} />
				</filter>
			</svg>
			<AbsoluteFill style={{scale: String(zoom), transformOrigin: `${scene.fx ?? 540}px ${scene.fy ?? 1100}px`, filter: 'url(#boil)'}}>{scene.draw({t, lt, dur, talk})}</AbsoluteFill>
			<Frame />
			<TitleTag />
			<Subtitle t={t} />
			<Chip t={t} text={CHIP} />
			<Audio src={staticFile('voice.wav')} volume={(f) => 1 - ramp(f / fps, end - 0.25, end)} />
		</AbsoluteFill>
	);
};
