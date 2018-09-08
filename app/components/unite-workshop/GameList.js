import React from 'react';
import { ResourceList, Card } from '@shopify/polaris';

import GameItem from './GameItem';

export default function GameList({ games = [], onAddGame }) {
	const gameItems = games.map((game) => (
		<GameItem key={game.name} game={game} onAddGame={onAddGame} />
	));

	return (
		<Card>
			<ResourceList
				resourceName={{ singular: 'boardgame', plural: 'boardgames' }}
				items={games}
				renderItem={(game) => <GameItem key={game.name} game={game} onAddGame={onAddGame} />}
			/>
		</Card>
	);
}
