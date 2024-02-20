require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

const providerApiKey = process.env.REACT_APP_MUMBAI_RPC_KEY || "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF"
const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY || ""
const POLYGON_SCAN_API_KEY = process.env.REACT_APP_POLYGON_SCAN_API_KEY || ""

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      chainId: 31337,
    },
    polygonMumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${providerApiKey}`,
      accounts: [PRIVATE_KEY],
      chainId: 80001,
    },
    scrollSepolia: {
      url: process.env.SCROLL_TESTNET_URL || "",
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: POLYGON_SCAN_API_KEY,
    },
    // customChains: [], // uncomment this line if you are getting a TypeError: customChains is not iterable
  },
};
