const { 
  v4: uuidv4
} = require('uuid');
console.log(uuidv4());

const crypto = require('crypto');
console.log(typeof Math.floor(100000 + Math.random() * 900000).toString());
console.log(crypto.randomBytes(4).toString('hex'));