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

function mineBlock (difficulty, index, previousHash, data, callback, nonce = 0) {
  let hash = generateHash(index, previousHash, data, nonce)
  // use simple recursion for the looping, since this is the functional version
  if (hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
    mineBlock(difficulty, index, previousHash, data, callback, nonce + 1)   
  } else {
    const block = generateBlock(index, previousHash, data, hash, nonce);
    callback(block);
  }
}

module.exports = {
  generateHash,
  generateBlock,
  mineBlock,
};
