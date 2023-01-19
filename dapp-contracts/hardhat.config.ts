import {HardhatUserConfig, task} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("@nomiclabs/hardhat-ethers");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",

  networks: {
    hardhat: {},
    ganache: {
      url: "http://79.132.138.189:8545"
    }
    //goerli: {
    //  url: "https://eth-goerli.alchemyapi.io/v2/" + process..env.ALCHEMY_API_KEY,
    //  accounts: [process..env.ALCHEMY_DEPLOYMENT_KEY]
    //}
  },
  solidity: "0.8.15",
};

export default config;
