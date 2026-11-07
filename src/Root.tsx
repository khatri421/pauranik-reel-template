import React from 'react';
import {Composition, Still} from 'remotion';
import timing from './generated/timing.json';
import {Library, LIB_H, LIB_W} from './Library';
import {Reel} from './Reel';

export const RemotionRoot: React.FC = () => (
	<>
		<Composition id="Reel" component={Reel} durationInFrames={Math.max(30, Math.round(timing.duration * 30))} fps={30} width={1080} height={1920} />
		<Still id="Library" component={Library} width={LIB_W} height={LIB_H} />
	</>
);
