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

function getIsValidHash (hash, difficulty) {
  return hash.substring(0, difficulty) === Array(difficulty + 1).join('0');
}

function mineBlock (difficulty, index, previousHash, data, callback) {
  let nonce = 0;
  let hash = generateHash(index, previousHash, data, nonce)

  // if the hash doesn't meet the constraint of number of leading zeros, keep looping
  while (!getIsValidHash(hash, difficulty)) {
    nonce ++;
    hash = generateHash(index, previousHash, data, nonce);
  }

  const block = generateBlock(index, previousHash, data, hash, nonce);
  callback(block);
}

module.exports = {
  mineBlock,
  generateHash,
  getIsValidHash,
};
