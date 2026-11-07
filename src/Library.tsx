import React from 'react';
import {AbsoluteFill} from 'remotion';
import {BACKGROUNDS, BgName} from './art/Backgrounds';
import {Figure, INK, Kind, KINDS, pose, Prop, RigDefs} from './art/Rig';
import {F} from './art/World';
import {baloo} from './Reel';

// Contact sheet of every character and background: `npm run library` -> docs/library.png
export const LIB_W = 1800;
export const LIB_H = 3100;

const PROPS: Partial<Record<Kind, Prop>> = {ram: 'bow', lakshman: 'bow', arjun: 'bow', hanuman: 'mace', bear: 'mace', ravan: 'sword', shiv: 'trishul', devi: 'lotus', rishi: 'staff', sainik: 'spear', krishna: 'flute', surya: 'lotus'};
const POSES: Partial<Record<Kind, ReturnType<typeof pose>>> = {
	devi: pose({armF: [60, 120], smile: 0.8}),
	shiv: pose({armF: [40, 150], smile: 0.4}),
	rishi: pose({armF: [40, 150]}),
	sainik: pose({armF: [40, 150]}),
	sita: pose({armF: [28, 150], armB: [22, 146], hand: 'namaste', smile: 0.5}),
	ravan: pose({armF: [40, 140], neck: -4}),
	hanuman: pose({armF: [16, 40], smile: 0.6}),
	krishna: pose({armF: [70, 160], smile: 0.7}),
	surya: pose({armF: [60, 120], smile: 0.5}),
};
const SHIFT: Partial<Record<Kind, number>> = {ravan: 70, hanuman: 30};

const label = (text: string, size = 30): React.CSSProperties => ({fontFamily: baloo, fontWeight: 800, fontSize: size, color: INK, textAlign: 'center'});

const Heading: React.FC<{y: number; text: string; sub: string}> = ({y, text, sub}) => (
	<div style={{position: 'absolute', top: y, left: 0, right: 0, textAlign: 'center'}}>
		<div style={{...label(text, 64), color: F.maroon, WebkitTextStroke: `2px ${INK}`}}>{text}</div>
		<div style={{...label(sub, 28), opacity: 0.75}}>{sub}</div>
	</div>
);

export const Library: React.FC = () => {
	const cols = 7;
	const cw = 236;
	const ch = 430;
	const gx = (LIB_W - cols * cw) / 2;
	const top = 230;
	const bgTop = top + Math.ceil(KINDS.length / cols) * (ch + 20) + 40;
	const bgNames = Object.keys(BACKGROUNDS) as BgName[];
	const bw = 300;
	const bh = 533;
	const bcols = 5;
	const bgx = (LIB_W - bcols * bw - (bcols - 1) * 40) / 2;
	return (
		<AbsoluteFill style={{background: F.paper}}>
			<svg width={0} height={0} style={{position: 'absolute'}}>
				<RigDefs />
			</svg>
			<Heading y={50} text="CHARACTERS" sub='kind="..." - src/art/Rig.tsx' />
			{KINDS.map((k, i) => {
				const x = gx + (i % cols) * cw;
				const y = top + Math.floor(i / cols) * (ch + 20);
				return (
					<div key={k} style={{position: 'absolute', left: x + 8, top: y, width: cw - 16, height: ch, background: F.cream, border: `5px solid ${INK}`, borderRadius: 18, overflow: 'hidden'}}>
						<svg width={cw - 26} height={ch - 70} viewBox={`0 0 ${cw - 26} ${ch - 70}`}>
							<rect x={0} y={ch - 70 - 46} width={cw} height={60} fill={F.sand} />
							<Figure kind={k} p={POSES[k] ?? pose({smile: 0.4})} x={(cw - 26) / 2 + (SHIFT[k] ?? 0) * 0.3} y={ch - 70 - 30} s={0.3} prop={PROPS[k] ?? 'none'} />
						</svg>
						<div style={{...label(k, 34), position: 'absolute', bottom: 8, left: 0, right: 0}}>{k}</div>
					</div>
				);
			})}
			<Heading y={bgTop} text="BACKGROUNDS" sub="<Jungle t={t} /> ... - src/art/Backgrounds.tsx" />
			{bgNames.map((name, i) => {
				const Bg = BACKGROUNDS[name] as React.FC<{t: number}>;
				const x = bgx + (i % bcols) * (bw + 40);
				const y = bgTop + 170 + Math.floor(i / bcols) * (bh + 90);
				return (
					<div key={name} style={{position: 'absolute', left: x, top: y, width: bw, height: bh + 60}}>
						<svg width={bw} height={bh} viewBox="0 0 1080 1920" style={{border: `5px solid ${INK}`, borderRadius: 14, boxSizing: 'content-box', background: F.paper}}>
							<Bg t={1.3} />
						</svg>
						<div style={{...label(name, 34), marginTop: 6}}>{name}</div>
					</div>
				);
			})}
			<svg width={LIB_W} height={LIB_H} style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
				<rect x={12} y={12} width={LIB_W - 24} height={LIB_H - 24} fill="none" stroke={F.maroon} strokeWidth={24} />
				<rect x={12} y={12} width={LIB_W - 24} height={LIB_H - 24} fill="none" stroke={F.cream} strokeWidth={6} strokeDasharray="2 22" strokeLinecap="round" />
				<rect x={26} y={26} width={LIB_W - 52} height={LIB_H - 52} fill="none" stroke={INK} strokeWidth={5} />
			</svg>
		</AbsoluteFill>
	);
};
