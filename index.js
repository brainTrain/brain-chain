var { generateHash, generateBlock } = require('./block');

// generate chain and prime it with first block
const blockChain = [generateBlock(0, 'trololol', { randz: 0 })];
console.log(blockChain);
// start fake block mining
mineBlocks();

function getPreviousBlock () {
  return blockChain[blockChain.length - 1];
}

function addBlock (data) {
  const { index: previousIndex, hash: previousHash } = getPreviousBlock();
  const block = generateBlock(previousIndex + 1, previoushash, data);

  blockChain.push(block);
}

function mineBlocks () {
  setInterval(function () { 
    addBlock({ randz: Math.random() });
    console.log(blockChain);
  }, 1000)
}
