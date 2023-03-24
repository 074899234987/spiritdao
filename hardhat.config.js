require("@nomicfoundation/hardhat-toolbox");
require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-etherscan");
require("hardhat-contract-sizer")

// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key
// Replace this private key with your Goerli account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
// const GOERLI_PRIVATE_KEY = "YOUR GOERLI PRIVATE KEY";
const PRIVATE_KEY = "XXX"

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  // contractSizer: {
  //   alphaSort: true,
  //   runOnCompile: true,
  //   disambiguatePaths: false,
  //   strict: false
  // },
  solidity: {
    compilers: [
      {
        version: "0.4.15",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          }
        },
      },
      {
        version: "0.4.18",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          }
        },
      },
      {
        version: "0.5.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          }
        },
      },
      {
        version: "0.5.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          }
        },
      },
      {
        version: "0.7.5",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          }
        },
      },
      {
        version: "0.6.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          }
        },
      },
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          }
        },
      },
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          }
        },
      },
      {
        version: "0.8.1",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          }
        },
      },
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          }
        },
      },
      {
        version: "0.8.10",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          }
        },
      },
    ],
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      }
    }
  },
  etherscan: {
    apiKey: {
      bscTestnet: "M9C3JEZEGJRU7ATYPMG8K7SB2N3F4NKFCI",
      arbitrumGoerli: "V7PFFHVF8KJWS4UAQDTMTCF25TIAFJICRT",
      sepolia: "7J28DGVSE75W33541IY8CHKVF421FSA89Y"
    }
  },
  networks: {
    bsc_testnet: {
      url: `https://data-seed-prebsc-1-s1.binance.org:8545`,
      accounts: [PRIVATE_KEY],
    },
    arbitrumGoerli: {
      url: ``,
      accounts: [PRIVATE_KEY],
    },
    sepolia: {
      url: `https://rpc2.sepolia.org`,
      accounts: [PRIVATE_KEY],
    },
  },
};