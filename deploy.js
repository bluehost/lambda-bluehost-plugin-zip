const {execSync} = require('child_process');
const fs = require('fs');
const path = require('path');

const lambda = path.basename(__dirname).replace('lambda-', '');

if (fs.existsSync(`./${lambda}.zip`)) {
	fs.unlinkSync(`${lambda}.zip`);
}

execSync(`zip ${lambda}.zip index.js`);
execSync(`aws lambda update-function-code --function-name ${lambda} --zip-file fileb://${lambda}.zip --region=us-west-2 --profile bluehost`);
