import React from 'react';
import {random} from 'remotion';
import {CaveInside, Court, Throne, Tree} from './Props';
import {INK} from './Rig';
import {Arrow, DwarkaCity, Embers, F, Flag, Ground, LankaFort, Moon, Paper, Sea, Sun} from './World';

// Full-frame backgrounds (1080x1920). Put them first inside <Scene>, then the Figures.
// Characters stand on FLOOR: <Figure ... y={FLOOR} s={1} />. Use y 1600-1750 and s 0.8-1.2 for full body.
export const FLOOR = 1700;

type BgProps = {t: number};

// Folk cloud: a row of scallops with a flat bottom.
export const Cloud: React.FC<{x: number; y: number; s?: number; c?: string}> = ({x, y, s = 1, c = F.cream}) => (
	<g transform={`translate(${x} ${y}) scale(${s})`}>
		<path d="M-160 0 Q-170 -50 -120 -56 Q-110 -110 -50 -100 Q-20 -150 40 -120 Q90 -140 110 -86 Q170 -84 160 0 Z" fill={c} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
		<path d="M-120 -20 q30 -24 60 0 M-10 -40 q30 -24 60 0" stroke={INK} strokeWidth={3} fill="none" opacity={0.5} />
	</g>
);

// Distant hills band.
export const Hills: React.FC<{y: number; c?: string; seed?: string}> = ({y, c = '#8fa86a', seed = 'h'}) => {
	let d = `M-200 ${y + 200} L-200 ${y}`;
	for (let i = 0; i <= 8; i++) {
		const x = -200 + i * 190;
		d += ` Q${x + 95} ${y - 120 - random(`${seed}${i}`) * 160} ${x + 190} ${y}`;
	}
	return <path d={`${d} L1280 ${y + 200} Z`} fill={c} stroke={INK} strokeWidth={6} strokeLinejoin="round" />;
};

// Mud hut with a thatched roof.
export const Hut: React.FC<{x: number; y: number; s?: number; wall?: string}> = ({x, y, s = 1, wall = '#d9a463'}) => (
	<g transform={`translate(${x} ${y}) scale(${s})`}>
		<rect x={-130} y={-200} width={260} height={200} fill={wall} stroke={INK} strokeWidth={6} />
		<path d="M-170 -190 L0 -340 L170 -190 Z" fill="#c9a24a" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
		{[-120, -80, -40, 0, 40, 80, 120].map((k) => <path key={k} d={`M${k * 0.9} -300 L${k * 1.3} -196`} stroke="#8a6a2a" strokeWidth={4} />)}
		<path d="M-30 0 L-30 -110 Q0 -140 30 -110 L30 0 Z" fill={INK} />
		{[-90, 70].map((cx) => <rect key={cx} x={cx} y={-150} width={30} height={30} fill="#7a4a20" stroke={INK} strokeWidth={4} />)}
		<path d="M-130 -40 H130" stroke={F.cream} strokeWidth={6} strokeDasharray="2 18" strokeLinecap="round" />
	</g>
);

// Golden heaven palace on clouds.
export const SkyPalace: React.FC<{x: number; y: number; s?: number}> = ({x, y, s = 1}) => (
	<g transform={`translate(${x} ${y}) scale(${s})`}>
		<rect x={-260} y={-220} width={520} height={220} fill="#f2c14e" stroke={INK} strokeWidth={6} />
		{[-180, 0, 180].map((cx, i) => (
			<g key={cx}>
				<path d={`M${cx - 70} -220 Q${cx - 70} -340 ${cx} ${i === 1 ? -420 : -360} Q${cx + 70} -340 ${cx + 70} -220 Z`} fill="#f6d77c" stroke={INK} strokeWidth={6} />
				<path d={`M${cx} ${i === 1 ? -420 : -360} L${cx} ${i === 1 ? -470 : -400}`} stroke={INK} strokeWidth={5} />
				<path d={`M${cx - 26} 0 L${cx - 26} -90 Q${cx} -126 ${cx + 26} -90 L${cx + 26} 0 Z`} fill="#c22b34" stroke={INK} strokeWidth={5} />
			</g>
		))}
		<path d="M-260 -160 H260" stroke={INK} strokeWidth={4} strokeDasharray="10 10" />
	</g>
);

// 1. Jungle: green tint, hills, many trees, grass.
export const Jungle: React.FC<BgProps> = ({t}) => (
	<g>
		<Paper tint="#dcd89a" />
		<Sun x={820} y={330} r={60} t={t} />
		<Hills y={980} c="#8fa86a" seed="j" />
		<Tree x={120} y={1180} s={1.3} c="#4f7f2e" />
		<Tree x={950} y={1160} s={1.4} c="#5f8f3a" />
		<Tree x={540} y={1100} s={0.9} c="#6f9f44" />
		<Ground y={1150} colors={['#9fbf5a', '#7fa64a', '#6a8f3a']} seed="jg" />
		<Tree x={-40} y={1900} s={1.6} c="#3f6f26" />
		<Tree x={1120} y={1900} s={1.5} c="#4f7f2e" />
	</g>
);

// 2. Mahal (palace court): maroon wall, gold pillars, toran, throne.
export const Mahal: React.FC<BgProps & {throne?: boolean}> = ({t, throne = true}) => (
	<g>
		<Court t={t} />
		{throne ? <Throne x={540} y={1420} s={0.75} /> : null}
	</g>
);

// 3. Yuddh-bhoomi (battlefield) at dusk: red sun, flags, arrows in the dirt, embers.
export const YuddhBhoomi: React.FC<BgProps> = ({t}) => (
	<g>
		<Paper tint="#e9b97c" />
		<Sun x={820} y={420} r={90} t={t} c="#f08a4b" />
		<Hills y={1000} c="#b98a5a" seed="y" />
		<Flag x={140} y={1140} h={320} t={t} c="#c22b34" />
		<Flag x={900} y={1120} h={280} t={t} />
		<Ground y={1100} colors={['#d9a463', '#c4873f', '#a86c30']} seed="yb" />
		<Arrow x={80} y={1460} a={-12} />
		<Arrow x={760} y={1600} a={198} />
		<Arrow x={540} y={1380} a={-30} len={160} />
		<Embers t={t} n={20} />
	</g>
);

// 4. Samudra (sea shore): sun, sea scrolls, sand beach.
export const Samudra: React.FC<BgProps> = ({t}) => (
	<g>
		<Paper />
		<Sun x={230} y={360} r={70} t={t} />
		<Cloud x={760} y={420} s={0.9} />
		<Sea y={820} t={t} />
		<Ground y={1150} colors={[F.sand, F.ochre, '#b97a36']} seed="sm" />
	</g>
);

// 5. Lanka: the golden fort across the sea. fire 0..1.
export const Lanka: React.FC<BgProps & {fire?: number}> = ({t, fire = 0}) => (
	<g>
		<Paper tint={fire > 0 ? '#e9a46c' : F.paper} />
		{fire > 0 ? <Moon x={850} y={360} /> : <Sun x={850} y={360} r={70} t={t} />}
		<Sea y={980} t={t} />
		<LankaFort x={540} y={980} s={0.8} t={t} fire={fire} smoke={fire} />
		<Ground y={1250} colors={['#c9a46a', '#a8823f']} seed="lk" />
	</g>
);

// 6. Devlok / aasmaan: dawn sky, rays, clouds, golden palace, cloud floor.
export const Devlok: React.FC<BgProps> = ({t}) => (
	<g>
		<Paper tint="#f7d9b4" />
		<g transform={`translate(540 760) rotate(${t * 4})`}>
			{Array.from({length: 18}, (_, k) => <path key={k} d="M-40 0 L0 -1400 L40 0 Z" fill="#fbe8a8" opacity={0.55} transform={`rotate(${k * 20})`} />)}
		</g>
		<Cloud x={160} y={420} s={0.8} />
		<Cloud x={900} y={300} s={0.7} />
		<SkyPalace x={540} y={1060} s={1} />
		<Cloud x={240} y={1100} s={1.4} />
		<Cloud x={860} y={1110} s={1.3} />
		<rect x={-200} y={1150} width={1480} height={1000} fill="#fbf3e2" stroke={INK} strokeWidth={6} />
		{[1250, 1420, 1600].map((y, r) => Array.from({length: 7}, (_, k) => <path key={`${r}${k}`} d={`M${k * 180 - 60 + r * 60} ${y} q45 -50 90 0`} stroke="#c9b48a" strokeWidth={5} fill="none" />))}
	</g>
);

// 7. Gufa (cave inside): red rock arches, warm glow. dark 0..1.
export const Gufa: React.FC<BgProps & {dark?: number}> = ({t, dark = 0}) => <CaveInside t={t} dark={dark} />;

// 8. Gaon (village): huts, tree, hills, well.
export const Gaon: React.FC<BgProps> = ({t}) => (
	<g>
		<Paper tint="#f0d39c" />
		<Sun x={800} y={380} r={70} t={t} />
		<Hills y={1000} c="#a8b870" seed="g" />
		<Ground y={1120} colors={['#e3b878', '#d29c58', '#b97a36']} seed="ga" />
		<Hut x={230} y={1260} s={1} />
		<Hut x={760} y={1230} s={0.8} wall="#e0b070" />
		<Tree x={520} y={1220} s={0.8} />
		<g transform="translate(940 1420)">
			<ellipse cx={0} cy={0} rx={90} ry={30} fill="#8a8a8a" stroke={INK} strokeWidth={6} />
			<rect x={-90} y={0} width={180} height={90} fill="#9a9a9a" stroke={INK} strokeWidth={6} />
			<ellipse cx={0} cy={0} rx={64} ry={18} fill={INK} />
		</g>
	</g>
);

// 9. Dwarka on the sea at sunrise (Krishna stories).
export const Dwarka: React.FC<BgProps> = ({t}) => (
	<g>
		<Paper tint="#f3cf96" />
		<Sun x={540} y={640} r={110} t={t} />
		<Sea y={1130} t={t} />
		<DwarkaCity x={540} y={1150} s={1.05} t={t} />
	</g>
);

export const BACKGROUNDS = {jungle: Jungle, mahal: Mahal, yuddhbhoomi: YuddhBhoomi, samudra: Samudra, lanka: Lanka, devlok: Devlok, gufa: Gufa, gaon: Gaon, dwarka: Dwarka} as const;
export type BgName = keyof typeof BACKGROUNDS;
