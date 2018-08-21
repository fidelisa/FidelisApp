var 
  Promise = require('bluebird'), 
  fs = require('fs'),
  path = require('path'), 
  _ = require('underscore');

var writeFile = Promise.promisify(fs.writeFile);
var readFile = Promise.promisify(fs.readFile);

var data = require(path.join(process.cwd(),'params.json'));

return readFile(path.join(process.cwd(), 'templates', 'Const.js'), 'utf8')
  .then(data => {
    return _.template(data);
  })
  .then(compiled => {
    return writeFile(path.join(process.cwd(), 'src', 'Stores', 'Const.js'), compiled(data), 'utf8');
  })
  .catch(error => {
    logger.log('error', name + ': Error => ' + error);
    throw error;
  });