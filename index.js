var { mineBlock, generateHash, getIsValidHash } = require('./block');
const DIFFICULTY = 5;
const DIFFICULTY_STRING = Array(DIFFICULTY + 1).join('0');

// generate chain and prime it with first block
const genisisBlock = {
  index: 0,
  previousHash: `${DIFFICULTY_STRING}trololol`,
  data: {randz: 0},
  hash: `${DIFFICULTY_STRING}lolololol`,
  nonce: 0,
};
const blockChain = [genisisBlock];

// start fakin mining
mineBlocks();

function nextIndex () {
  const { index } = getPreviousBlock();
  return index + 1;
}

function getPreviousBlock () {
  return blockChain[blockChain.length - 1] || {};
}

function getHasPreviousHash (previousIndex, previousHash) {
  const { hash } = blockChain[previousIndex] || {};
  return hash === previousHash;
}

function getIsValidData ({ hash, index, previousHash, data, nonce }) {
  const testHash = generateHash(index, previousHash, data, nonce, true);
  return testHash === hash;
}

function getIsValidBlock (block) {
  const isValidHash = getIsValidHash(block.hash, DIFFICULTY);
  const hasPreviousHash = getHasPreviousHash(block.index - 1, block.previousHash);
  const isValidData = getIsValidData(block);

  return isValidHash && hasPreviousHash && isValidData;
}

function addBlock (block) {
  // only save if hash is valid
  if (getIsValidBlock(block)) {
    blockChain.push({
      ...block,
      datetime_saved: Date.now(),
    });
  } else {
    console.error('this hash wasn\'t valid', block.hash);
  }
  console.log(blockChain);
  // kick off new mining operation once we add a new block
  mineBlocks();
}

function mineBlocks () {
  const { hash: previousHash } = getPreviousBlock();
  const data = { randz: Math.random() };
  mineBlock(DIFFICULTY, nextIndex(), previousHash, data, addBlock)
}
