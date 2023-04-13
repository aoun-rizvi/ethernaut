const { ethers, upgrades } = require("hardhat");
const hre = require("hardhat");

let ACCOUNTS;
let CONTRACT_FACTORY;
let SAMPLE_NFT_CONTRACT;
let TEST_NFT_CONTRACTS;

async function main() {
  await getAccounts();

  await SampleErc721();
  console.log("Sample NFT Contract deployed to:", SAMPLE_NFT_CONTRACT.address);
  // await TestErc721();
}

// todo use actual account when deploying to mainnet chain
const getAccounts = async () => {
  return ACCOUNTS = await ethers.getSigners();
};

const SampleErc721 = async () => {
  CONTRACT_FACTORY = await ethers.getContractFactory("SampleErc721");
  SAMPLE_NFT_CONTRACT = await CONTRACT_FACTORY.deploy();
  await SAMPLE_NFT_CONTRACT.deployed();
};

const TestErc721 = async () => {
  for (let i = 0; i < 9; i++) {
    CONTRACT_FACTORY = await ethers.getContractFactory("TestErc721");
    TEST_NFT_CONTRACTS = await CONTRACT_FACTORY.deploy(`TestErc721 - ${i}`, `Test${i}`);
    await TEST_NFT_CONTRACTS.deployed();
    console.log(`Test NFT Contract ${i} deployed to:`, TEST_NFT_CONTRACTS.address);
  }
};


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
