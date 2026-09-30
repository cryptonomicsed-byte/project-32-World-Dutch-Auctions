# World Dutch Auctions - Complete Setup Guide

## ✅ What's Ready

The complete project structure is initialized and ready with:
- ✅ Smart contracts (DutchAuction.sol, DutchAuctionFactory.sol)
- ✅ Deployment script (scripts/deploy.ts)
- ✅ Testing script (scripts/test-auction.ts)
- ✅ MiniKit integration stub (frontend/minikit-init.ts)
- ✅ Hardhat configuration for World Chain Sepolia
- ✅ TypeScript configuration
- ✅ Dependencies installed
- ✅ Git initialized
- ✅ .env template created

## 🔑 Next Steps

### 1. Add Your Addresses to .env

Edit `.env`:
```bash
PRIVATE_KEY=your_64_hex_character_private_key_no_0x_prefix
ECOSYSTEM_RECIPIENT=0xYourTreasuryOrMultisigWalletAddress
PERSONAL_RECIPIENT=0xYourPersonalWalletAddress
```

**Get Private Key:**
- MetaMask: Account → Three dots → Account details → Export Private Key (remove 0x prefix)
- Or generate: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### 2. Get Testnet ETH (Choose One)

- [Alchemy Faucet](https://www.alchemy.com/faucets/world-chain-sepolia)
- [ETHGlobal Faucet](https://ethglobal.com/faucet/world-chain-sepolia-4801)
- [L2Faucet](https://www.l2faucet.com/world)

### 3. Compile & Deploy

On a machine with x86_64 or compatible build tools:

```bash
npm run compile
npm run deploy
```

**Save the factory address output!** Update .env:
```bash
FACTORY_ADDRESS=0xYourFactoryAddressFromDeployOutput
```

### 4. Verify on Block Explorer

```bash
npx hardhat verify --network worldChainSepolia FACTORY_ADDRESS "ECOSYSTEM_ADDR" "PERSONAL_ADDR"
```

### 5. Test Auction Creation

```bash
npm run test-auction
```

Check [Sepolia Worldscan](https://sepolia.worldscan.org) for transaction.

## 📁 Project Structure

```
world-dutch-auctions/
├── contracts/
│   ├── DutchAuction.sol              # Individual auction contract
│   └── DutchAuctionFactory.sol        # Factory + fee splitting
├── scripts/
│   ├── deploy.ts                      # Deployment script
│   └── test-auction.ts                # Manual testing
├── frontend/
│   └── minikit-init.ts                # World ID verification stub
├── hardhat.config.ts                  # Hardhat configuration
├── tsconfig.json                      # TypeScript config
├── .env                               # Your secrets (never commit!)
├── .env.example                       # Template reference
├── .gitignore                         # Protects .env
└── README.md                          # Quick start
```

## 🔐 Security Reminders

⚠️ **CRITICAL:**
- Never commit .env to git
- Use different wallets for ecosystem vs personal fees
- Test on Sepolia before mainnet
- Keep private key secure

✅ **Verified:**
- OpenZeppelin ReentrancyGuard included
- Fee recipients cannot be zero address
- Auction state tracking prevents double-spends

## 📚 Resources

- [Mini Apps Docs](https://docs.world.org/mini-apps)
- [World Chain Docs](https://docs.world.org/)
- [Developer Portal](https://developer.worldcoin.org)
- [Sepolia Block Explorer](https://sepolia.worldscan.org)

## 🚀 Phase 2: Frontend (Coming Next)

After testnet success:
1. Create React Mini App with Vite
2. Integrate wagmi for wallet connection
3. Add MiniKit for World ID verification
4. Display live auctions and bid interface
5. Show fee distribution transparency

---

**Status**: Ready for compilation and deployment
**Last Updated**: December 10, 2025
