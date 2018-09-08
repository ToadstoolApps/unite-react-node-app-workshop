import dotenv from 'dotenv';
import Koa from 'koa';
import views from 'koa-views';
import route from 'koa-route';
import path from 'path';
import webpack from 'koa-webpack';
import session from 'koa-session';
import createShopifyAuth, {	createVerifyRequest, } from '@shopify/koa-shopify-auth';
import renderReactApp from './render-react-app';
import shopifyApiProxy from './koa-route-shopify-api-proxy';
import graphQLProxy from '@shopify/koa-shopify-graphql-proxy';

dotenv.config();
const { SHOPIFY_APP_KEY, SHOPIFY_APP_SECRET } = process.env;

const app = new Koa();
app.keys = [SHOPIFY_APP_SECRET];
app.use(session(app));

app.use(
	createShopifyAuth({
		apiKey: SHOPIFY_APP_KEY,
		secret: SHOPIFY_APP_SECRET,
		// our app's permissions
		scopes: ['write_products', 'read_products', 'read_orders', 'write_orders'],
		// our own custom logic after authentication has completed
		afterAuth(ctx) {
			const { shop, accessToken } = ctx.session;
			//console.log('We did it!', shop, accessToken);
			ctx.redirect('/');
		},
	}),
);

app.use(views(path.join(__dirname, '/views'), { extension: 'ejs' }));
app.use(route.get('/install', async (ctx, next) => { await ctx.render('install'); }));

// secure all middleware after this line
app.use(createVerifyRequest({fallbackRoute: "/install"}));

app.use(route.all('/shopify/api/(.*)', shopifyApiProxy));
app.use(graphQLProxy);

app.use(webpack());
app.use(renderReactApp);

export default app;
