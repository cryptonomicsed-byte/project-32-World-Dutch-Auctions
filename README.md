# World Dutch Auctions

Dutch auction platform on World Chain (Sepolia) with automated fee splitting.

## Architecture

- **DutchAuction.sol**: Individual auction contracts with linear price decay
- **DutchAuctionFactory.sol**: Factory managing auctions and fee distribution
- **Fee Structure**: 5% total (3.69% ecosystem ♾️ / 1.31% personal)

## Quick Start

### 1. Setup

```bash
npm install
```

### 2. Configuration

Create `.env`:
```
PRIVATE_KEY=your_64_hex_chars_no_0x
ECOSYSTEM_RECIPIENT=0xYourTreasuryOrMultisigHere
PERSONAL_RECIPIENT=0xYourPersonalWalletHere
```

### 3. Compile

```bash
npm run compile
```

### 4. Deploy

Get testnet ETH from [Alchemy](https://www.alchemy.com/faucets/world-chain-sepolia) or [ETHGlobal](https://ethglobal.com/faucet/world-chain-sepolia-4801).

```bash
npm run deploy
```

Save the factory address and update `.env`:
```
FACTORY_ADDRESS=0xYourFactoryAddressHere
```

### 5. Test

```bash
npm run test-auction
```

## Network Details

- **Name**: World Chain Sepolia
- **Chain ID**: 4801
- **RPC**: https://worldchain-sepolia.g.alchemy.com/public
- **Explorer**: https://sepolia.worldscan.org
- **Faucets**: Alchemy, ETHGlobal, L2Faucet

## Roadmap

### Phase 1: Testnet ✅
- Dutch auction smart contracts
- Factory with fee splitting
- Deployment scripts

### Phase 2: Frontend (Coming)
- React Mini App with Vite
- Wallet integration (wagmi)
- World ID verification (MiniKit)

### Phase 3: Mainnet (Coming)
- Mainnet deployment
- Security audit
- Multisig treasury

### Phase 4: Growth (Coming)
- NFT auction support
- Analytics dashboard
- Prize pool mechanics

## Resources

- [Mini Apps Docs](https://docs.world.org/mini-apps)
- [World Chain Docs](https://docs.world.org/)
- [Developer Portal](https://developer.worldcoin.org)

## Security

- ✅ Reentrancy protection (OpenZeppelin)
- ✅ Verified fee distribution
- ✅ Public state tracking
- ⚠️ Not yet audited - use testnet only

## License

MIT
