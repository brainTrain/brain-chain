var crypto = require('crypto');

function generateHash (index, datetime, previousHash, data) {
  return crypto
    .createHash('sha256')
    .update(index + datetime + previousHash + JSON.stringify(data))
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

function getPreviousBlock () {
  return blockChain[blockChain.length - 1];
}

function addBlock (data) {
  const previousBlock = getPreviousBlock();
  const block = generateBlock(previousBlock.index + 1, previousBlock.hash, data);

  blockChain.push(block);
}

const blockChain = [generateBlock(0, 'trololol', { randz: 0 })];

console.log(blockChain);

setInterval(function () { 
  addBlock({ randz: Math.random() });
  console.log(blockChain);
}, 500)
