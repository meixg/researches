import {interpolate, useCurrentFrame} from 'remotion';
import {AbsoluteFill} from 'remotion';

export const Scene1: React.FC = () => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame, [0, 30], [0, 1]);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'lightblue',
				justifyContent: 'center',
				alignItems: 'center',
				fontSize: 80,
				fontFamily: 'sans-serif',
			}}
		>
			<div style={{opacity}}>Hello, World!</div>
		</AbsoluteFill>
	);
};
