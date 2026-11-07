import React from 'react';
import {random} from 'remotion';
import {INK} from './Rig';

export const F = {
	paper: '#ecd2a0',
	paperDark: '#d9b47a',
	ochre: '#c98a3e',
	sand: '#e3b878',
	maroon: '#7a1f2b',
	saffron: '#f29e1f',
	gold: '#f2c14e',
	indigo: '#22305c',
	leaf: '#5f8f3a',
	sea: '#2f7f9a',
	cream: '#fbf3e2',
};

export const Scene: React.FC<{children: React.ReactNode}> = ({children}) => (
	<svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0, overflow: 'visible'}}>{children}</svg>
);

// Parchment sky with a warm tint.
export const Paper: React.FC<{tint?: string}> = ({tint = F.paper}) => <rect x={-200} y={-200} width={1480} height={2400} fill={tint} />;

// Ground as flat bands with folk dotted lines and V-shaped grass tufts.
export const Ground: React.FC<{y: number; colors?: string[]; seed?: string}> = ({y, colors = [F.sand, F.ochre, '#b97a36'], seed = 'g'}) => (
	<g>
		{colors.map((c, i) => (
			<rect key={c + i} x={-200} y={y + i * 150} width={1480} height={2000} fill={c} stroke={INK} strokeWidth={6} />
		))}
		{[0, 1, 2, 3].map((r) => (
			<path key={r} d={`M-200 ${y + 50 + r * 120} H1280`} stroke={F.cream} strokeWidth={6} strokeDasharray="2 20" strokeLinecap="round" opacity={0.85} />
		))}
		{Array.from({length: 16}, (_, i) => {
			const gx = random(`${seed}x${i}`) * 1080;
			const gy = y + 30 + random(`${seed}y${i}`) * 520;
			return <path key={i} d={`M${gx - 12} ${gy - 22} L${gx} ${gy} L${gx + 12} ${gy - 22} M${gx} ${gy} L${gx} ${gy - 26}`} stroke={INK} strokeWidth={4} fill="none" strokeLinecap="round" />;
		})}
	</g>
);

// Folk sun: a disc inside a ring of zig-zag rays that slowly turns.
export const Sun: React.FC<{x: number; y: number; r?: number; t: number; c?: string}> = ({x, y, r = 90, t, c = '#f6d77c'}) => {
	let d = '';
	const n = 22;
	for (let i = 0; i <= n * 2; i++) {
		const a = (i / (n * 2)) * Math.PI * 2;
		const rr = i % 2 ? r * 1.25 : r * 1.75;
		d += `${i ? 'L' : 'M'}${Math.cos(a) * rr} ${Math.sin(a) * rr} `;
	}
	return (
		<g transform={`translate(${x} ${y})`}>
			<g transform={`rotate(${t * 8})`}>
				<path d={`${d}Z`} fill={c} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
			</g>
			<circle r={r * 1.1} fill="#f9e6a8" stroke={INK} strokeWidth={6} />
			<circle r={r * 0.8} fill="none" stroke={INK} strokeWidth={3} strokeDasharray="3 12" />
		</g>
	);
};

export const Moon: React.FC<{x: number; y: number; r?: number}> = ({x, y, r = 70}) => (
	<g transform={`translate(${x} ${y})`}>
		<path d={`M${r * 0.3} ${-r} A${r} ${r} 0 1 0 ${r * 0.3} ${r} A${r * 0.8} ${r * 0.8} 0 1 1 ${r * 0.3} ${-r} Z`} fill={F.cream} stroke={INK} strokeWidth={5} />
	</g>
);

// Sea drawn as stacked wave scrolls.
export const Sea: React.FC<{y: number; t: number; c?: string}> = ({y, t, c = F.sea}) => (
	<g>
		<rect x={-200} y={y} width={1480} height={1400} fill={c} stroke={INK} strokeWidth={6} />
		{Array.from({length: 7}, (_, r) =>
			Array.from({length: 9}, (_, k) => {
				const x = ((k * 150 + r * 75 + t * (20 + r * 6)) % 1350) - 150;
				const yy = y + 40 + r * 70;
				return <path key={`${r}${k}`} d={`M${x} ${yy} q20 -26 44 -4 q-16 -6 -18 10`} stroke={F.cream} strokeWidth={5} fill="none" strokeLinecap="round" opacity={0.85} />;
			}),
		)}
	</g>
);

// Lanka: a golden fort with round-topped towers on a rocky island. fire 0..1.
export const LankaFort: React.FC<{x: number; y: number; s?: number; t: number; fire?: number; smoke?: number}> = ({x, y, s = 1, t, fire = 1, smoke = 0}) => {
	const towers = [
		[-300, 220],
		[-180, 320],
		[-60, 260],
		[60, 380],
		[180, 280],
		[300, 210],
	];
	return (
		<g transform={`translate(${x} ${y}) scale(${s})`}>
			{smoke > 0
				? [0, 1, 2].map((i) => {
						const k = (t * 0.25 + i / 3) % 1;
						return <circle key={i} cx={-60 + i * 70 + k * 40} cy={-420 - k * 260} r={40 + k * 70} fill="#6b5a52" stroke={INK} strokeWidth={4} opacity={smoke * (1 - k) * 0.7} />;
					})
				: null}
			<path d="M-420 40 Q-380 -40 -300 -30 L300 -30 Q380 -40 420 40 Z" fill="#8a6a4a" stroke={INK} strokeWidth={6} />
			<rect x={-340} y={-130} width={680} height={110} fill="#e0a73e" stroke={INK} strokeWidth={6} />
			{Array.from({length: 14}, (_, i) => <rect key={i} x={-340 + i * 50} y={-150} width={26} height={22} fill="#e0a73e" stroke={INK} strokeWidth={4} />)}
			{towers.map(([tx, h], i) => (
				<g key={tx}>
					<rect x={tx - 40} y={-h} width={80} height={h - 20} fill={i % 2 ? '#f2c14e' : '#e8b440'} stroke={INK} strokeWidth={6} />
					<path d={`M${tx - 52} ${-h + 4} Q${tx - 50} ${-h - 70} ${tx} ${-h - 86} Q${tx + 50} ${-h - 70} ${tx + 52} ${-h + 4} Z`} fill="#f6d77c" stroke={INK} strokeWidth={6} />
					<path d={`M${tx - 14} ${-h + 60} q14 -24 28 0 v40 h-28 Z`} fill={INK} />
					{fire > 0 ? (
						<path
							d={`M${tx - 40} ${-h - 40} Q${tx - 50} ${-h - 120 - Math.sin(t * 9 + i) * 24} ${tx - 6} ${-h - 180 - Math.sin(t * 7 + i) * 30} Q${tx + 4} ${-h - 130} ${tx + 22} ${-h - 160 - Math.cos(t * 8 + i) * 20} Q${tx + 52} ${-h - 100} ${tx + 40} ${-h - 40} Z`}
							fill="#e2462b"
							stroke={INK}
							strokeWidth={5}
							opacity={fire}
						/>
					) : null}
					{fire > 0 ? <path d={`M${tx - 16} ${-h - 50} Q${tx - 18} ${-h - 100 - Math.sin(t * 11 + i) * 14} ${tx} ${-h - 120} Q${tx + 18} ${-h - 90} ${tx + 16} ${-h - 50} Z`} fill="#f6c343" opacity={fire} /> : null}
				</g>
			))}
		</g>
	);
};

// Dwarka: white domes and spires with peacock-blue flags, on the sea.
export const DwarkaCity: React.FC<{x: number; y: number; s?: number; t: number}> = ({x, y, s = 1, t}) => {
	const b = [
		[-330, 200, 'dome'],
		[-200, 330, 'spire'],
		[-70, 250, 'dome'],
		[70, 430, 'spire'],
		[210, 260, 'dome'],
		[330, 300, 'spire'],
	] as const;
	return (
		<g transform={`translate(${x} ${y}) scale(${s})`}>
			<rect x={-420} y={-40} width={840} height={80} fill="#e9dcc4" stroke={INK} strokeWidth={6} />
			{Array.from({length: 17}, (_, i) => <path key={i} d={`M${-410 + i * 50} 0 q12 -24 24 0`} fill="none" stroke={INK} strokeWidth={4} />)}
			{b.map(([bx, h, kind], i) => (
				<g key={bx}>
					<rect x={bx - 52} y={-40 - h * 0.5} width={104} height={h * 0.5} fill={F.cream} stroke={INK} strokeWidth={6} />
					{kind === 'dome' ? (
						<path d={`M${bx - 60} ${-40 - h * 0.5} Q${bx - 60} ${-40 - h * 0.95} ${bx} ${-40 - h} Q${bx + 60} ${-40 - h * 0.95} ${bx + 60} ${-40 - h * 0.5} Z`} fill="#f4ecdc" stroke={INK} strokeWidth={6} />
					) : (
						<path d={`M${bx - 56} ${-40 - h * 0.5} Q${bx - 40} ${-40 - h * 0.9} ${bx} ${-40 - h} Q${bx + 40} ${-40 - h * 0.9} ${bx + 56} ${-40 - h * 0.5} Z`} fill="#f4ecdc" stroke={INK} strokeWidth={6} />
					)}
					{[0.62, 0.75, 0.87].map((k) => <path key={k} d={`M${bx - 44 * (1.1 - k)} ${-40 - h * k} H${bx + 44 * (1.1 - k)}`} stroke={INK} strokeWidth={3} />)}
					<path d={`M${bx} ${-40 - h} L${bx} ${-40 - h - 60}`} stroke={INK} strokeWidth={5} />
					<path d={`M${bx} ${-100 - h} L${bx + 54 + Math.sin(t * 6 + i) * 6} ${-88 - h + Math.sin(t * 5 + i) * 4} L${bx} ${-74 - h} Z`} fill="#1f6fa8" stroke={INK} strokeWidth={4} />
					<path d={`M${bx - 16} ${-40} q16 -36 32 0 Z`} fill={INK} />
				</g>
			))}
		</g>
	);
};

// Indigo panel with concentric dotted arcs (fish-scale folk pattern).
export const ScalePattern: React.FC<{c1?: string; c2?: string; t: number}> = ({c1 = F.indigo, c2 = '#2f4176', t}) => (
	<g>
		<rect x={-200} y={-200} width={1480} height={2400} fill={c1} />
		{Array.from({length: 9}, (_, row) =>
			Array.from({length: 6}, (_, col) => {
				const cx = col * 220 + (row % 2) * 110 - 40;
				const cy = row * 240 - 60 + Math.sin(t * 0.8 + row) * 6;
				return (
					<g key={`${row}${col}`}>
						<path d={`M${cx - 130} ${cy + 130} A130 130 0 0 1 ${cx + 130} ${cy + 130}`} fill={c2} stroke={INK} strokeWidth={6} />
						{[100, 70, 40].map((r) => <path key={r} d={`M${cx - r} ${cy + 130} A${r} ${r} 0 0 1 ${cx + r} ${cy + 130}`} fill="none" stroke={F.cream} strokeWidth={5} strokeDasharray="2 14" strokeLinecap="round" opacity={0.7} />)}
					</g>
				);
			}),
		)}
	</g>
);

export const Flag: React.FC<{x: number; y: number; h?: number; t: number; c?: string}> = ({x, y, h = 300, t, c = F.saffron}) => (
	<g>
		<path d={`M${x} ${y} L${x} ${y - h}`} stroke={INK} strokeWidth={9} strokeLinecap="round" />
		<path d={`M${x} ${y - h} Q${x + 60} ${y - h + 10 + Math.sin(t * 5 + x) * 10} ${x + 120} ${y - h + 36} Q${x + 60} ${y - h + 56} ${x} ${y - h + 80} Z`} fill={c} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
	</g>
);

export const Arrow: React.FC<{x: number; y: number; a: number; len?: number}> = ({x, y, a, len = 220}) => (
	<g transform={`translate(${x} ${y}) rotate(${a})`}>
		<path d={`M0 0 L${len} 0`} stroke={INK} strokeWidth={7} />
		<path d={`M${len} 0 l-26 -12 l0 24 Z`} fill="#5a5f6a" stroke={INK} strokeWidth={3} />
		<path d="M0 0 l18 -14 l14 0 l-18 14 l18 14 l-14 0 Z" fill="#c22b34" stroke={INK} strokeWidth={2} />
	</g>
);

// Raavan's fallen crown lying on the battlefield.
export const FallenCrown: React.FC<{x: number; y: number; s?: number}> = ({x, y, s = 1}) => (
	<g transform={`translate(${x} ${y}) scale(${s}) rotate(-14)`}>
		<ellipse cx={0} cy={30} rx={190} ry={22} fill={INK} opacity={0.25} />
		{[-2, -1, 0, 1, 2].map((k) => (
			<path key={k} d={`M${k * 70 - 34} 20 L${k * 70 - 26} -70 L${k * 70} -40 L${k * 70 + 26} -70 L${k * 70 + 34} 20 Z`} fill="#f2c14e" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
		))}
		<rect x={-180} y={0} width={360} height={36} rx={8} fill="#e0a73e" stroke={INK} strokeWidth={6} />
		{[-120, -40, 40, 120].map((cx) => <circle key={cx} cx={cx} cy={18} r={9} fill="#c22b34" stroke={INK} strokeWidth={3} />)}
	</g>
);

export const Rock: React.FC<{x: number; y: number; s?: number}> = ({x, y, s = 1}) => (
	<g transform={`translate(${x} ${y}) scale(${s})`}>
		<path d="M-220 0 Q-200 -150 -60 -170 Q80 -190 180 -110 Q240 -60 230 0 Z" fill="#9a7a5a" stroke={INK} strokeWidth={7} />
		{[-120, -20, 80].map((rx) => <path key={rx} d={`M${rx} -90 q30 -20 60 0`} stroke={INK} strokeWidth={4} fill="none" />)}
	</g>
);

export const Feather: React.FC<{x: number; y: number; rot: number; s?: number}> = ({x, y, rot, s = 1}) => (
	<g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
		<path d="M0 160 L0 -160" stroke={INK} strokeWidth={6} />
		<path d="M0 -170 Q-80 -60 -40 80 Q0 120 40 80 Q80 -60 0 -170 Z" fill="#2f8f5a" stroke={INK} strokeWidth={6} />
		<ellipse cx={0} cy={-60} rx={34} ry={46} fill="#1f6fa8" stroke={INK} strokeWidth={5} />
		<ellipse cx={0} cy={-56} rx={18} ry={24} fill="#f2c14e" stroke={INK} strokeWidth={4} />
		<ellipse cx={0} cy={-52} rx={8} ry={11} fill="#14305c" />
	</g>
);

export const Embers: React.FC<{t: number; n?: number; c?: string}> = ({t, n = 30, c = '#f6943a'}) => (
	<g>
		{Array.from({length: n}, (_, i) => {
			const x = random(`ex${i}`) * 1080 + Math.sin(t * 2 + i) * 20;
			const y = ((random(`ey${i}`) * 2000 - t * (60 + random(`ev${i}`) * 90)) % 2000 + 2000) % 2000;
			return <circle key={i} cx={x} cy={y} r={3 + random(`er${i}`) * 4} fill={c} opacity={0.5 + 0.5 * Math.abs(Math.sin(t * 3 + i))} />;
		})}
	</g>
);
