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
  const previousBlock = getPreviousBlock();
  const block = generateBlock(previousBlock.index + 1, previousBlock.hash, data);

  blockChain.push(block);
}

function mineBlocks () {
  setInterval(function () { 
    addBlock({ randz: Math.random() });
    console.log(blockChain);
  }, 1000)
}
