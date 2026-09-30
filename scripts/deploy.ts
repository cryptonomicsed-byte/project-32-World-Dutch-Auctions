import { ethers } from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  console.log("🚀 Deploying Dutch Auction Factory to World Chain Sepolia...");

  // Get deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deployer address:", deployer.address);

  // Get recipient addresses from environment
  const ecosystemRecipient =
    process.env.ECOSYSTEM_RECIPIENT || "0x0000000000000000000000000000000000000000";
  const personalRecipient =
    process.env.PERSONAL_RECIPIENT || "0x0000000000000000000000000000000000000000";

  if (ecosystemRecipient === "0x0000000000000000000000000000000000000000") {
    console.warn("⚠️  WARNING: Using placeholder ecosystem recipient!");
    console.warn("   Please set ECOSYSTEM_RECIPIENT in .env");
  }

  if (personalRecipient === "0x0000000000000000000000000000000000000000") {
    console.warn("⚠️  WARNING: Using placeholder personal recipient!");
    console.warn("   Please set PERSONAL_RECIPIENT in .env");
  }

  console.log("\nConfiguration:");
  console.log("  Ecosystem Recipient:", ecosystemRecipient);
  console.log("  Personal Recipient:", personalRecipient);
  console.log("  Ecosystem Fee: 3.69%");
  console.log("  Personal Fee: 1.31%");
  console.log("  Total Fee: 5%");

  // Deploy factory
  const DutchAuctionFactory = await ethers.getContractFactory(
    "DutchAuctionFactory"
  );
  const factory = await DutchAuctionFactory.deploy(
    ecosystemRecipient,
    personalRecipient
  );

  await factory.waitForDeployment();
  const factoryAddress = await factory.getAddress();

  console.log("\n✅ Factory deployed successfully!");
  console.log("   Factory Address:", factoryAddress);

  // Log configuration
  const eco = await factory.ecosystemRecipient();
  const personal = await factory.personalRecipient();

  console.log("\n📋 Verified Configuration:");
  console.log("   Ecosystem Recipient:", eco);
  console.log("   Personal Recipient:", personal);

  // Calculate fee example
  const testAmount = ethers.parseEther("1.0");
  const fees = await factory.calculateFees(testAmount);

  console.log("\n💰 Fee Example (for 1.0 ETH):");
  console.log(
    "   Ecosystem Fee (3.69%):",
    ethers.formatEther(fees.ecosystemFee)
  );
  console.log(
    "   Personal Fee (1.31%):",
    ethers.formatEther(fees.personalFee)
  );

  console.log("\n🎯 NEXT STEPS:");
  console.log("1. Save this address:", factoryAddress);
  console.log('2. Update FACTORY_ADDRESS in .env');
  console.log("3. Verify: npx hardhat verify --network worldChainSepolia");
  console.log("4. Test: npm run test-auction");

  return factoryAddress;
}

main().catch(console.error);
