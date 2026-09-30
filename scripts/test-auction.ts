import { ethers } from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  console.log("🧪 Testing Dutch Auction on World Chain Sepolia...\n");

  const factoryAddress = process.env.FACTORY_ADDRESS || "YOUR_FACTORY_HERE";

  if (factoryAddress === "YOUR_FACTORY_HERE") {
    console.error("❌ FACTORY_ADDRESS not set in .env");
    console.error("   Run: npm run deploy");
    process.exit(1);
  }

  const [signer] = await ethers.getSigners();
  console.log("Tester address:", signer.address);
  console.log("Factory address:", factoryAddress);

  // Connect to factory
  const factory = await ethers.getContractAt(
    "DutchAuctionFactory",
    factoryAddress
  );

  console.log("\n📊 Creating test auction...");

  // Create auction
  const tx = await factory.createAuction(
    "Comprehensive Test Item - Fee Split Verification",
    ethers.parseEther("0.05"), // Start 0.05 ETH
    ethers.parseEther("0.005"), // Reserve 0.005 ETH
    600 // 10 minutes
  );

  const receipt = await tx.wait();
  console.log("Test auction tx:", tx.hash);

  // Parse event for new auction address (manual check explorer if needed)
  // Check explorer for AuctionCreated event

  const auctions = await factory.getAuctionCount();
  console.log("Total auctions created:", auctions.toString());

  console.log("\n✅ Test complete!");
  console.log("📍 Check explorer for AuctionCreated event");
  console.log("   https://sepolia.worldscan.org/tx/" + tx.hash);
}

main().catch(console.error);
