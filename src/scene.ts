import type React from 'react';

// What every scene's draw() receives.
//  t    = seconds since the reel started
//  lt   = seconds since THIS scene started (use it for the scene's own animation)
//  dur  = this scene's length in seconds
//  talk = 0..1 loudness of the voice right now; pass it as `mouth` to whoever is speaking
export type Ctx = {t: number; lt: number; dur: number; talk: number};

// One scene = one line of script.txt.
//  push   = slow camera zoom over the scene (0.05 = 5%)
//  fx, fy = point the camera zooms towards (default 540, 1100)
export type SceneDef = {push?: number; fx?: number; fy?: number; draw: (c: Ctx) => React.ReactNode};
