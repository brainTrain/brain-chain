var { generateBlock, mineBlock } = require('./block');
const DIFFICULTY = 10;

// generate chain and prime it with first block
const blockChain = [generateBlock(0, 'trololol', { randz: 0 }, 'lolololol', 0)];
console.log(blockChain);
// start fake block mining
mineBlocks();

function nextIndex () {
  const { index } = getPreviousBlock();
  return index + 1;
}

function getPreviousBlock () {
  return blockChain[blockChain.length - 1];
}

function addBlock (block) {
  blockChain.push(block);
  console.log(blockChain);
}

function mineBlocks () {
  setInterval(function () { 
    const { hash: previousHash } = getPreviousBlock();
    const data = { randz: Math.random() };
    mineBlock(DIFFICULTY, nextIndex(), previousHash, data, addBlock)
  }, 1000)
}
