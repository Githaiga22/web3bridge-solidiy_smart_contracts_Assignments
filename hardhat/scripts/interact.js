// scripts/interact.js
const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0xYourContractAddress"; // Replace with actual deployed address
  const Storage = await ethers.getContractFactory("Storage");
  const storage = await Storage.attach(contractAddress);

  // Call store()
  const tx = await storage.store(42);
  await tx.wait();

  // Call retrieve()
  const stored = await storage.retrieve();
  console.log("Stored number is:", stored.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
