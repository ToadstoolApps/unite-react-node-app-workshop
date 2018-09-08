import React from 'react';
import { renderToString } from 'react-dom/server';
import HTML from '@shopify/react-html';
import { StaticRouter } from 'react-router';

import App from '../app/';

export default (ctx) => {
	const markup = renderToString(
		<HTML deferedScripts={[{ path: 'bundle.js' }]}>
			<StaticRouter location={ctx.url} context={{}}>
				<App shopOrigin={ctx.session.shop} apiKey={process.env.SHOPIFY_APP_KEY} />
			</StaticRouter>
		</HTML>,
	);
	ctx.body = markup;
};