var crypto = require('crypto');

function generateHash (index, datetime, previousHash, data) {
  return crypto
    .createHash('sha256')
    .update(`${index}${datetime}${previousHash}${JSON.stringify(data)}`)
    .digest('hex');
}

function generateBlock (index, previousHash, data) {
  const datetime = Date.now();

  return block = {
    index,
    datetime,
    data,
    previousHash,
    hash: generateHash(index, datetime, previousHash, data),
  };
}

module.exports = {
  generateHash,
  generateBlock
};
