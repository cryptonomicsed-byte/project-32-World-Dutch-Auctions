# World Dutch Auctions Frontend

React + Vite frontend for the World Dutch Auctions smart contracts on World Chain Sepolia.

## Features

- 🎯 View live Dutch auctions with real-time price decay
- ➕ Create new auctions with custom parameters
- 💰 Place bids at current market price
- 🔐 Wallet integration via wagmi
- 🌍 World ID verification support (via MiniKit)
- 📊 Real-time price tracking and countdown timers
- 🎨 Dark-themed modern UI with Glassmorphism

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and add your factory address:

```bash
cp .env.example .env
```

Update `.env`:
```
VITE_FACTORY_ADDRESS=0x...
```

### 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
npm run preview
```

## Smart Contract Integration

### Contracts

- **DutchAuctionFactory**: Main contract for creating auctions and distributing fees
- **DutchAuction**: Individual auction contracts with linear price decay

### Key Functions

#### Factory (Read)
- `getAuctionCount()` - Total number of auctions
- `getAuctionAt(index)` - Get auction address by index
- `calculateFees(amount)` - Calculate ecosystem + personal fees

#### Auction (Read)
- `getCurrentPrice()` - Current auction price
- `getAuctionStatus()` - Active status, winner, time remaining

#### Auction (Write)
- `bid()` - Place a bid (payable)
- `finalizeAuction()` - End auction if time expired
- `cancelAuction()` - Creator can cancel

## Component Structure

```
src/
├── components/
│   ├── Header.tsx              # Navigation & wallet connection
│   ├── AuctionCard.tsx         # Individual auction display
│   ├── CreateAuctionModal.tsx  # Create auction form
│   └── BidModal.tsx            # Place bid form
├── hooks/
│   └── useAuction.ts           # Fetch auction data
├── config/
│   └── contracts.ts            # Contract ABIs & addresses
├── App.tsx                     # Main app component
└── main.tsx                    # Entry point
```

## Key Features

### Real-Time Price Decay

Dutch auctions decay linearly from start price to reserve price:

```
Current Price = Start - ((Price Drop * Elapsed Time) / Duration)
```

The UI updates every 5 seconds to show the current price and countdown.

### Fee Distribution

Every auction has a 5% fee split:
- **3.69%** → Ecosystem Treasury
- **1.31%** → Personal Recipient

### Wallet Integration

Uses `wagmi` for:
- Multi-chain support
- Wallet connection/disconnection
- Contract reads/writes
- Account management

### World ID Integration

MiniKit support for:
- Verification for auction participation
- Proof of humanness
- Configure signal-based verification

## Network Details

**World Chain Sepolia (Testnet)**

- Chain ID: 4801
- RPC: https://worldchain-sepolia.g.alchemy.com/public
- Explorer: https://sepolia.worldscan.org

Get testnet ETH from:
- [Alchemy Faucet](https://www.alchemy.com/faucets/world-chain-sepolia)
- [ETHGlobal Faucet](https://ethglobal.com/faucet/world-chain-sepolia-4801)

## Development Roadmap

- ✅ Core auction listing & bidding UI
- ✅ Real-time price updates
- ✅ Wallet integration
- 🚧 Smart contract write functions
- 📋 World ID verification
- 📊 User dashboard / auction history
- 🎨 Analytics & bid tracking
- 📱 Mobile responsiveness improvements

## Troubleshooting

### Wallet not connecting
- Check you're on World Chain Sepolia (4801)
- Ensure you have testnet ETH for gas fees
- Try clearing browser cache

### Auctions not loading
- Verify FACTORY_ADDRESS in .env
- Check network connection
- Inspect browser console for errors

### Bid transaction fails
- Ensure you have enough ETH for bid + gas
- Bid must be >= current price
- Auction must still be active

## License

MIT
