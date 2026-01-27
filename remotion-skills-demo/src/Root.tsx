import {Composition, staticFile, Audio} from 'remotion';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {slide} from '@remotion/transitions/slide';
import {wipe} from '@remotion/transitions/wipe';
import {Intro} from './brand-video/Intro';
import {FeatureScene} from './brand-video/FeatureScene';
import {Outro} from './brand-video/Outro';

// A placeholder icon for the feature scenes
const ICON_PLACEHOLDER = 'assets/logo.svg';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="BrandVideo"
				component={BrandVideo}
				durationInFrames={600}
				fps={30}
				width={1920}
				height={1080}
			/>
		</>
	);
};

const BrandVideo: React.FC = () => {
	return (
		<div>
			<TransitionSeries>
				<TransitionSeries.Sequence durationInFrames={90}>
					<Intro />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition
					presentation={slide({direction: 'from-right'})}
					timing={linearTiming({durationInFrames: 30})}
				/>

				<TransitionSeries.Sequence durationInFrames={120}>
					<FeatureScene
						icon={ICON_PLACEHOLDER}
						title="Fast & Reliable"
						description="Experience blazing fast performance."
					/>
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition
					presentation={wipe()}
					timing={linearTiming({durationInFrames: 30})}
				/>

				<TransitionSeries.Sequence durationInFrames={120}>
					<FeatureScene
						icon={ICON_PLACEHOLDER}
						title="Secure by Design"
						description="Your data is always protected."
					/>
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition
					presentation={slide({direction: 'from-left'})}
					timing={linearTiming({durationInFrames: 30})}
				/>

				<TransitionSeries.Sequence durationInFrames={120}>
					<FeatureScene
						icon={ICON_PLACEHOLDER}
						title="24/7 Support"
						description="We are here to help, anytime."
					/>
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition
					presentation={wipe()}
					timing={linearTiming({durationInFrames: 30})}
				/>

				<TransitionSeries.Sequence durationInFrames={90}>
					<Outro />
				</TransitionSeries.Sequence>
			</TransitionSeries>
		</div>
	);
};
