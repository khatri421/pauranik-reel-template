import React from 'react';
import {random} from 'remotion';
import {INK} from './Rig';
import {F} from './World';

// Lion in side view, facing right. phase drives the walk; pounce lifts it; down lays it out (cartoon X eyes).
export const Lion: React.FC<{x: number; y: number; s?: number; phase?: number; pounce?: number; down?: number; mani?: boolean; flip?: boolean}> = ({x, y, s = 1, phase = 0, pounce = 0, down = 0, mani, flip}) => {
	const leg = (bx: number, a: number, back: boolean) => (
		<g transform={`translate(${bx} -150) rotate(${a})`}>
			<rect x={-20} y={0} width={40} height={150} rx={18} fill={back ? '#c98a3e' : '#e0a24e'} stroke={INK} strokeWidth={6} />
		</g>
	);
	const sw = Math.sin(phase) * 22;
	let mane = '';
	for (let i = 0; i <= 24; i++) {
		const a = (i / 24) * Math.PI * 2;
		const r = i % 2 ? 80 : 120;
		mane += `${i ? 'L' : 'M'}${Math.cos(a) * r} ${Math.sin(a) * r} `;
	}
	return (
		<g transform={`translate(${x} ${y}) scale(${(flip ? -1 : 1) * s} ${s}) rotate(${-pounce * 18} 0 -40)${down > 0.5 ? ' translate(0 -360) scale(1 -1)' : ''}`}>
			{leg(-110, -sw - pounce * 40, true)}
			{leg(110, sw + pounce * 50, true)}
			<path d={`M-200 -230 Q-280 ${-280 - Math.sin(phase * 0.5) * 20} -300 -200`} stroke={INK} strokeWidth={14} fill="none" strokeLinecap="round" />
			<circle cx={-304} cy={-196} r={18} fill="#7a3e12" stroke={INK} strokeWidth={5} />
			<ellipse cx={0} cy={-210} rx={210} ry={90} fill="#e0a24e" stroke={INK} strokeWidth={7} />
			<path d="M-160 -230 q30 -20 60 0 M-60 -250 q30 -20 60 0 M40 -240 q30 -20 60 0" stroke="#b8742e" strokeWidth={5} fill="none" />
			{leg(-140, sw + pounce * 30, false)}
			{leg(140, -sw + pounce * 70, false)}
			<g transform="translate(200 -280)">
				<path d={`${mane}Z`} fill="#b8561e" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
				<circle r={74} fill="#e0a24e" stroke={INK} strokeWidth={6} />
				<path d="M40 10 Q80 20 70 50 Q40 60 20 40" fill="#f1d9a8" stroke={INK} strokeWidth={5} />
				<ellipse cx={64} cy={14} rx={12} ry={9} fill={INK} />
				{down > 0.5 ? (
					<path d="M10 -36 l22 22 M32 -36 l-22 22" stroke={INK} strokeWidth={7} strokeLinecap="round" />
				) : (
					<g>
						<path d="M4 -24 Q22 -38 40 -24 Q22 -12 4 -24 Z" fill="#fbf3e2" stroke={INK} strokeWidth={4} />
						<circle cx={24} cy={-24} r={6} fill={INK} />
					</g>
				)}
				<circle cx={-30} cy={-60} r={20} fill="#e0a24e" stroke={INK} strokeWidth={5} />
				{pounce > 0.2 ? <path d="M30 40 Q60 70 84 44 Z" fill="#7a1f2b" stroke={INK} strokeWidth={4} /> : null}
				{mani ? (
					<g transform="translate(70 56)">
						<circle r={46} fill="#ffe27a" opacity={0.45} />
						<path d="M0 -20 L16 0 L0 20 L-16 0 Z" fill="#e2462b" stroke={INK} strokeWidth={4} />
					</g>
				) : null}
			</g>
		</g>
	);
};

// Horse in side view, facing right.
export const Horse: React.FC<{x: number; y: number; s?: number; phase?: number; down?: number}> = ({x, y, s = 1, phase = 0, down = 0}) => {
	const sw = Math.sin(phase) * 26;
	const leg = (bx: number, a: number, c: string) => (
		<g transform={`translate(${bx} -230) rotate(${a})`}>
			<rect x={-18} y={0} width={36} height={230} rx={14} fill={c} stroke={INK} strokeWidth={6} />
			<rect x={-20} y={206} width={40} height={26} rx={6} fill={INK} />
		</g>
	);
	return (
		<g transform={`translate(${x} ${y}) scale(${s})${down > 0.5 ? ' translate(0 -500) scale(1 -1)' : ''}`}>
			{leg(-130, -sw, '#d8cfc0')}
			{leg(120, sw, '#d8cfc0')}
			<path d="M-230 -300 Q-300 -260 -290 -140" stroke={INK} strokeWidth={20} fill="none" strokeLinecap="round" />
			<ellipse cx={0} cy={-300} rx={240} ry={100} fill="#f4ecdc" stroke={INK} strokeWidth={7} />
			<path d="M180 -340 L250 -520 Q300 -560 360 -520 L380 -460 Q340 -440 300 -460 L250 -330 Z" fill="#f4ecdc" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
			<path d="M200 -360 L250 -500 L230 -340 Z" fill="#7a3e12" />
			{down > 0.5 ? <path d="M300 -512 l18 18 M318 -512 l-18 18" stroke={INK} strokeWidth={6} /> : <circle cx={310} cy={-500} r={8} fill={INK} />}
			<rect x={-90} y={-360} width={170} height={60} rx={14} fill="#c22b34" stroke={INK} strokeWidth={5} />
			{leg(-160, sw, '#f4ecdc')}
			{leg(150, -sw, '#f4ecdc')}
		</g>
	);
};

// Folk tree: a trunk with a round canopy of clustered circles and red fruit dots.
export const Tree: React.FC<{x: number; y: number; s?: number; c?: string}> = ({x, y, s = 1, c = F.leaf}) => (
	<g transform={`translate(${x} ${y}) scale(${s})`}>
		<path d="M-22 0 L-14 -300 L14 -300 L22 0 Z" fill="#6e4520" stroke={INK} strokeWidth={6} />
		{[
			[-90, -340],
			[0, -400],
			[90, -340],
			[-50, -280],
			[50, -280],
		].map(([cx, cy], i) => (
			<g key={i}>
				<circle cx={cx} cy={cy} r={95} fill={c} stroke={INK} strokeWidth={6} />
				{[0, 1, 2, 3, 4].map((k) => <circle key={k} cx={cx + Math.cos(k * 1.3 + i) * 50} cy={cy + Math.sin(k * 1.3 + i) * 50} r={7} fill="#c22b34" />)}
			</g>
		))}
	</g>
);

// Dark cave mouth in a fish-scale rock hill.
export const CaveHill: React.FC<{x: number; y: number; s?: number}> = ({x, y, s = 1}) => (
	<g transform={`translate(${x} ${y}) scale(${s})`}>
		<path d="M-620 0 Q-560 -620 0 -700 Q560 -620 620 0 Z" fill="#5a4a6e" stroke={INK} strokeWidth={8} />
		{Array.from({length: 4}, (_, r) =>
			Array.from({length: 6 - r}, (_, c) => {
				const cx = -420 + r * 90 + c * 170;
				const cy = -120 - r * 140;
				return <path key={`${r}${c}`} d={`M${cx - 90} ${cy} A90 90 0 0 1 ${cx + 90} ${cy}`} fill="#6e5c86" stroke={INK} strokeWidth={5} />;
			}),
		)}
		<path d="M-170 0 L-170 -240 Q-170 -380 0 -390 Q170 -380 170 -240 L170 0 Z" fill="#0e0812" stroke={INK} strokeWidth={8} />
		<path d="M-150 -240 Q-150 -360 0 -370 Q150 -360 150 -240" stroke={F.cream} strokeWidth={5} strokeDasharray="2 16" strokeLinecap="round" fill="none" />
	</g>
);

// Inside the cave: warm red rock with layered arch patterns.
export const CaveInside: React.FC<{t: number; dark?: number}> = ({t, dark = 0}) => (
	<g>
		<rect x={-200} y={-200} width={1480} height={2400} fill="#6e2a1e" />
		{Array.from({length: 7}, (_, row) =>
			Array.from({length: 5}, (_, col) => {
				const cx = col * 260 + (row % 2) * 130 - 60;
				const cy = row * 220 - 40;
				return (
					<g key={`${row}${col}`}>
						<path d={`M${cx - 150} ${cy + 150} A150 150 0 0 1 ${cx + 150} ${cy + 150}`} fill="#8a3a24" stroke={INK} strokeWidth={6} />
						{[115, 80].map((r) => (
							<path key={r} d={`M${cx - r} ${cy + 150} A${r} ${r} 0 0 1 ${cx + r} ${cy + 150}`} fill="none" stroke="#e8a46a" strokeWidth={5} strokeDasharray="2 14" strokeLinecap="round" opacity={0.7} />
						))}
					</g>
				);
			}),
		)}
		<rect x={-200} y={1380} width={1480} height={800} fill="#4a1a12" stroke={INK} strokeWidth={6} />
		<path d="M-200 1440 H1280" stroke="#e8a46a" strokeWidth={5} strokeDasharray="2 20" strokeLinecap="round" />
		<circle cx={540} cy={900} r={500 + Math.sin(t * 3) * 20} fill="#ffb347" opacity={0.08} />
		{dark > 0 ? <rect x={-200} y={-200} width={1480} height={2400} fill="#120608" opacity={dark} /> : null}
	</g>
);

// The Syamantak gem, big and glowing.
export const Mani: React.FC<{x: number; y: number; s?: number; t: number; glow?: number}> = ({x, y, s = 1, t, glow = 1}) => (
	<g transform={`translate(${x} ${y}) scale(${s})`}>
		<circle r={300} fill="#ffe27a" opacity={0.2 * glow} />
		<g transform={`rotate(${t * 12})`}>
			{Array.from({length: 16}, (_, k) => (
				<path key={k} d="M-12 -150 L0 -260 L12 -150 Z" fill="#f6c343" stroke={INK} strokeWidth={4} opacity={glow} transform={`rotate(${k * 22.5})`} />
			))}
		</g>
		<circle r={150} fill="#ffe27a" opacity={0.35 * glow} />
		<path d="M0 -120 L90 -40 L60 100 L-60 100 L-90 -40 Z" fill="#e2462b" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
		<path d="M0 -120 L30 -40 L0 100 M-90 -40 L90 -40 M-30 -40 L0 -120 M30 -40 L60 100 M-30 -40 L-60 100 M-30 -40 L0 100" stroke={INK} strokeWidth={4} fill="none" />
		<path d="M0 -120 L30 -40 L-30 -40 Z" fill="#f6c343" />
		<path d="M-60 -60 l20 -20" stroke="#fff" strokeWidth={8} strokeLinecap="round" />
	</g>
);

export const Coins: React.FC<{x: number; y: number; k: number}> = ({x, y, k}) => (
	<g transform={`translate(${x} ${y})`}>
		{Array.from({length: Math.floor(k * 40)}, (_, i) => {
			const row = Math.floor(Math.sqrt(i * 2));
			const cx = (random(`cx${i}`) - 0.5) * (300 - row * 30);
			return <ellipse key={i} cx={cx} cy={-row * 22} rx={30} ry={13} fill="#f2c14e" stroke={INK} strokeWidth={4} />;
		})}
	</g>
);

export const Throne: React.FC<{x: number; y: number; s?: number}> = ({x, y, s = 1}) => (
	<g transform={`translate(${x} ${y}) scale(${s})`}>
		<path d="M-150 0 L-150 -520 Q-150 -620 0 -660 Q150 -620 150 -520 L150 0 Z" fill="#f2c14e" stroke={INK} strokeWidth={8} />
		<path d="M-100 -280 L-100 -500 Q-100 -570 0 -596 Q100 -570 100 -500 L100 -280 Z" fill="#c22b34" stroke={INK} strokeWidth={6} />
		<rect x={-190} y={-300} width={380} height={70} rx={16} fill="#e0a73e" stroke={INK} strokeWidth={7} />
		<rect x={-160} y={-230} width={320} height={230} fill="#c98a3e" stroke={INK} strokeWidth={7} />
	</g>
);

// Royal court backdrop: maroon wall, gold pillars, swinging lamps, a toran along the top.
export const Court: React.FC<{t: number}> = ({t}) => (
	<g>
		<rect x={-200} y={-200} width={1480} height={2400} fill="#8a2430" />
		{[60, 330, 600, 870].map((x) => {
			const sw = Math.sin(t * 2 + x) * 6;
			return (
				<g key={x}>
					<rect x={x} y={200} width={70} height={1200} fill="#f2c14e" stroke={INK} strokeWidth={6} />
					{[260, 600, 940, 1280].map((yy) => <path key={yy} d={`M${x} ${yy} h70`} stroke={INK} strokeWidth={5} />)}
					<path d={`M${x + 35} 200 L${x + 35 + sw} 330`} stroke={INK} strokeWidth={4} />
					<path d={`M${x + 5 + sw} 330 Q${x + 35 + sw} 380 ${x + 65 + sw} 330 Z`} fill="#f2c14e" stroke={INK} strokeWidth={5} />
				</g>
			);
		})}
		<rect x={-200} y={150} width={1480} height={60} fill="#f2c14e" stroke={INK} strokeWidth={6} />
		{Array.from({length: 18}, (_, i) => <path key={i} d={`M${i * 64} 210 l32 40 l32 -40`} fill="#c22b34" stroke={INK} strokeWidth={4} />)}
		<rect x={-200} y={1400} width={1480} height={800} fill="#a8303c" stroke={INK} strokeWidth={6} />
		<path d="M-200 1460 H1280 M-200 1560 H1280" stroke="#f2c14e" strokeWidth={6} strokeDasharray="2 20" strokeLinecap="round" />
	</g>
);

export const Paw: React.FC<{x: number; y: number; s?: number; o?: number; rot?: number}> = ({x, y, s = 1, o = 1, rot = 0}) =>
	o <= 0 ? null : (
		<g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
			<ellipse cx={0} cy={10} rx={30} ry={24} fill={INK} />
			{[-26, -9, 9, 26].map((cx, i) => <ellipse key={cx} cx={cx} cy={-26 - (i === 1 || i === 2 ? 8 : 0)} rx={10} ry={12} fill={INK} />)}
		</g>
	);

// Speech bubble, folk style.
export const Bubble: React.FC<{x: number; y: number; k: number; text: string; flip?: boolean; font: string}> = ({x, y, k, text, flip, font}) =>
	k <= 0 ? null : (
		<g transform={`translate(${x} ${y}) scale(${k})`}>
			<path
				d={`M-120 -60 Q-130 -110 -70 -110 L70 -110 Q130 -110 120 -60 L120 -10 Q120 30 70 30 L${flip ? 60 : -20} 30 L${flip ? 80 : -60} 80 L${flip ? 20 : -40} 30 L-70 30 Q-120 30 -120 -10 Z`}
				fill={F.cream}
				stroke={INK}
				strokeWidth={6}
				strokeLinejoin="round"
			/>
			<text x={0} y={-22} textAnchor="middle" fontSize={50} fontWeight={800} fill={INK} style={{fontFamily: font}}>
				{text}
			</text>
		</g>
	);

// Cartoon dust cloud with stars: covers a scuffle so nothing graphic is shown.
export const Scuffle: React.FC<{x: number; y: number; k: number; t: number}> = ({x, y, k, t}) => {
	if (k <= 0 || k >= 1) return null;
	const s = Math.sin(k * Math.PI);
	return (
		<g transform={`translate(${x} ${y}) scale(${0.6 + s * 0.6})`} opacity={Math.min(1, s * 2)}>
			{Array.from({length: 9}, (_, i) => {
				const a = (i / 9) * Math.PI * 2 + t * 3;
				return <circle key={i} cx={Math.cos(a) * 150} cy={Math.sin(a) * 90} r={110} fill="#e8d6b0" stroke={INK} strokeWidth={6} />;
			})}
			<circle r={150} fill="#e8d6b0" />
			{[0, 1, 2].map((i) => {
				const a = t * 6 + i * 2.1;
				return <path key={i} transform={`translate(${Math.cos(a) * 120} ${Math.sin(a) * 70 - 40})`} d="M0 -26 L8 -8 L26 -6 L12 6 L16 26 L0 14 L-16 26 L-12 6 L-26 -6 L-8 -8 Z" fill="#f2c14e" stroke={INK} strokeWidth={4} />;
			})}
		</g>
	);
};

// Phone in folk outline, for the call to action.
export const Phone: React.FC<{x: number; y: number; s?: number; children?: React.ReactNode}> = ({x, y, s = 1, children}) => (
	<g transform={`translate(${x} ${y}) scale(${s})`}>
		<rect x={-250} y={-480} width={500} height={960} rx={60} fill="#2a160c" stroke={INK} strokeWidth={10} />
		<rect x={-220} y={-430} width={440} height={860} rx={30} fill={F.cream} />
		<g>{children}</g>
		<rect x={-60} y={-460} width={120} height={16} rx={8} fill="#5a4a3a" />
	</g>
);
