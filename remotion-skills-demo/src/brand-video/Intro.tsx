import {spring, useCurrentFrame, useVideoConfig, Img, staticFile, interpolate} from 'remotion';
import {AbsoluteFill} from 'remotion';

const Title: React.FC<{children: React.ReactNode}> = ({children}) => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame, [30, 50], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<div
			style={{
				fontSize: 80,
				fontWeight: 'bold',
				fontFamily: 'sans-serif',
				textAlign: 'center',
				marginTop: 20,
				opacity,
			}}
		>
			{children}
		</div>
	);
};

export const Intro: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const scale = spring({
		frame,
		fps,
		config: {
			stiffness: 100,
		},
	});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'white',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div style={{transform: `scale(${scale})`}}>
				<Img src={staticFile('assets/logo.svg')} />
			</div>
			<Title>Our Brand</Title>
		</AbsoluteFill>
	);
};
