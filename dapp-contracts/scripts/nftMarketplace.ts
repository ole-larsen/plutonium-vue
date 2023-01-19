import { ethers } from "hardhat";
import fs from "fs";
import path from "path";

async function main() {
  const [deployer] = await ethers.getSigners();

  // @ts-ignore
  const networkData = await deployer.provider.getNetwork();
  const chainId = networkData.chainId;
  console.log("Chain ID:", chainId);

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  await (async () => {
    const contractName = "NFTMarketplace";
    const feePercent = 1;
    const Contract = await ethers.getContractFactory(contractName);
    const contract = await Contract.deploy("Plutonium", feePercent);

    await contract.deployed();

    console.log(`${contractName} deployed to ${contract.address} by ${await contract.signer.getAddress()}`);

    const addresses = path.join(__dirname, "../addresses/addresses.json")

    // check if addresses.json already exists
    const exists = fs.existsSync(addresses);

    // if not, created the file
    if (!exists) {
      fs.writeFileSync(
        addresses,
        "{}"
      );
    }

    // update the addresses.json file with the new contract address
    const addressesFile = fs.readFileSync(addresses);
    // @ts-ignore
    const addressesJson = JSON.parse(addressesFile);

    if (!addressesJson[contractName]) {
      addressesJson[contractName] = {};
    }

    addressesJson[contractName][chainId] = contract.address;

    fs.writeFileSync(
      addresses,
      JSON.stringify(addressesJson)
    );
  })();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
