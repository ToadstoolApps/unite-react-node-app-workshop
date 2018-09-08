import React from 'react';
import { ResourceList, Thumbnail, Button } from '@shopify/polaris';

export default function GameItem({ onAddGame, game }) {
	const { gameId, yearPublished, name, thumbnail } = game;
	const media = <Thumbnail source={thumbnail} alt={name} />;

	return (
		<ResourceList.Item
			id={gameId}
			media={media}
			accessibilityLabel={`View details for ${name}`}>
			<h3>{name}</h3>
			<div>{yearPublished}</div>
			<Button onClick={() => { onAddGame(name); }}>Create product</Button>
		</ResourceList.Item>
	);
}
