import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {AbsoluteFill} from 'remotion';

const data = [40, 70, 50, 90, 60];

const barChartContainer: React.CSSProperties = {
	display: 'flex',
	justifyContent: 'space-around',
	alignItems: 'flex-end',
	width: '80%',
	height: '80%',
};

const barStyle: React.CSSProperties = {
	backgroundColor: 'salmon',
	width: '15%',
};

export const Scene2: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const STAGGER_DELAY = 5;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'lightgreen',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div style={barChartContainer}>
				{data.map((item, i) => {
					const delay = i * STAGGER_DELAY;
					const height =
						spring({
							frame: frame - delay,
							fps,
							config: {damping: 200},
						}) *
						item *
						5; // Multiply by 5 for visual scaling

					return <div key={i} style={{...barStyle, height}} />;
				})}
			</div>
		</AbsoluteFill>
	);
};
