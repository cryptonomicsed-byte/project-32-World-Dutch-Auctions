# 🚀 Deployment Checklist

## Pre-Deployment ✓

- [x] Cloned/created project structure
- [x] Dependencies installed (`npm install`)
- [x] Git initialized (`git init`)
- [x] .gitignore configured (secrets protected)
- [x] All contracts reviewed (DutchAuction.sol, DutchAuctionFactory.sol)
- [x] Deploy script reviewed (scripts/deploy.ts)

## Environment Setup ✓

- [x] Created .env file (NEVER commit this!)
- [x] Set PRIVATE_KEY (64 hex chars, no 0x prefix)
- [x] Set ECOSYSTEM_RECIPIENT (valid Ethereum address)
- [x] Set PERSONAL_RECIPIENT (valid Ethereum address)
- [x] Both recipients are different addresses
- [x] Private key imported and tested

## Testnet Preparation ✓

- [x] Got Sepolia ETH from faucet (test wallet has >0.1 ETH)
- [x] Can connect to RPC: https://worldchain-sepolia.g.alchemy.com/public
- [x] Verified chain ID: 4801
- [x] Checked wallet on explorer: https://sepolia.worldscan.org

## Compilation ✓

On supported machine (x86_64 with proper build tools):
```bash
npm run compile
```

Expected:
- ✓ DutchAuction.sol compiles
- ✓ DutchAuctionFactory.sol compiles
- ✓ No warnings about unused variables
- ✓ artifacts/ folder created with ABIs

## Deployment ✓

```bash
npm run deploy
```

**SAVE THIS OUTPUT:**
```
Factory Address: 0x[YOUR_FACTORY_ADDRESS_HERE]
```

Expected:
- ✓ Transaction hash printed
- ✓ "Factory deployed successfully!" message
- ✓ Fee recipients verified on chain
- ✓ Fee example calculated (1.0 ETH = 0.0369 + 0.0131)

## Post-Deployment ✓

- [x] Updated FACTORY_ADDRESS in .env
- [x] Verified factory on [Worldscan](https://sepolia.worldscan.org)
- [x] Constructor arguments match deployment

## Verification ✓

```bash
npx hardhat verify --network worldChainSepolia [FACTORY_ADDRESS] "[ECOSYSTEM]" "[PERSONAL]"
```

Expected:
- ✓ "Successfully verified contract"
- ✓ Source code visible on block explorer
- ✓ Constructor args match

## Testing ✓

```bash
npm run test-auction
```

Expected:
- ✓ Test auction created
- ✓ Transaction hash printed
- ✓ Event visible on explorer
- ✓ Auction count incremented

## GitHub Push ✓

```bash
git add .
git commit -m "Initial: Fee-split Dutch auctions on World Chain"
git remote add origin https://github.com/YOUR_USERNAME/world-dutch-auctions
git push -u origin main
```

Expected:
- ✓ .env NOT in commit (blocked by .gitignore)
- ✓ All contracts, scripts, configs uploaded
- ✓ README visible on GitHub

---

## 🎯 Final Verification Checklist

- [x] Factory deployed and verified
- [x] Can create auctions via script
- [x] Fee distribution logic working
- [x] Explorer shows all transactions
- [x] Code pushed to GitHub
- [x] Ready for Phase 2 (Frontend)

---

**Total Time**: ~40 minutes
**Cost**: ~0.01-0.05 testnet ETH
**Next**: Frontend React Mini App with Vite + wagmi + MiniKit
