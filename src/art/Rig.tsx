import React from 'react';

// Folk-painting figure rig: full body in side profile, facing right. Feet at y = 0.
// Limb angles are in degrees from straight down; positive swings forward (+x).
export const INK = '#2a160c';
const OUT = 7;

export type Pose = {
	lean: number;
	neck: number;
	hipY: number;
	legF: [number, number];
	legB: [number, number];
	armF: [number, number];
	armB: [number, number];
	hand: 'open' | 'namaste' | 'bless' | 'fist';
	mouth: number;
	blink: boolean;
	smile: number;
	scream?: number;
};

export const pose = (p: Partial<Pose> = {}): Pose => ({
	lean: 0,
	neck: 0,
	hipY: -430,
	legF: [6, 0],
	legB: [-6, 0],
	armF: [10, 24],
	armB: [-8, 6],
	hand: 'open',
	mouth: 0,
	blink: false,
	smile: 0,
	...p,
});

const l = (a: number, b: number, k: number) => a + (b - a) * k;
export const mix = (a: Pose, b: Pose, k: number): Pose => ({
	lean: l(a.lean, b.lean, k),
	neck: l(a.neck, b.neck, k),
	hipY: l(a.hipY, b.hipY, k),
	legF: [l(a.legF[0], b.legF[0], k), l(a.legF[1], b.legF[1], k)],
	legB: [l(a.legB[0], b.legB[0], k), l(a.legB[1], b.legB[1], k)],
	armF: [l(a.armF[0], b.armF[0], k), l(a.armF[1], b.armF[1], k)],
	armB: [l(a.armB[0], b.armB[0], k), l(a.armB[1], b.armB[1], k)],
	hand: k < 0.5 ? a.hand : b.hand,
	mouth: l(a.mouth, b.mouth, k),
	blink: k < 0.5 ? a.blink : b.blink,
	smile: l(a.smile, b.smile, k),
	scream: l(a.scream ?? 0, b.scream ?? 0, k),
});

// Common poses.
export const STAND = pose();
export const KNEEL = pose({hipY: -250, legF: [84, -2], legB: [-4, -92], lean: 12, neck: 8});
export const SIT = pose({hipY: -200, legF: [88, 10], legB: [80, 4], lean: -4});
export const NAMASTE = {armF: [28, 150] as [number, number], armB: [22, 146] as [number, number], hand: 'namaste' as const};
export const BLESS = {armF: [52, 172] as [number, number], hand: 'bless' as const};
export const POINT = {armF: [80, 86] as [number, number]};
export const STOP = {armF: [70, 150] as [number, number], hand: 'bless' as const};

// Walk cycle sample at phase p (radians).
export const walk = (p: number, base: Pose = STAND): Pose => ({
	...base,
	legF: [Math.sin(p) * 24, Math.min(0, Math.sin(p + 1.2) * 30)],
	legB: [-Math.sin(p) * 24, Math.min(0, -Math.sin(p + 1.2) * 30)],
	armF: base.hand === 'open' && base.armF[0] < 40 ? [-Math.sin(p) * 18 + 6, -Math.sin(p) * 18 + 22] : base.armF,
	armB: [Math.sin(p) * 18 - 6, Math.sin(p) * 18 + 4],
	hipY: base.hipY - Math.abs(Math.cos(p)) * 8,
});

type V = [number, number];
const at = (p: V, a: number, len: number): V => [p[0] + Math.sin((a * Math.PI) / 180) * len, p[1] + Math.cos((a * Math.PI) / 180) * len];

const Seg: React.FC<{a: V; b: V; w: number; c: string}> = ({a, b, w, c}) => (
	<>
		<line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={INK} strokeWidth={w + OUT * 2} strokeLinecap="round" />
		<line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={c} strokeWidth={w} strokeLinecap="round" />
	</>
);

export type Kind =
	| 'ram'
	| 'lakshman'
	| 'sita'
	| 'hanuman'
	| 'ravan'
	| 'shiv'
	| 'krishna'
	| 'arjun'
	| 'devi'
	| 'rishi'
	| 'raja'
	| 'sainik'
	| 'surya'
	| 'satrajit'
	| 'prasen'
	| 'ugrasen'
	| 'folk1'
	| 'folk2'
	| 'bear'
	| 'cub'
	| 'nurse';
export const KINDS: Kind[] = ['ram', 'lakshman', 'sita', 'hanuman', 'ravan', 'shiv', 'krishna', 'arjun', 'devi', 'rishi', 'raja', 'sainik', 'surya', 'satrajit', 'prasen', 'ugrasen', 'folk1', 'folk2', 'bear', 'cub', 'nurse'];
type Spec = {
	body: 'human' | 'bear';
	thigh: number;
	shin: number;
	torso: number;
	upper: number;
	fore: number;
	wArm: number;
	wLeg: number;
	wShin: number;
	skin: string;
	skin2: string;
	cloth: string;
	cloth2: string;
	border: string;
	top?: string;
	crown: 'ram' | 'krishna' | 'turban' | 'king' | 'surya' | 'bear' | 'none' | 'scarf' | 'tiara' | 'ravan' | 'jata' | 'rishi' | 'helmet' | 'devi';
	turban?: string;
	beard?: boolean;
	hair?: 'long' | 'short';
	hairColor?: string;
	female?: boolean; // bun, bindi, nose ring, eyelash
	monkey?: boolean; // cream muzzle + tail (Hanuman)
	mustache?: boolean;
	heads?: number; // extra heads behind the main one (Ravan)
	quiver?: boolean; // arrows on the back
	snake?: boolean; // snake around the neck (Shiv)
	tilak?: 'line' | 'tripundra' | 'none';
	halo?: string; // glowing disc behind the head
};
const HUMAN = {body: 'human' as const, thigh: 215, shin: 205, torso: 270, upper: 150, fore: 140, wArm: 46, wLeg: 70, wShin: 50};
const BEAR = {body: 'bear' as const, thigh: 185, shin: 165, torso: 290, upper: 160, fore: 150, wArm: 70, wLeg: 96, wShin: 74, skin: '#3a2418', skin2: '#2a190f'};
const SPEC: Record<Kind, Spec> = {
	ram: {...HUMAN, skin: '#2f6fb5', skin2: '#245a96', cloth: '#f29e1f', cloth2: '#d9851a', border: '#b3261e', crown: 'ram', hair: 'long', quiver: true},
	lakshman: {...HUMAN, skin: '#e0a86a', skin2: '#c18a50', cloth: '#2f8f5a', cloth2: '#257248', border: '#f2c14e', crown: 'ram', hair: 'long', quiver: true},
	sita: {...HUMAN, wArm: 40, wLeg: 76, skin: '#eab486', skin2: '#cf9768', cloth: '#f2c14e', cloth2: '#d9a53a', border: '#c22b34', top: '#c22b34', crown: 'tiara', hair: 'long', female: true, tilak: 'none'},
	hanuman: {...HUMAN, wArm: 52, wLeg: 76, skin: '#e0703a', skin2: '#c25a2a', cloth: '#c22b34', cloth2: '#9a1f28', border: '#f2c14e', crown: 'king', monkey: true, tilak: 'none'},
	ravan: {...HUMAN, wArm: 54, wLeg: 80, skin: '#6a4a36', skin2: '#543826', cloth: '#2e2440', cloth2: '#221a30', border: '#f2c14e', top: '#7a1f2b', crown: 'ravan', mustache: true, heads: 4, hair: 'long'},
	shiv: {...HUMAN, skin: '#9ec3dc', skin2: '#82a8c2', cloth: '#e8a53a', cloth2: '#c9862a', border: '#2a160c', crown: 'jata', hairColor: '#3a2418', hair: 'long', snake: true, tilak: 'tripundra'},
	arjun: {...HUMAN, skin: '#c98a5a', skin2: '#a8703f', cloth: '#fbf3e2', cloth2: '#e3d8c2', border: '#1f6fa8', top: '#b3261e', crown: 'king', hair: 'long', quiver: true},
	devi: {...HUMAN, wArm: 40, wLeg: 76, skin: '#f0b48a', skin2: '#d39468', cloth: '#c22b34', cloth2: '#9a1f28', border: '#f2c14e', top: '#c22b34', crown: 'devi', hair: 'long', female: true, tilak: 'none', halo: '#ffe27a'},
	rishi: {...HUMAN, skin: '#c98a5a', skin2: '#a8703f', cloth: '#e8862a', cloth2: '#c96f1e', border: '#7a1f2b', crown: 'rishi', beard: true, hair: 'long', hairColor: '#e9e2d4', tilak: 'tripundra'},
	raja: {...HUMAN, skin: '#d9a06a', skin2: '#b9844f', cloth: '#fbf3e2', cloth2: '#e3d8c2', border: '#f2c14e', top: '#7a1f2b', crown: 'king', mustache: true, hair: 'long'},
	sainik: {...HUMAN, skin: '#b9784a', skin2: '#9a6038', cloth: '#c22b34', cloth2: '#9a1f28', border: '#f2c14e', top: '#6a6f7a', crown: 'helmet', mustache: true, tilak: 'none'},
	krishna: {...HUMAN, skin: '#2a5fa8', skin2: '#1f4a86', cloth: '#f2c14e', cloth2: '#d9a53a', border: '#2f8f5a', crown: 'krishna', hair: 'long'},
	satrajit: {...HUMAN, skin: '#c98a5a', skin2: '#a8703f', cloth: '#fbf3e2', cloth2: '#e3d8c2', border: '#c22b34', top: '#e8862a', crown: 'turban', turban: '#e8862a'},
	prasen: {...HUMAN, skin: '#b9784a', skin2: '#9a6038', cloth: '#fbf3e2', cloth2: '#e3d8c2', border: '#1f6fa8', top: '#2f8f5a', crown: 'turban', turban: '#c22b34'},
	ugrasen: {...HUMAN, skin: '#d9a06a', skin2: '#b9844f', cloth: '#fbf3e2', cloth2: '#e3d8c2', border: '#7a1f2b', top: '#7a1f2b', crown: 'king', beard: true},
	surya: {...HUMAN, skin: '#e8a53a', skin2: '#c9862a', cloth: '#c22b34', cloth2: '#9a1f28', border: '#f2c14e', crown: 'surya', hair: 'long'},
	folk1: {...HUMAN, skin: '#c98a5a', skin2: '#a8703f', cloth: '#fbf3e2', cloth2: '#e3d8c2', border: '#7a1f2b', top: '#5f8f3a', crown: 'turban', turban: '#f2c14e'},
	folk2: {...HUMAN, skin: '#a8703f', skin2: '#8a5a30', cloth: '#fbf3e2', cloth2: '#e3d8c2', border: '#c22b34', top: '#1f6fa8', crown: 'turban', turban: '#fbf3e2', beard: true},
	bear: {...BEAR, cloth: '#1f7a6d', cloth2: '#185f55', border: '#f29e1f', crown: 'bear', beard: true},
	cub: {...BEAR, cloth: '#e2462b', cloth2: '#b8361f', border: '#f2c14e', crown: 'none'},
	nurse: {...BEAR, skin: '#4a3020', skin2: '#38241a', cloth: '#7a1f2b', cloth2: '#5e1720', border: '#f2c14e', top: '#7a1f2b', crown: 'scarf'},
};

const Hand: React.FC<{p: V; a: number; bear: boolean; type: Pose['hand']; c: string}> = ({p, a, bear, type, c}) => {
	if (type === 'bless') {
		return (
			<g transform={`translate(${p[0]} ${p[1]}) rotate(${-a + 180})`}>
				<path d="M-22 -4 L-24 -54 Q-20 -62 -14 -54 L-12 -30 L-8 -62 Q-2 -70 4 -62 L4 -32 L10 -60 Q16 -66 20 -58 L18 -26 L28 -44 Q34 -46 32 -36 L22 4 Q10 16 -10 14 Z" fill={c} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
				{bear ? null : <circle cx={0} cy={-18} r={6} fill="#c22b34" />}
			</g>
		);
	}
	if (type === 'namaste') {
		return (
			<g transform={`translate(${p[0]} ${p[1]}) rotate(${-a + 180})`}>
				<path d="M-16 0 Q-20 -50 0 -78 Q20 -50 16 0 Z" fill={c} stroke={INK} strokeWidth={5} />
				<path d="M0 -76 L0 0" stroke={INK} strokeWidth={3} />
				{bear ? <path d="M-4 -78 l4 -14 l4 14" fill="#f1e7d6" stroke={INK} strokeWidth={2} /> : null}
			</g>
		);
	}
	return (
		<g transform={`translate(${p[0]} ${p[1]}) rotate(${-a})`}>
			<ellipse cx={0} cy={22} rx={bear ? 30 : 22} ry={bear ? 30 : 26} fill={c} stroke={INK} strokeWidth={5} />
			{bear ? [-14, 0, 14].map((x) => <path key={x} d={`M${x} 46 l-4 18 l10 -16 Z`} fill="#f1e7d6" stroke={INK} strokeWidth={2} />) : type === 'fist' ? null : <path d="M8 10 q14 8 10 24" stroke={INK} strokeWidth={4} fill="none" />}
		</g>
	);
};

const Crown: React.FC<{s: Spec}> = ({s}) => {
	if (s.crown === 'ram')
		return (
			<g transform="translate(6 -160)">
				<path d="M-56 10 L-46 -36 L-34 -36 L-28 -86 L-16 -86 L-10 -136 L22 -136 L28 -86 L40 -86 L46 -36 L58 -36 L66 10 Z" fill="#f2c14e" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
				{[-6, -50, -100].map((y, i) => <path key={y} d={`M${-50 + i * 14} ${y} H${60 - i * 14}`} stroke={INK} strokeWidth={4} />)}
				{[-30, 6, 42].map((x) => <circle key={x} cx={x} cy={-18} r={7} fill="#c22b34" stroke={INK} strokeWidth={3} />)}
				<path d="M6 -136 Q-16 -160 -6 -182 Q6 -168 6 -190 Q6 -168 18 -182 Q28 -160 6 -136 Z" fill="#f28fb0" stroke={INK} strokeWidth={4} />
			</g>
		);
	if (s.crown === 'krishna')
		return (
			<g transform="translate(6 -160)">
				{/* peacock feather tucked into a short gold crown */}
				<g transform="translate(-30 -40) rotate(-24)">
					<path d="M0 60 L0 -150" stroke={INK} strokeWidth={5} />
					<path d="M0 -160 Q-46 -90 -22 -10 Q0 14 22 -10 Q46 -90 0 -160 Z" fill="#2f8f5a" stroke={INK} strokeWidth={5} />
					<ellipse cx={0} cy={-80} rx={20} ry={28} fill="#1f6fa8" stroke={INK} strokeWidth={4} />
					<ellipse cx={0} cy={-76} rx={10} ry={14} fill="#f2c14e" />
				</g>
				<path d="M-54 10 L-46 -40 L-24 -24 L4 -64 L30 -24 L52 -40 L62 10 Z" fill="#f2c14e" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
				{[-26, 6, 36].map((x) => <circle key={x} cx={x} cy={-6} r={7} fill="#2f8f5a" stroke={INK} strokeWidth={3} />)}
			</g>
		);
	if (s.crown === 'surya')
		return (
			<g transform="translate(6 -150)">
				{Array.from({length: 12}, (_, k) => <path key={k} d="M-10 -40 L0 -110 L10 -40 Z" fill="#f6c343" stroke={INK} strokeWidth={4} transform={`rotate(${-75 + k * 13})`} />)}
				<path d="M-52 10 L-44 -40 L56 -40 L62 10 Z" fill="#f2c14e" stroke={INK} strokeWidth={6} />
				<circle cx={4} cy={-14} r={10} fill="#c22b34" stroke={INK} strokeWidth={3} />
			</g>
		);
	if (s.crown === 'king')
		return (
			<g transform="translate(6 -160)">
				<path d="M-50 10 L-44 -50 L-20 -26 L4 -70 L28 -26 L52 -50 L58 10 Z" fill="#f2c14e" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
				<circle cx={4} cy={-14} r={9} fill="#2f8f5a" stroke={INK} strokeWidth={3} />
			</g>
		);
	if (s.crown === 'turban')
		return (
			<g transform="translate(4 -150)">
				<path d="M-62 14 Q-70 -60 0 -72 Q70 -70 66 10 Q0 -6 -62 14 Z" fill={s.turban} stroke={INK} strokeWidth={6} />
				{[-40, -14, 12].map((y) => <path key={y} d={`M-58 ${y} Q0 ${y - 22} 62 ${y - 6}`} stroke={INK} strokeWidth={4} fill="none" />)}
				<path d="M-58 0 Q-100 20 -96 70" stroke={s.turban} strokeWidth={22} fill="none" strokeLinecap="round" />
			</g>
		);
	if (s.crown === 'tiara')
		return (
			<g>
				<path d="M-36 -150 Q10 -184 62 -150" stroke={INK} strokeWidth={18} fill="none" strokeLinecap="round" />
				<path d="M-36 -150 Q10 -184 62 -150" stroke="#f2c14e" strokeWidth={9} fill="none" strokeLinecap="round" />
				<path d="M22 -172 l10 -26 l10 26 Z" fill="#f2c14e" stroke={INK} strokeWidth={4} />
				<circle cx={32} cy={-176} r={6} fill="#c22b34" />
				<path d="M52 -158 L58 -142" stroke="#f2c14e" strokeWidth={4} />
				<circle cx={58} cy={-140} r={6} fill="#f2c14e" stroke={INK} strokeWidth={3} />
			</g>
		);
	if (s.crown === 'devi')
		return (
			<g transform="translate(6 -160)">
				<path d="M-52 10 L-44 -50 Q-30 -90 -10 -110 L6 -160 L22 -110 Q42 -90 56 -50 L62 10 Z" fill="#f2c14e" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
				{[-10, -50, -90].map((y, i) => <path key={y} d={`M${-46 + i * 12} ${y} H${56 - i * 12}`} stroke={INK} strokeWidth={4} />)}
				{[-26, 6, 38].map((x) => <circle key={x} cx={x} cy={-28} r={7} fill="#c22b34" stroke={INK} strokeWidth={3} />)}
				<circle cx={6} cy={-70} r={9} fill="#2f8f5a" stroke={INK} strokeWidth={3} />
			</g>
		);
	if (s.crown === 'ravan')
		return (
			<g transform="translate(6 -160)">
				<path d="M-60 10 L-56 -60 L-38 -30 L-24 -100 L-6 -40 L6 -130 L18 -40 L36 -100 L50 -30 L68 -60 L70 10 Z" fill="#f2c14e" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
				<path d="M-58 -8 H68" stroke={INK} strokeWidth={4} />
				{[-34, 6, 46].map((x) => <circle key={x} cx={x} cy={-22} r={8} fill="#2f8f5a" stroke={INK} strokeWidth={3} />)}
				<circle cx={6} cy={-118} r={7} fill="#c22b34" stroke={INK} strokeWidth={3} />
			</g>
		);
	if (s.crown === 'jata')
		return (
			<g transform="translate(0 -150)">
				<path d="M-60 0 Q-70 -60 -40 -80 Q-60 -130 -10 -140 Q30 -160 46 -120 Q70 -90 50 -50 Q60 -20 40 0 Z" fill={s.hairColor ?? '#3a2418'} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
				{[-40, -10, 20].map((x) => <path key={x} d={`M${x} -20 Q${x - 10} -70 ${x + 6} -120`} stroke="#6a4a30" strokeWidth={4} fill="none" />)}
				<path d="M40 -120 A34 34 0 1 1 70 -70 A26 26 0 1 0 40 -120 Z" fill="#fbf3e2" stroke={INK} strokeWidth={4} />
				<path d="M-20 -136 q10 -20 0 -40 q-10 -20 6 -40" stroke="#4aa3d8" strokeWidth={8} fill="none" strokeLinecap="round" />
			</g>
		);
	if (s.crown === 'rishi')
		return (
			<g transform="translate(-10 -160)">
				<ellipse cx={0} cy={-30} rx={48} ry={44} fill={s.hairColor ?? '#e9e2d4'} stroke={INK} strokeWidth={6} />
				{[-24, 0, 24].map((x) => <path key={x} d={`M${x} 6 Q${x - 8} -30 ${x + 4} -66`} stroke="#b8ad9a" strokeWidth={4} fill="none" />)}
				<path d="M-40 -6 H44" stroke="#c22b34" strokeWidth={8} strokeLinecap="round" />
			</g>
		);
	if (s.crown === 'helmet')
		return (
			<g transform="translate(6 -150)">
				<path d="M-62 30 Q-66 -66 0 -78 Q66 -72 70 26 Z" fill="#8a8f9a" stroke={INK} strokeWidth={6} />
				<path d="M-62 20 H70" stroke={INK} strokeWidth={5} />
				<path d="M-60 6 H68" stroke="#f2c14e" strokeWidth={8} />
				<path d="M0 -78 L6 -120 L12 -78 Z" fill="#f2c14e" stroke={INK} strokeWidth={4} />
				<path d="M6 -120 q-30 -10 -50 10" stroke="#c22b34" strokeWidth={10} fill="none" strokeLinecap="round" />
			</g>
		);
	return null;
};

const HumanHead: React.FC<{p: Pose; s: Spec}> = ({p, s}) => (
	<g>
		{s.halo ? (
			<g>
				<circle cx={10} cy={-110} r={170} fill={s.halo} stroke={INK} strokeWidth={6} opacity={0.9} />
				<circle cx={10} cy={-110} r={140} fill="none" stroke={INK} strokeWidth={3} strokeDasharray="3 14" />
			</g>
		) : null}
		{s.hair === 'long' ? <path d={s.female ? 'M-40 -150 Q-100 -100 -96 80 Q-80 120 -54 90 Q-52 -30 -10 -100 Z' : 'M-40 -150 Q-90 -100 -80 40 Q-60 70 -30 40 Q-40 -40 -10 -100 Z'} fill={s.hairColor ?? '#14100e'} stroke={INK} strokeWidth={5} /> : null}
		{s.female ? (
			<g>
				<circle cx={-52} cy={-118} r={38} fill={s.hairColor ?? '#14100e'} stroke={INK} strokeWidth={5} />
				{[-80, -60, -40].map((y, i) => <circle key={y} cx={-84 + i * 4} cy={y - 50} r={9} fill="#fbf3e2" stroke={INK} strokeWidth={3} />)}
			</g>
		) : null}
		<path d="M-44 -70 Q-56 -150 10 -168 Q58 -170 64 -120 L66 -104 L84 -80 L66 -74 Q72 -64 66 -56 Q70 -44 58 -36 Q34 -16 0 -18 Q-34 -22 -44 -70 Z" fill={s.skin} stroke={INK} strokeWidth={OUT} strokeLinejoin="round" />
		{s.hair === 'short' || (!s.hair && s.crown !== 'turban' && s.crown !== 'helmet') || s.female ? <path d="M-44 -90 Q-50 -160 10 -168 Q40 -168 50 -150 Q0 -150 -20 -100 Z" fill={s.hairColor ?? '#14100e'} /> : null}
		{s.monkey ? (
			<g>
				<path d="M14 -84 Q60 -104 96 -84 Q114 -60 98 -36 Q70 -14 30 -20 Q4 -30 6 -60 Z" fill="#f3d9a8" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
				<ellipse cx={92} cy={-78} rx={8} ry={6} fill={INK} />
				<path d="M-6 -140 Q30 -150 60 -136" stroke="#f3d9a8" strokeWidth={10} fill="none" strokeLinecap="round" />
			</g>
		) : null}
		{p.blink ? (
			<path d="M18 -104 Q36 -96 56 -104" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
		) : (
			<g>
				<path d={`M14 -104 Q34 ${-122 - (p.scream ?? 0) * 8} 58 -106 Q36 ${-92 + (p.scream ?? 0) * 6} 14 -104 Z`} fill="#fbf3e2" stroke={INK} strokeWidth={5} />
				<circle cx={40} cy={-106} r={8} fill={INK} />
				<path d="M58 -106 L70 -112" stroke={INK} strokeWidth={5} strokeLinecap="round" />
			</g>
		)}
		<path d={`M10 ${-128 - p.smile * 0} Q36 ${-142 - (p.scream ?? 0) * 10} 62 -126`} stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
		{s.beard ? <path d="M-30 -60 Q-34 10 20 20 Q60 10 66 -40 Q40 -30 20 -40 Q0 -40 -30 -60 Z" fill="#f1e7d6" stroke={INK} strokeWidth={5} /> : null}
		{s.mustache ? <path d="M40 -66 Q58 -74 72 -66 Q84 -60 92 -74 Q90 -54 70 -56 Q56 -58 40 -62 Z" fill={INK} /> : null}
		{s.female && !p.blink ? <path d="M14 -104 L2 -114 M18 -110 L8 -120" stroke={INK} strokeWidth={4} strokeLinecap="round" /> : null}
		<path d={`M54 -58 Q62 ${-56 + p.smile * 4} 68 -60`} stroke={s.female ? '#c22b34' : '#7a1f2b'} strokeWidth={s.female ? 7 : 5} fill="none" strokeLinecap="round" />
		{p.mouth > 0.08 ? <ellipse cx={62} cy={-56} rx={6} ry={3 + p.mouth * 7} fill="#4a1018" /> : null}
		{s.female ? <circle cx={80} cy={-66} r={10} fill="none" stroke="#f2c14e" strokeWidth={4} /> : null}
		{s.female ? <circle cx={56} cy={-140} r={7} fill="#c22b34" stroke={INK} strokeWidth={2} /> : null}
		{s.tilak === 'tripundra' ? (
			<g>
				{[-148, -140, -132].map((y) => <path key={y} d={`M44 ${y} L62 ${y + 2}`} stroke="#fbf3e2" strokeWidth={4} strokeLinecap="round" />)}
				<circle cx={58} cy={-138} r={4} fill="#c22b34" />
			</g>
		) : s.tilak === 'none' || s.female ? null : (
			<g>
				<path d="M56 -150 L60 -126" stroke="#fbf3e2" strokeWidth={6} strokeLinecap="round" />
				<path d="M57 -146 L59 -132" stroke="#c22b34" strokeWidth={3} />
			</g>
		)}
		<ellipse cx={-6} cy={-92} rx={12} ry={18} fill={s.skin2} stroke={INK} strokeWidth={5} />
		<circle cx={-6} cy={-62} r={s.female ? 14 : 11} fill="#f2c14e" stroke={INK} strokeWidth={4} />
		{s.snake ? (
			<g>
				<path d="M-50 -10 Q0 40 60 0 Q80 -14 96 -4" stroke={INK} strokeWidth={22} fill="none" strokeLinecap="round" />
				<path d="M-50 -10 Q0 40 60 0 Q80 -14 96 -4" stroke="#3f8f4a" strokeWidth={12} fill="none" strokeLinecap="round" />
				<path d="M-50 -10 Q0 40 60 0" stroke="#f2c14e" strokeWidth={3} strokeDasharray="3 12" fill="none" />
				<ellipse cx={100} cy={-6} rx={16} ry={11} fill="#3f8f4a" stroke={INK} strokeWidth={4} />
				<circle cx={104} cy={-9} r={3} fill={INK} />
			</g>
		) : null}
		<Crown s={s} />
	</g>
);

const BearHead: React.FC<{p: Pose; s: Spec}> = ({p, s}) => {
	const sc = p.scream ?? 0;
	return (
		<g>
			<circle cx={-30} cy={-176} r={30} fill={s.skin} stroke={INK} strokeWidth={OUT} />
			<circle cx={-30} cy={-176} r={14} fill="#a8703e" />
			<path d="M-70 -80 Q-84 -190 0 -200 Q60 -204 80 -150 Q96 -130 132 -124 Q160 -118 158 -96 Q154 -74 120 -70 Q86 -64 66 -52 Q30 -24 -10 -26 Q-60 -30 -70 -80 Z" fill={s.skin} stroke={INK} strokeWidth={OUT} strokeLinejoin="round" />
			<path d="M80 -146 Q110 -126 150 -116 Q156 -100 148 -92 Q110 -94 80 -104 Z" fill="#8a5a36" />
			<ellipse cx={154} cy={-108} rx={14} ry={12} fill="#120a08" stroke={INK} strokeWidth={3} />
			{[[-40, -140], [-20, -110], [-50, -100], [0, -170], [20, -150]].map(([x, y], i) => (
				<path key={i} d={`M${x} ${y} q8 -6 16 0`} stroke="#b87a3a" strokeWidth={4} fill="none" strokeLinecap="round" />
			))}
			{p.mouth > 0.08 || sc > 0.08 ? (
				<path d={`M74 -66 Q110 ${-64 + Math.max(p.mouth, sc * 2) * 22} 140 -76 Q110 -70 74 -66 Z`} fill="#5a1418" stroke={INK} strokeWidth={4} />
			) : (
				<path d="M84 -66 Q112 -68 136 -78" stroke={INK} strokeWidth={4} fill="none" />
			)}
			{s.beard ? <path d="M-64 -52 Q-70 0 -44 -6 Q-36 22 -14 6 Q0 30 20 8 Q38 24 50 -8 Q62 -22 56 -44 Q0 -28 -64 -52 Z" fill="#f1e7d6" stroke={INK} strokeWidth={5} strokeLinejoin="round" /> : null}
			{p.blink ? (
				<path d="M28 -132 Q42 -124 58 -132" stroke="#f1e7d6" strokeWidth={6} fill="none" strokeLinecap="round" />
			) : (
				<g>
					<path d={`M24 -132 Q42 ${-148 - sc * 8} 62 -134 Q42 ${-120 + sc * 6} 24 -132 Z`} fill="#fbf3e2" stroke={INK} strokeWidth={5} />
					<circle cx={46} cy={-133} r={7} fill={INK} />
				</g>
			)}
			<path d={`M18 ${-152 - sc * 10} Q40 ${-166 - sc * 10} 66 -150`} stroke={s.beard ? '#f1e7d6' : INK} strokeWidth={s.beard ? 9 : 6} fill="none" strokeLinecap="round" />
			{s.crown === 'bear' ? (
				<g transform="translate(-8 -196) rotate(-8)">
					<path d="M-42 8 L-36 -26 L-18 -10 L0 -40 L18 -10 L36 -26 L42 8 Z" fill="#f2c14e" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
					<circle cx={0} cy={-6} r={6} fill="#c22b34" />
				</g>
			) : null}
			{s.crown === 'scarf' ? <path d="M-96 -40 Q-110 -200 -10 -214 Q50 -216 70 -170 Q20 -186 -20 -170 Q-70 -140 -60 -20 Z" fill={s.top} stroke={INK} strokeWidth={6} /> : null}
		</g>
	);
};

const Torso: React.FC<{h: V; s: V; lean: number; spec: Spec}> = ({h, s, lean, spec}) => {
	const r = (lean * Math.PI) / 180;
	const f: V = [Math.cos(r), Math.sin(r)];
	const bear = spec.body === 'bear';
	const big = bear ? 1.5 : 1;
	const P = (p: V, k: number): string => `${p[0] + f[0] * k} ${p[1] + f[1] * k}`;
	const mid: V = [(h[0] + s[0]) / 2, (h[1] + s[1]) / 2];
	const d = `M${P(h, -44 * big)} L${P(s, -52 * big)} Q${P(s, 20 * big)} ${P(s, 66 * big)} Q${P(mid, 78 * big)} ${P(h, 50 * big)} Z`;
	return (
		<g>
			<path d={d} fill={spec.top ?? spec.skin} stroke={INK} strokeWidth={OUT} strokeLinejoin="round" />
			{bear && !spec.top ? (
				<>
					<path d={d} fill="url(#furPat)" />
					{spec.crown === 'bear' ? <path d={`M${P(s, 30)} Q${P(mid, 74)} ${P(h, 30)}`} stroke="#f2c14e" strokeWidth={10} fill="none" /> : null}
				</>
			) : null}
			{!bear && !spec.top ? (
				<>
					<path d={`M${P(s, -40)} Q${P(mid, 20)} ${P(h, 46)}`} stroke="#f2c14e" strokeWidth={8} fill="none" />
					<path d={`M${P(s, 10)} Q${P([s[0] * 0.75 + h[0] * 0.25, s[1] * 0.75 + h[1] * 0.25], 66)} ${P([s[0] * 0.55 + h[0] * 0.45, s[1] * 0.55 + h[1] * 0.45], 70)}`} stroke="#fbf3e2" strokeWidth={9} strokeDasharray="2 12" strokeLinecap="round" fill="none" />
				</>
			) : null}
			{spec.top ? <path d={`M${P(s, -30)} L${P(h, 20)}`} stroke={spec.border} strokeWidth={10} /> : null}
		</g>
	);
};

export type Prop = 'bow' | 'mace' | 'flute' | 'mani' | 'trishul' | 'sword' | 'spear' | 'staff' | 'lotus' | 'none';

// Full figure. x,y is the ground point under the hips; flip makes it face left.
export const Figure: React.FC<{kind: Kind; p: Pose; x: number; y: number; s?: number; flip?: boolean; prop?: Prop; glow?: number}> = ({kind, p, x, y, s = 1, flip, prop = 'none', glow = 0}) => {
	const sp = SPEC[kind];
	const bear = sp.body === 'bear';
	const hip: V = [0, p.hipY];
	const kF = at(hip, p.legF[0], sp.thigh);
	const aF = at(kF, p.legF[1], sp.shin);
	const kB = at(hip, p.legB[0], sp.thigh);
	const aB = at(kB, p.legB[1], sp.shin);
	const sh = at(hip, 180 - p.lean, sp.torso);
	const eF = at(sh, p.armF[0], sp.upper);
	const wF = at(eF, p.armF[1], sp.fore);
	const eB = at(sh, p.armB[0], sp.upper);
	const wB = at(eB, p.armB[1], sp.fore);
	const neck = at(sh, 180 - p.lean, 24);
	const foot = (ank: V, a: number) => <Seg a={ank} b={at(ank, a + 90, bear ? 56 : 48)} w={bear ? 40 : 26} c={sp.skin} />;
	const chest = at(sh, 180 - p.lean + 100, bear ? 70 : 40);
	return (
		<g transform={`translate(${x} ${y}) scale(${(flip ? -1 : 1) * s} ${s})`}>
			{sp.monkey ? (
				<g>
					<path d={`M-20 ${p.hipY + 10} Q-240 ${p.hipY + 80} -230 ${p.hipY - 160} Q-222 ${p.hipY - 300} -130 ${p.hipY - 290}`} stroke={INK} strokeWidth={34} fill="none" strokeLinecap="round" />
					<path d={`M-20 ${p.hipY + 10} Q-240 ${p.hipY + 80} -230 ${p.hipY - 160} Q-222 ${p.hipY - 300} -130 ${p.hipY - 290}`} stroke={sp.skin2} strokeWidth={20} fill="none" strokeLinecap="round" />
				</g>
			) : null}
			<Seg a={sh} b={eB} w={sp.wArm} c={sp.top && !bear ? sp.top : sp.skin2} />
			<Seg a={eB} b={wB} w={sp.wArm - 8} c={sp.skin2} />
			{prop === 'bow' ? (
				<g transform={`translate(${wB[0]} ${wB[1] + 20})`}>
					<path d="M30 -330 Q-60 0 30 330" stroke={INK} strokeWidth={22} fill="none" strokeLinecap="round" />
					<path d="M30 -330 Q-60 0 30 330" stroke="#8a4a1e" strokeWidth={12} fill="none" strokeLinecap="round" />
					<path d="M30 -330 L30 330" stroke="#f3e6c0" strokeWidth={3} />
				</g>
			) : null}
			{p.hand !== 'namaste' ? <Hand p={wB} a={p.armB[1]} bear={bear} type="open" c={sp.skin2} /> : null}
			<Seg a={kB} b={aB} w={sp.wShin} c={sp.skin2} />
			{foot(aB, p.legB[1])}
			<Seg a={hip} b={kB} w={sp.wLeg} c={sp.cloth2} />
			{sp.quiver ? (
				<g transform={`translate(${sh[0]} ${sh[1]}) rotate(${p.lean})`}>
					<rect x={-70} y={-10} width={36} height={240} rx={10} fill="#8a4a1e" stroke={INK} strokeWidth={5} />
					{[-62, -50, -40].map((xx) => <path key={xx} d={`M${xx} -10 l-6 -50`} stroke={INK} strokeWidth={4} />)}
					{[-68, -56, -46].map((xx) => <path key={xx} d={`M${xx} -60 l-6 -14 l12 0 Z`} fill="#c22b34" stroke={INK} strokeWidth={2} />)}
				</g>
			) : null}
			<Torso h={hip} s={sh} lean={p.lean} spec={sp} />
			{prop === 'mani' || glow > 0 ? (
				<g transform={`translate(${chest[0]} ${chest[1]})`}>
					<circle r={60 + 20 * glow} fill="#ffe27a" opacity={0.35 + 0.3 * glow} />
					<path d="M0 -24 L20 0 L0 24 L-20 0 Z" fill="#e2462b" stroke={INK} strokeWidth={4} />
					<path d="M0 -24 L8 0 L0 24" fill="#f6c343" opacity={0.7} />
				</g>
			) : null}
			<Seg a={hip} b={kF} w={sp.wLeg + 6} c={sp.cloth} />
			<line x1={kF[0]} y1={kF[1]} x2={at(kF, p.legF[0] + 180, 18)[0]} y2={at(kF, p.legF[0] + 180, 18)[1]} stroke={sp.border} strokeWidth={sp.wLeg + 4} />
			<Seg a={kF} b={aF} w={sp.wShin} c={sp.skin} />
			{foot(aF, p.legF[1])}
			<g transform={`translate(${hip[0]} ${hip[1]}) rotate(${p.lean})`}>
				<rect x={bear ? -80 : -56} y={-30} width={bear ? 170 : 116} height={34} rx={10} fill={sp.border} stroke={INK} strokeWidth={5} />
				<path d="M30 0 L22 150 L54 150 Z" fill={sp.border} stroke={INK} strokeWidth={4} />
			</g>
			<g transform={`translate(${neck[0]} ${neck[1]}) rotate(${p.lean + p.neck})`}>
				{/* Ravan: extra heads in a row behind the main one, farthest first */}
				{Array.from({length: sp.heads ?? 0}, (_, k) => (sp.heads ?? 0) - k).map((k) => (
					<g key={k} transform={`translate(${-k * 78} ${8 + k * 4}) scale(0.86)`}>
						<HumanHead p={{...p, mouth: 0}} s={{...sp, heads: 0, hair: undefined, crown: 'king'}} />
					</g>
				))}
				{bear ? <BearHead p={p} s={sp} /> : <HumanHead p={p} s={sp} />}
			</g>
			<Seg a={sh} b={eF} w={sp.wArm} c={sp.top && !bear ? sp.top : sp.skin} />
			<Seg a={eF} b={wF} w={sp.wArm - 8} c={sp.skin} />
			<circle cx={wF[0]} cy={wF[1]} r={sp.wArm / 2 - 2} fill="none" stroke="#f2c14e" strokeWidth={8} />
			{prop === 'mace' ? (
				<g transform={`translate(${wF[0]} ${wF[1]}) rotate(${-p.armF[1] + 180})`}>
					<rect x={-9} y={-20} width={18} height={300} fill="#c9923e" stroke={INK} strokeWidth={5} />
					<ellipse cx={0} cy={-80} rx={60} ry={74} fill="#f2c14e" stroke={INK} strokeWidth={6} />
					{[-110, -80, -50].map((yy) => <path key={yy} d={`M-56 ${yy} Q0 ${yy + 12} 56 ${yy}`} stroke={INK} strokeWidth={4} fill="none" />)}
					<path d="M0 -154 L0 -176" stroke={INK} strokeWidth={8} strokeLinecap="round" />
				</g>
			) : null}
			{prop === 'trishul' || prop === 'spear' || prop === 'staff' ? (
				// Long weapons stand upright in the front hand.
				<g transform={`translate(${wF[0]} ${wF[1]})`}>
					<rect x={-9} y={prop === 'staff' ? -300 : -340} width={18} height={prop === 'staff' ? 600 : 640} rx={8} fill={prop === 'staff' ? '#8a5a2a' : '#c9923e'} stroke={INK} strokeWidth={5} />
					{prop === 'trishul' ? (
						<g transform="translate(0 -340)">
							<path d="M-60 -10 Q-64 -60 -50 -100 L-40 -60 Q-30 -30 0 -24 Q30 -30 40 -60 L50 -100 Q64 -60 60 -10 Q30 20 0 14 Q-30 20 -60 -10 Z" fill="#d8dde6" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
							<path d="M-12 -20 L0 -130 L12 -20 Z" fill="#d8dde6" stroke={INK} strokeWidth={5} />
							<rect x={-22} y={6} width={44} height={22} rx={6} fill="#f2c14e" stroke={INK} strokeWidth={4} />
							<path d="M-22 40 q-24 10 -18 34 M22 40 q24 10 18 34" stroke="#c22b34" strokeWidth={6} fill="none" />
						</g>
					) : null}
					{prop === 'spear' ? <path d="M-20 -330 L0 -430 L20 -330 Z" fill="#d8dde6" stroke={INK} strokeWidth={5} /> : null}
					{prop === 'staff' ? <path d="M-14 -300 Q-30 -340 0 -350 Q30 -340 14 -300" fill="none" stroke={INK} strokeWidth={6} /> : null}
				</g>
			) : null}
			{prop === 'sword' ? (
				<g transform={`translate(${wF[0]} ${wF[1]}) rotate(${-p.armF[1] + 180})`}>
					<path d="M-14 -30 L-12 -300 L0 -340 L12 -300 L14 -30 Z" fill="#d8dde6" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
					<path d="M0 -40 L0 -290" stroke="#9aa0ab" strokeWidth={3} />
					<rect x={-44} y={-34} width={88} height={18} rx={8} fill="#f2c14e" stroke={INK} strokeWidth={4} />
					<rect x={-9} y={-16} width={18} height={60} rx={6} fill="#7a1f2b" stroke={INK} strokeWidth={4} />
				</g>
			) : null}
			{prop === 'lotus' ? (
				<g transform={`translate(${wF[0]} ${wF[1] - 40})`}>
					{[-60, -30, 0, 30, 60].map((a) => (
						<path key={a} d="M0 0 Q-22 -40 0 -84 Q22 -40 0 0 Z" fill={a === 0 ? '#f7a8c4' : '#f28fb0'} stroke={INK} strokeWidth={4} transform={`rotate(${a})`} />
					))}
					<circle cx={0} cy={-8} r={10} fill="#f2c14e" stroke={INK} strokeWidth={3} />
				</g>
			) : null}
			{prop === 'flute' ? (
				<g transform={`translate(${wF[0]} ${wF[1]}) rotate(${-p.armF[1] + 120})`}>
					<rect x={-8} y={-120} width={16} height={240} rx={8} fill="#c9923e" stroke={INK} strokeWidth={4} />
					{[-80, -50, -20, 10].map((yy) => <circle key={yy} cx={0} cy={yy} r={4} fill={INK} />)}
				</g>
			) : null}
			<Hand p={wF} a={p.armF[1]} bear={bear} type={p.hand} c={sp.skin} />
		</g>
	);
};

export const RigDefs: React.FC = () => (
	<defs>
		<pattern id="furPat" width="34" height="30" patternUnits="userSpaceOnUse">
			<path d="M4 18 q8 -10 16 0" stroke="#b87a3a" strokeWidth={4} fill="none" strokeLinecap="round" />
			<path d="M20 4 q6 -6 12 0" stroke="#8a5a2a" strokeWidth={3} fill="none" strokeLinecap="round" />
		</pattern>
	</defs>
);
