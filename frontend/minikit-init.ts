import { MiniKit } from "@worldcoin/minikit-js";

/**
 * Initialize MiniKit for World ID verification
 * Call this on app load
 */
export function initMiniKit() {
  // Check if in World App
  if (MiniKit.isInstalled()) {
    console.log("Running in World App - World ID ready");
    return true;
  }

  // Fallback for development
  console.log("Not in World App - World ID unavailable");
  return false;
}

/**
 * Example verification for auction entry/bid
 */
export async function verifyForAuctionEntry(): Promise<boolean> {
  if (!MiniKit.isInstalled()) {
    console.log("World App not detected");
    return false;
  }

  try {
    const response = await MiniKit.commands.verify({
      action: "dutch-auction-entry",
      signal: "", // Optional unique signal
    });

    if (response.success) {
      console.log("User verified human - allow bid/create");
      return true;
    }

    console.log("Verification failed:", response);
    return false;
  } catch (error) {
    console.error("Verification error:", error);
    return false;
  }
}

/**
 * Example usage in React component:
 * 
 * import { verifyForAuctionEntry } from './minikit-init';
 * 
 * export function AuctionEntry() {
 *   const handleBid = async () => {
 *     const verified = await verifyForAuctionEntry();
 *     if (verified) {
 *       // Proceed with bid
 *     }
 *   };
 *   
 *   return <button onClick={handleBid}>Place Bid</button>;
 * }
 */
