import React from 'react';
import { EmptyState } from '@shopify/polaris';

export default class PageNotFound extends React.Component {
	render() {
		return (
			<EmptyState
				heading="Page Not Found (404)"
				action={{ content: 'Return to Home' }}
			>
				<p>Sorry, the page your were looking for could not be found.</p>
			</EmptyState>
		);
	}
}