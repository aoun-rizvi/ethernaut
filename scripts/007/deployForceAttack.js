const { ethers, upgrades } = require("hardhat");
const hre = require("hardhat");

let ACCOUNTS;
let CONTRACT_FACTORY;
const TARGET_CONTRACT_ADDRESS="0x0D84526fd3C3B00BEe320Bf349AF7D4A8abf29Dd";
let ATTACK_CONTRACT;

async function main() {
  await getAccounts();

  await deploy();
  console.log("Attack Contract deployed to:", ATTACK_CONTRACT.address);
}

// todo use actual account when deploying to mainnet chain
const getAccounts = async () => {
  return ACCOUNTS = await ethers.getSigners();
};

const deploy = async () => {
  CONTRACT_FACTORY = await ethers.getContractFactory("ForceAttack");
  ATTACK_CONTRACT = await CONTRACT_FACTORY.deploy(TARGET_CONTRACT_ADDRESS);
  await ATTACK_CONTRACT.deployed();
};


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
