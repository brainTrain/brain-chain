var crypto = require('crypto');

function generateHash (index, previousHash, data, nonce) {
  return crypto
    .createHash('sha256')
    .update(`${index}${previousHash}${JSON.stringify(data)}${nonce}`)
    .digest('hex');
}

function generateBlock (index, previousHash, data, hash, nonce) {
  return {
    index,
    data,
    previousHash,
    hash,
    nonce,
  };
}

function mineBlock (difficulty, index, previousHash, data, callback) {
  let nonce = 0;
  let hash = generateHash(index, previousHash, data, nonce)

  // if the hash doesn't meet the constraint of number of leading zeros, keep looping
  while (hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
    nonce ++;
    hash = generateHash(index, previousHash, data, nonce);
  }

  const block = generateBlock(index, previousHash, data, hash, nonce);
  callback(block);
}

module.exports = {
  generateHash,
  generateBlock,
  mineBlock,
};
