// Contract ABIs and addresses
// Update FACTORY_ADDRESS with your deployed address from .env

export const FACTORY_ADDRESS = process.env.REACT_APP_FACTORY_ADDRESS || '0x0000000000000000000000000000000000000000'

export const FACTORY_ABI = [
  {
    "name": "createAuction",
    "type": "function",
    "inputs": [
      { "name": "_description", "type": "string" },
      { "name": "_startPrice", "type": "uint256" },
      { "name": "_reservePrice", "type": "uint256" },
      { "name": "_duration", "type": "uint256" }
    ],
    "outputs": [{ "name": "", "type": "address" }],
    "stateMutability": "nonpayable"
  },
  {
    "name": "getAuctionCount",
    "type": "function",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "view"
  },
  {
    "name": "getAuctionAt",
    "type": "function",
    "inputs": [{ "name": "_index", "type": "uint256" }],
    "outputs": [{ "name": "", "type": "address" }],
    "stateMutability": "view"
  },
  {
    "name": "distributeFees",
    "type": "function",
    "inputs": [{ "name": "_auctionAddress", "type": "address" }],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "name": "calculateFees",
    "type": "function",
    "inputs": [{ "name": "_amount", "type": "uint256" }],
    "outputs": [
      { "name": "ecosystemFee", "type": "uint256" },
      { "name": "personalFee", "type": "uint256" }
    ],
    "stateMutability": "pure"
  }
]

export const AUCTION_ABI = [
  {
    "name": "bid",
    "type": "function",
    "inputs": [],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "name": "getCurrentPrice",
    "type": "function",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "view"
  },
  {
    "name": "getAuctionStatus",
    "type": "function",
    "inputs": [],
    "outputs": [
      { "name": "active", "type": "bool" },
      { "name": "finalized", "type": "bool" },
      { "name": "currentPrice", "type": "uint256" },
      { "name": "currentWinner", "type": "address" },
      { "name": "timeRemaining", "type": "uint256" }
    ],
    "stateMutability": "view"
  },
  {
    "name": "finalizeAuction",
    "type": "function",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "cancelAuction",
    "type": "function",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "auctionCreator",
    "type": "function",
    "inputs": [],
    "outputs": [{ "name": "", "type": "address" }],
    "stateMutability": "view"
  },
  {
    "name": "itemDescription",
    "type": "function",
    "inputs": [],
    "outputs": [{ "name": "", "type": "string" }],
    "stateMutability": "view"
  },
  {
    "name": "startPrice",
    "type": "function",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "view"
  },
  {
    "name": "reservePrice",
    "type": "function",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "view"
  },
  {
    "name": "startTime",
    "type": "function",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "view"
  },
  {
    "name": "endTime",
    "type": "function",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "view"
  },
  {
    "name": "winner",
    "type": "function",
    "inputs": [],
    "outputs": [{ "name": "", "type": "address" }],
    "stateMutability": "view"
  }
]

export const WORLD_CHAIN_SEPOLIA = {
  id: 4801,
  name: 'World Chain Sepolia',
  network: 'world-chain-sepolia',
  nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://worldchain-sepolia.g.alchemy.com/public'] },
    public: { http: ['https://worldchain-sepolia.g.alchemy.com/public'] },
  },
  blockExplorers: {
    default: { name: 'Worldscan', url: 'https://sepolia.worldscan.org' },
  },
  testnet: true,
}
