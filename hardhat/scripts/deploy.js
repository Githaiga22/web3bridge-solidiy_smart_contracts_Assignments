const { ethers } = require("hardhat");

async function main() {
  const Storage = await ethers.getContractFactory("Storage");
  const storage = await Storage.deploy(); // deploys contract
  await storage.waitForDeployment(); // wait until it's actually deployed

  console.log(`Storage deployed to: ${await storage.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
