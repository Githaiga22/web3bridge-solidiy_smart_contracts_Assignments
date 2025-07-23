require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    celo: {
      url: process.env.CELO_ALFAJORES_RPC,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      celo: process.env.CELOSCAN_API_KEY,
    },
    customChains: [
      {
        network: "celo",
        chainId: 44787,
        urls: {
          apiURL: "https://alfajores.celoscan.io/api",
          browserURL: "https://alfajores.celoscan.io",
        },
      },
    ],
  },
};
