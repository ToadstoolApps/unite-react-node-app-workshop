import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import Page from '../CustomPage';

import GameList from './GameList';
import { Banner, Spinner } from '@shopify/polaris';
import Fetch from 'react-fetch-component';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';
const CREATE_PRODUCT = gql`
  mutation CreateProduct($product: ProductInput!) {
    productCreate(input: $product) {
      product {
        id
        title
      }
    }
  }
`;

class UniteWorkshop extends Component {
	static contextTypes = {
		easdk: PropTypes.object,
	};
	render() {
		return (
			<Page title="Unite 2018 Workshop (Boardgame List)" singleColumn>
				<Fetch url="https://boardgameslist.herokuapp.com" as="json" >
					{(fetchResults) => {
						if (fetchResults.loading) {
							return <Spinner size="large" color="teal" accessibilityLabel="Loading games" />;
						}

						if (fetchResults.error) {
							return (
								<Banner	title="Failed to fetch games" status="critical" />
							);
						}

						return (
							<Mutation mutation={CREATE_PRODUCT}>
								{(createProduct, mutationResults) => {
									const loading = mutationResults.loading && <Spinner size="large" color="teal" accessibilityLabel="Creating product" />;

									const error = mutationResults.error && (
										<Banner
											title="Error creating product"
											status="critical"
										/>
									);

									const success = mutationResults.data && (
										<Banner
											title={`successfully created ${mutationResults.data.productCreate.product.title}`}
											status="success" />
									);

									return (
										<React.Fragment>
											{loading}
											{error}
											{success}
											<GameList games={fetchResults.data} onAddGame={(title) => {
												const productInput = {
													title: title,
													productType: 'board game',
												};
												createProduct({
													variables: { product: productInput },
												});
											}} />
										</React.Fragment>);
								}}
							</Mutation>
						);
					}}
				</Fetch>
			</Page>
		);
	}
}

export default UniteWorkshop;