import {Composition} from 'remotion';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {slide} from '@remotion/transitions/slide';
import {Scene1} from './Scene1';
import {Scene2} from './Scene2';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="SkillsDemo"
				component={SkillsDemo}
				durationInFrames={240}
				fps={30}
				width={1920}
				height={1080}
			/>
		</>
	);
};

const SkillsDemo: React.FC = () => {
	return (
		<TransitionSeries>
			<TransitionSeries.Sequence durationInFrames={90}>
				<Scene1 />
			</TransitionSeries.Sequence>
			<TransitionSeries.Transition
				presentation={slide({direction: 'from-right'})}
				timing={linearTiming({durationInFrames: 30})}
			/>
			<TransitionSeries.Sequence durationInFrames={120}>
				<Scene2 />
			</TransitionSeries.Sequence>
		</TransitionSeries>
	);
};
