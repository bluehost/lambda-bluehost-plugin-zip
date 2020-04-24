const {Lambda} = require('aws-sdk');

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

	return await new Promise((resolve, reject) => {
		const params = {
			FunctionName: 'bluehost-github-release-api',
			Payload: JSON.stringify({queryStringParameters: validPlugins[plugin]}, null, 2)
		};

		lambda.invoke(params, (err, {Payload}) => {
			if (err) {
				reject({
					statusCode: 500,
					body: JSON.stringify(err)
				});
			} else {
				const {body} = JSON.parse(Payload);
				const response = JSON.parse(body);
				const url = response.package || '';
				if (!url) {
					reject({
						statusCode: 500,
						body: 'Unknown error.'
					});
				} else {
					resolve({
						statusCode: 302,
						headers: {
							'Location': url
						},
						body: '',
					});
				}
			}
		});
	});

};
