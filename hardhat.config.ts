import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-chai-matchers";
import "@nomicfoundation/hardhat-verify";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    worldChainSepolia: {
      url: "https://worldchain-sepolia.g.alchemy.com/public",
      chainId: 4801,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
  },
  etherscan: {
    apiKey: {
      worldChainSepolia: "unused", // Placeholder for World Chain Sepolia
    },
    customChains: [
      {
        network: "worldChainSepolia",
        chainId: 4801,
        urls: {
          apiURL: "https://sepolia.worldscan.org/api",
          browserURL: "https://sepolia.worldscan.org",
        },
      },
    ],
  },
};

export default config;
