import {Easing, interpolate} from 'remotion';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

export const smooth = Easing.bezier(0.45, 0, 0.15, 1);
export const snappy = Easing.bezier(0.16, 1, 0.3, 1);
export const overshoot = Easing.out(Easing.back(1.9));

// 0 to 1 between two times, in seconds.
export const ramp = (t: number, from: number, to: number, easing = smooth) =>
	Number.isFinite(from) ? interpolate(t, [from, to], [0, 1], {...clamp, easing}) : 0;

// Scale for an element that pops in at `at` and optionally out at `until`.
export const pop = (t: number, at: number, until = Infinity) =>
	ramp(t, at, at + 0.28, overshoot) * (1 - ramp(t, until, until + 0.2));

export const fade = (t: number, at: number, until = Infinity, len = 0.2) =>
	ramp(t, at, at + len) * (1 - ramp(t, until, until + len));

export const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

export type Key = {t: number; x: number; y: number; z: number};

// Camera position between keyframes. Zoom interpolates in log space so it feels constant speed.
export const cameraAt = (keys: Key[], t: number) => {
	if (t <= keys[0].t) return keys[0];
	for (let i = 0; i < keys.length - 1; i++) {
		const a = keys[i];
		const b = keys[i + 1];
		if (t <= b.t) {
			const k = smooth((t - a.t) / Math.max(b.t - a.t, 0.001));
			return {
				t,
				x: lerp(a.x, b.x, k),
				y: lerp(a.y, b.y, k),
				z: Math.exp(lerp(Math.log(a.z), Math.log(b.z), k)),
			};
		}
	}
	return keys[keys.length - 1];
};
