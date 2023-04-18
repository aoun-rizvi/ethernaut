const { ethers, upgrades } = require("hardhat");
const hre = require("hardhat");
// const ethers = require('ethers').ethers;
const dotenv = require('dotenv').config();
const dotenvExpand = require('dotenv-expand');

const CoinFlipAbi = require('../../artifacts/contracts/003/CoinFlip.sol/CoinFlip.json');
const CoinFlipAttackAbi = require('../../artifacts/contracts/003/CoinFlipAttack.sol/CoinFlipAttack.json');

// use interpolation for .env variables
dotenvExpand(dotenv);

// const RPC_NODE = 'http://localhost:8545';
const RPC_NODE = process.env.SEPOLIA;
const DEPLOYED_CONTRACT_ADDRESS = '0xd1F877628487968Fc64798876d619e60f2798C4B';
const EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000';
const WALLET_ADDRESS = '0xdA121aB48c7675E4F25E28636e3Efe602e49eec6';
let ACCOUNTS;

const getAccounts = async () => {
  return ACCOUNTS = await ethers.getSigners();
};

const main = async () => {
  await getAccounts();
  if (!RPC_NODE) { console.log('skipping blockchain check'); return true; }

  const provider = new ethers.providers.JsonRpcProvider(RPC_NODE);
  const contract = new ethers.Contract(ethers.utils.getAddress(DEPLOYED_CONTRACT_ADDRESS), CoinFlipAttackAbi.abi, provider);
  
  // flip coin
  await contract.connect(ACCOUNTS[0]).flip();
  console.log('Action performed on contract:', contract.address);
};


main();
