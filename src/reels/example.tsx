// Example reel: reels/example/script.txt (10 lines = 10 scenes).
// Copy this file to src/reels/<naam>.tsx for a new story and replace the scenes.
import React from 'react';
import {overshoot, ramp, snappy} from '../art/anim';
import {Devlok, FLOOR, Samudra, YuddhBhoomi} from '../art/Backgrounds';
import {BLESS, Figure, KNEEL, mix, NAMASTE, pose, STAND, walk} from '../art/Rig';
import {DwarkaCity, Embers, F, FallenCrown, Feather, Ground, Moon, Paper, Rock, ScalePattern, Scene, Sea, Sun} from '../art/World';
import type {SceneDef} from '../scene';

export const CHIP = 'LOK KATHA';

export const SCENES: SceneDef[] = [
	// 1. "Lanka ki yuddh-bhoomi shaant ho chuki thi." - battlefield, Lanka burning, crown in the dust.
	{
		push: 0.12,
		fx: 420,
		fy: 1100,
		draw: ({t, lt}) => (
			<Scene>
				<YuddhBhoomi t={t} />
				<FallenCrown x={720} y={1460} s={0.75} />
				<Figure kind="bear" p={mix(STAND, pose({neck: -12, armF: [16, 40]}), ramp(lt, 0.4, 1.2))} x={300} y={1620} s={1.05} prop="mace" />
				<Embers t={t} />
			</Scene>
		),
	},
	// 2. "Par Jambavan ke mann mein ek ichchha baaki thi." - close on Jambavan, puzzled, scratching his beard.
	{
		push: 0.06,
		draw: ({t, lt}) => (
			<Scene>
				<ScalePattern t={t} />
				<Figure kind="bear" p={pose({neck: -14 + 18 * ramp(lt, 0.2, 0.7), armF: [40, 160 + Math.sin(lt * 14) * 6], hand: 'open', blink: lt > 1.0 && lt < 1.12})} x={400} y={2700} s={2.6} />
			</Scene>
		),
	},
	// 3. "Woh dheere-dheere Shri Ram ke paas pahunche." - sea shore, Jambavan walks up to Ram and Lakshman.
	{
		push: 0.05,
		draw: ({t, lt}) => {
			const k = ramp(lt, 0, 1.4);
			const bear = lt < 1.4 ? walk(lt * 7.5) : mix(walk(1.4 * 7.5), STAND, ramp(lt, 1.4, 1.7));
			return (
				<Scene>
					<Samudra t={t} />
					<Figure kind="lakshman" p={pose({armF: [8, 18]})} x={960} y={1610} s={0.82} flip prop="bow" />
					<Figure kind="ram" p={pose({armF: [8, 18], smile: 0.3})} x={760} y={1650} s={0.9} flip prop="bow" />
					<Figure kind="bear" p={bear} x={-60 + k * 380} y={1660} s={0.9} prop="mace" />
				</Scene>
			);
		},
	},
	// 4. "Haath jodkar bole, \"Prabhu," - Jambavan kneels with folded paws and speaks.
	{
		push: 0.06,
		draw: ({t, lt, talk}) => (
			<Scene>
				<Samudra t={t} />
				<Figure kind="ram" p={pose({smile: 0.3})} x={830} y={FLOOR} s={1.15} flip prop="bow" />
				<Figure kind="bear" p={{...mix(STAND, pose({...NAMASTE, ...KNEEL}), ramp(lt, 0, 0.35, snappy)), mouth: talk}} x={330} y={1720} s={1.15} />
			</Scene>
		),
	},
	// 5. "ek baar aapse dwandva yuddh karna hai.\"" - he rises and lifts his mace high.
	{
		push: 0.08,
		draw: ({t, lt, talk}) => {
			const lift = ramp(lt, 0.1, 0.5, overshoot);
			return (
				<Scene>
					<Samudra t={t} />
					<Figure kind="ram" p={pose({smile: 0.2 + 0.6 * lift})} x={830} y={FLOOR} s={1.15} flip prop="bow" />
					<Figure kind="bear" p={{...mix(STAND, pose({armF: [150, 175], armB: [-10, 10], neck: -10}), lift), mouth: talk}} x={330} y={1720} s={1.15} prop="mace" />
				</Scene>
			);
		},
	},
	// 6. "Shri Ram ne muskurakar haath uthaya." - Ram smiles, a folk sun behind him, hand raised in blessing.
	{
		push: 0.07,
		fy: 700,
		draw: ({t, lt}) => (
			<Scene>
				<Paper tint="#f0c98a" />
				<Sun x={600} y={620} r={230} t={t} />
				<Figure kind="ram" p={mix(pose({smile: 0.2}), pose({...BLESS, smile: 1, neck: 4}), ramp(lt, 0.4, 0.8, snappy))} x={560} y={2200} s={2.1} flip />
			</Scene>
		),
	},
	// 7. "\"Abhi nahi, Jambavan." - Ram speaks, hand on the kneeling Jambavan's head.
	{
		push: 0.06,
		draw: ({t, lt, talk}) => (
			<Scene>
				<Samudra t={t} />
				<circle cx={470} cy={1080} r={260 + 20 * Math.sin(t * 4)} fill="#ffe7a0" opacity={0.45 * ramp(lt, 0.3, 0.8)} />
				<Figure kind="bear" p={pose({...KNEEL, ...NAMASTE, neck: 24, lean: 22, blink: true})} x={360} y={1720} s={1.12} />
				<Figure kind="ram" p={pose({armF: [62 * ramp(lt, 0, 0.5, snappy), 70 * ramp(lt, 0, 0.5, snappy)], smile: 0.8, neck: 12, mouth: talk})} x={780} y={FLOOR} s={1.15} flip prop="bow" />
				<Embers t={t} n={18} c="#f6d77c" />
			</Scene>
		),
	},
	// 8. "Agle avatar mein ye ichchha poori karunga.\"" - the promise: Ram glowing in devlok, devi blessing with a lotus.
	{
		push: 0.06,
		draw: ({t, lt}) => (
			<Scene>
				<Devlok t={t} />
				<Figure kind="devi" p={pose({armF: [60, 120], smile: 0.8})} x={300} y={1720} s={0.95} prop="lotus" />
				<Figure kind="ram" p={mix(pose({smile: 0.5}), pose({...BLESS, smile: 1}), ramp(lt, 0.2, 0.6, snappy))} x={780} y={1740} s={1.05} flip prop="bow" glow={0.4} />
			</Scene>
		),
	},
	// 9. "Jambavan ne intezaar shuru kiya..." - Jambavan waits on a rock while sun and moon race overhead.
	{
		push: 0.05,
		draw: ({t, lt}) => {
			const cyc = lt * 2.4;
			const day = (Math.cos(cyc * Math.PI) + 1) / 2;
			const sky = `rgb(${Math.round(40 + 196 * day)},${Math.round(48 + 162 * day)},${Math.round(92 + 68 * day)})`;
			const a = (cyc % 1) * Math.PI;
			return (
				<Scene>
					<Paper tint={sky} />
					{Math.floor(cyc) % 2 === 0 ? <Sun x={540 - Math.cos(a) * 460} y={760 - Math.sin(a) * 520} r={60} t={t} /> : <Moon x={540 - Math.cos(a) * 460} y={760 - Math.sin(a) * 520} r={60} />}
					<Sea y={900} t={t} c={day > 0.5 ? F.sea : '#1f4a62'} />
					<Rock x={540} y={1320} s={1.2} />
					<Figure kind="bear" p={pose({...KNEEL, neck: -18 + 10 * Math.sin(lt * 2), armF: [20, 60], armB: [-10, 20]})} x={520} y={1130} s={0.95} prop="mace" />
					<Ground y={1300} colors={['#b98a5a', '#9a7048']} />
				</Scene>
			);
		},
	},
	// 10. "aur phir Dwarka mein Krishna aaye." - Dwarka at sunrise, a peacock feather drifts down.
	{
		push: 0.06,
		draw: ({t, lt}) => (
			<Scene>
				<Paper tint="#f3cf96" />
				<Sun x={540} y={760 - ramp(lt, 0, 1.3) * 160} r={110} t={t} />
				<Sea y={1130} t={t} />
				<DwarkaCity x={540} y={1150} s={1.05} t={t} />
				<Feather x={820 + Math.sin(lt * 3) * 40} y={-200 + ramp(lt, 0, 1.3) * 760} rot={20 + Math.sin(lt * 4) * 18} s={0.7} />
			</Scene>
		),
	},
];
