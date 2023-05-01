const { ethers, upgrades } = require("hardhat");
const hre = require("hardhat");
const dotenv = require('dotenv').config();
const dotenvExpand = require('dotenv-expand');

const TelephoneAttackAbi = require('../../artifacts/contracts/004/TelephoneAttack.sol/TelephoneAttack.json');

// use interpolation for .env variables
dotenvExpand(dotenv);

// const RPC_NODE = 'http://localhost:8545';
const RPC_NODE = process.env.SEPOLIA;
const DEPLOYED_CONTRACT_ADDRESS = '0x7F676f856212aB1e7953e3E73650d30677Db2DEC';
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
  const contract = new ethers.Contract(ethers.utils.getAddress(DEPLOYED_CONTRACT_ADDRESS), TelephoneAttackAbi.abi, provider);
  
  // call attack contract
  await contract.connect(ACCOUNTS[0]).callSecondAttacker(ACCOUNTS[0].address);
  console.log('Action performed on contract:', contract.address);
};


main();
