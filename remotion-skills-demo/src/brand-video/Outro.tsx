import {interpolate, useCurrentFrame, Img, staticFile} from 'remotion';
import {AbsoluteFill} from 'remotion';

const CTA: React.FC<{children: React.ReactNode}> = ({children}) => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame, [20, 40], [0, 1]);
	return (
		<div style={{fontSize: 50, fontFamily: 'sans-serif', textAlign: 'center', marginTop: 30, opacity}}>
			{children}
		</div>
	);
};

export const Outro: React.FC = () => {
	const frame = useCurrentFrame();
	const scale = interpolate(frame, [0, 20], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill style={{backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
			<div style={{transform: `scale(${scale})`}}>
				<Img src={staticFile('assets/logo.svg')} />
			</div>
			<CTA>Visit us at ourbrand.com</CTA>
		</AbsoluteFill>
	);
};
