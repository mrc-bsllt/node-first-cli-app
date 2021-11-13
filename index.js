const yargs = require('yargs');
const get = require('./commands/get.js');
const add = require('./commands/add.js');
const del = require('./commands/delete.js');

get(yargs);
add(yargs);
del(yargs);

yargs.parse();