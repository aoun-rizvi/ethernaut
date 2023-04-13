require("@nomiclabs/hardhat-waffle");
require('@nomiclabs/hardhat-ethers');
require('@openzeppelin/hardhat-upgrades');
require("@nomiclabs/hardhat-etherscan");
require('hardhat-contract-sizer');
const dotenv = require('dotenv').config();
const dotenvExpand = require('dotenv-expand');

// use interpolation for .env variables
dotenvExpand(dotenv);

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.12",
    settings: {
      optimizer: { enabled: true, runs: 900 }
    }
  },
  mocha: {
    timeout: 100000000,
    // enableTimeouts: false
  },
  // gasReporter: {
  //   enabled: true
  // },
  etherscan: {
    apiKey: {
      goerli: process.env.ETHER_SCAN,
      sepolia: process.env.ETHER_SCAN
    }
  },
  networks: {
    hardhat: {
      chainId: 1337,
      accounts: {
        mnemonic: process.env.MNEMONIC_1
      }
    },
    localGeth: {
      chainId: 1214,
      url: 'http://localhost:8545',
      // accounts: ['0xe836ecb8ed5c68a6e97bd3d7fc86617254fa160b50f5d3a8ce427883c432660d']
      accounts: {
        mnemonic: process.env.MNEMONIC_1
      }
    },
    goerli: {
      url: process.env.GOERLI,
      accounts: [process.env.TEST_PRIVATE_KEY]
    },
    sepolia: {
      url: process.env.SEPOLIA,
      accounts: [process.env.TEST_PRIVATE_KEY]
    }
  }
};
