import {spring, useCurrentFrame, useVideoConfig, interpolate, Sequence, Img, staticFile} from 'remotion';
import {AbsoluteFill} from 'remotion';
import React from 'react';

const Title: React.FC<{title: string}> = ({title}) => {
	const frame = useCurrentFrame();
	const words = title.split(' ');
	return (
		<h1 style={{fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: 80, textAlign: 'center'}}>
			{words.map((word, i) => {
				const delay = i * 5;
				const opacity = interpolate(frame, [delay, delay + 10], [0, 1], {
					extrapolateLeft: 'clamp',
					extrapolateRight: 'clamp',
				});
				return <span style={{opacity}}>{word} </span>;
			})}
		</h1>
	);
};

const Description: React.FC<{text: string}> = ({text}) => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame, [0, 20], [0, 1]);
	return <p style={{fontFamily: 'sans-serif', fontSize: 40, textAlign: 'center', opacity}}>{text}</p>;
};

export const FeatureScene: React.FC<{
	icon: string;
	title: string;
	description: string;
}> = ({icon, title, description}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const slideIn = spring({
		frame,
		fps,
		config: {
			damping: 200,
		},
	});

	return (
		<AbsoluteFill style={{backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
			<div style={{transform: `translateX(${(1 - slideIn) * -1000}px)`}}>
				<Img src={staticFile(icon)} style={{height: 200}} />
			</div>
			<Sequence from={10}>
				<Title title={title} />
			</Sequence>
			<Sequence from={30}>
				<Description text={description} />
			</Sequence>
		</AbsoluteFill>
	);
};
