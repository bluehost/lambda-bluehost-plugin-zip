const {Lambda} = require('aws-sdk');
const fetch = require('node-fetch');
const {getResponse} = require('./functions');

exports.handler = async (event) => {

	const lambda = new Lambda();

	const plugin = event.pathParameters.plugin || '';

	const validPlugins = {
		'bluehost-wordpress-plugin': {
			vendorName: 'bluehost',
			packageName: 'bluehost-wordpress-plugin',
			pluginBasename: 'bluehost-wordpress-plugin/bluehost-wordpress-plugin.php'
		},
		'mojo-marketplace-wp-plugin': {
			vendorName: 'mojoness',
			packageName: 'mojo-marketplace-wp-plugin',
			pluginBasename: 'mojo-marketplace-wp-plugin/mojo-marketplace.php'
		}
	};

	if (!plugin || !validPlugins.hasOwnProperty(plugin)) {
		return {
			statusCode: 400,
			body: JSON.stringify('Invalid plugin!'),
		};
	}

	const response = await fetch(
		`https://bluehost-wp-release.com/v1/?vendorName=${ validPlugins[plugin]['vendorName'] }&packageName=${ validPlugins[plugin]['packageName'] }&pluginBasename=${ validPlugins[plugin]['pluginBasename'] }`,
		{method: 'GET'}
	);

	// Proxy error response
	if (response.status !== 200) {
		return getResponse({
			statusCode: response.status,
			body: await response.json(),
		});
	}

	const {package: Location} = await response.json();

	return getResponse({
		statusCode: 302,
		headers: {
			Location
		},
	});

};
