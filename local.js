var {handler} = require('./index');

handler({
    pathParameters: {
        plugin: 'bluehost-wordpress-plugin'
    }
})
  .then(response => console.log(response))
  .catch(error => console.error(error));
