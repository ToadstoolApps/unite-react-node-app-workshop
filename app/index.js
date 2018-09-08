import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router';
import RoutePropagator from '@shopify/react-shopify-app-route-propagator';
const Propagator = withRouter(RoutePropagator);

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
const client = new ApolloClient({
	fetchOptions: {
		credentials: 'include',
	},
});

import { Provider } from 'react-redux';
import store from './store';
import { AppProvider } from '@shopify/polaris';
import ApiConsole from './components/api-console/';
import UniteWorkshop from './components/unite-workshop/'
import PageNotFound from './components/404';

class App extends Component {
	componentDidMount() {
		// This happens in browser - therefore we are ready to use `window`
		// https://github.com/Shopify/polaris/issues/372#issuecomment-404676882
		this.setState({ workaround: true });
	}
	render() {
		if (!this.state || !this.state.workaround) {
			return (<div />);
		}
		return (
			<ApolloProvider client={client}>
				<Provider store={store}>
					<AppProvider shopOrigin={this.props.shopOrigin} apiKey={this.props.apiKey} /*forceRedirect={true}*/>
						<React.Fragment>
							<Propagator />
							<Switch>
								<Route exact path="/unite-workshop" component={UniteWorkshop} />
								<Route exact path="/api-console" component={ApiConsole} />
								<Route exact path="/">
									<Redirect to="/api-console" />
								</Route>
								<Route exact path="/404" component={PageNotFound} />
								<Route>
									<Redirect to="/404" />
								</Route>
							</Switch>
						</React.Fragment>
					</AppProvider>
				</Provider>
			</ApolloProvider>
		);
	}
}

export default App;
