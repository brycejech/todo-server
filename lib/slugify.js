'use strict';

module.exports = str => str.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
