const { ethers, upgrades } = require("hardhat");
const hre = require("hardhat");

let ACCOUNTS;
let CONTRACT_FACTORY;
const TELEPHONE_CONTRACT="0x22b1F8daF1BbE764a9495961bbb2B1389E4C9D41";
let TELEPHONE_ATTACK_CONTRACT; // 0x7F676f856212aB1e7953e3E73650d30677Db2DEC
let TELEPHONE_ATTACK2_CONTRACT; // 0x88238AC72dcdc1bBBc4A6Bc3e78aC87624576f38

async function main() {
  await getAccounts();

  await TelephoneAttack2();
  console.log("TelephoneAttack2 Contract deployed to:", TELEPHONE_ATTACK2_CONTRACT.address);

  await TelephoneAttack();
  console.log("TelephoneAttack Contract deployed to:", TELEPHONE_ATTACK_CONTRACT.address);
}

// todo use actual account when deploying to mainnet chain
const getAccounts = async () => {
  return ACCOUNTS = await ethers.getSigners();
};

const TelephoneAttack2 = async () => {
  CONTRACT_FACTORY = await ethers.getContractFactory("TelephoneAttack2");
  TELEPHONE_ATTACK2_CONTRACT = await CONTRACT_FACTORY.deploy(TELEPHONE_CONTRACT);
  await TELEPHONE_ATTACK2_CONTRACT.deployed();
};

const TelephoneAttack = async () => {
  CONTRACT_FACTORY = await ethers.getContractFactory("TelephoneAttack");
  TELEPHONE_ATTACK_CONTRACT = await CONTRACT_FACTORY.deploy(TELEPHONE_ATTACK2_CONTRACT.address);
  await TELEPHONE_ATTACK_CONTRACT.deployed();
};


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
