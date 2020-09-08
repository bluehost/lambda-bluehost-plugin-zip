/**
 * Get response object.
 *
 * @param {number} statusCode
 * @param {object}headers
 * @param {*} body
 * @param {boolean} isBase64Encoded
 * @returns {{headers: {}, isBase64Encoded: boolean, body: string, statusCode: number}}
 */
function getResponse(
	{
		statusCode = 200,
		headers = {
			'Content-Type': 'application/json',
		},
		body = '',
		isBase64Encoded = false
	}
) {
	return {
		statusCode,
		headers,
		body: body.length? JSON.stringify(body) : '',
		isBase64Encoded,
	}
}

module.exports = {
	getResponse,
}
