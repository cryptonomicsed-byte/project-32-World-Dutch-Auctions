import React, { useState, useEffect } from 'react'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Header } from './components/Header'
import { AuctionCard } from './components/AuctionCard'
import { CreateAuctionModal } from './components/CreateAuctionModal'
import { BidModal } from './components/BidModal'
import { WORLD_CHAIN_SEPOLIA, FACTORY_ADDRESS, FACTORY_ABI, AUCTION_ABI } from './config/contracts'
import { initMiniKit } from './minikit-init'
import './App.css'

const wagmiConfig = createConfig({
  chains: [WORLD_CHAIN_SEPOLIA],
  transports: {
    [WORLD_CHAIN_SEPOLIA.id]: http(),
  },
})

const queryClient = new QueryClient()

interface AuctionInfo {
  address: string
  description: string
  startPrice: bigint
  reservePrice: bigint
  currentPrice: bigint
  active: boolean
  finalized: boolean
  winner: string
  timeRemaining: bigint
  creator: string
}

function AppContent() {
  const [auctions, setAuctions] = useState<AuctionInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showBidModal, setShowBidModal] = useState(false)
  const [selectedAuction, setSelectedAuction] = useState<AuctionInfo | null>(null)

  useEffect(() => {
    initMiniKit()
  }, [])

  const fetchAuctions = async () => {
    try {
      setLoading(true)
      setError(null)

      // TODO: Fetch auctions from factory contract
      // For now, show mock data or empty state
      setAuctions([])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch auctions')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAuctions()
    const interval = setInterval(fetchAuctions, 10000) // Refresh every 10 seconds
    return () => clearInterval(interval)
  }, [])

  const handleCreateAuction = () => {
    setShowCreateModal(true)
  }

  const handleBidClick = (auctionAddress: string) => {
    const auction = auctions.find(a => a.address === auctionAddress)
    if (auction) {
      setSelectedAuction(auction)
      setShowBidModal(true)
    }
  }

  const handleCreateSuccess = () => {
    fetchAuctions()
  }

  const handleBidSuccess = () => {
    fetchAuctions()
  }

  return (
    <div className="app">
      <Header onCreateClick={handleCreateAuction} />

      <main className="main-content">
        <div className="container">
          {error && <div className="error-banner">{error}</div>}

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading auctions...</p>
            </div>
          ) : auctions.length === 0 ? (
            <div className="empty-state">
              <h2>📭 No auctions yet</h2>
              <p>Be the first to create an auction!</p>
              <button className="btn-primary" onClick={handleCreateAuction}>
                Create First Auction
              </button>
            </div>
          ) : (
            <div className="auctions-grid">
              {auctions.map(auction => (
                <AuctionCard
                  key={auction.address}
                  address={auction.address}
                  description={auction.description}
                  startPrice={auction.startPrice}
                  reservePrice={auction.reservePrice}
                  currentPrice={auction.currentPrice}
                  active={auction.active}
                  finalized={auction.finalized}
                  winner={auction.winner}
                  timeRemaining={auction.timeRemaining}
                  creator={auction.creator}
                  onBid={handleBidClick}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <CreateAuctionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={handleCreateSuccess}
      />

      {selectedAuction && (
        <BidModal
          isOpen={showBidModal}
          auctionAddress={selectedAuction.address}
          currentPrice={selectedAuction.currentPrice}
          onClose={() => {
            setShowBidModal(false)
            setSelectedAuction(null)
          }}
          onSuccess={handleBidSuccess}
        />
      )}
    </div>
  )
}

export default function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </WagmiProvider>
  )
}
