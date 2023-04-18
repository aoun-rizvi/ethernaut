const { ethers, upgrades } = require("hardhat");
const hre = require("hardhat");

let ACCOUNTS;
let CONTRACT_FACTORY;
const COIN_FLIP_CONTRACT="0x6cCDd0A02560F360CEcd5e84069066D3bB0888b8";
let COIN_FLIP_ATTACK_CONTRACT;

async function main() {
  await getAccounts();

  await CoinFlip();
  console.log("CoinFlipAttack Contract deployed to:", COIN_FLIP_ATTACK_CONTRACT.address);
}

// todo use actual account when deploying to mainnet chain
const getAccounts = async () => {
  return ACCOUNTS = await ethers.getSigners();
};

const CoinFlip = async () => {
  CONTRACT_FACTORY = await ethers.getContractFactory("CoinFlipAttack");
  COIN_FLIP_ATTACK_CONTRACT = await CONTRACT_FACTORY.deploy(COIN_FLIP_CONTRACT);
  await COIN_FLIP_ATTACK_CONTRACT.deployed();
};


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
