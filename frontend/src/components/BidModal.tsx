import React, { useState, useEffect } from 'react'
import { formatEther, parseEther } from 'viem'
import { useContractWrite, useAccount } from 'wagmi'
import { AUCTION_ABI } from '../config/contracts'
import './BidModal.css'

interface BidModalProps {
  isOpen: boolean
  auctionAddress?: string
  currentPrice: bigint
  onClose: () => void
  onSuccess?: () => void
}

export function BidModal({ isOpen, auctionAddress, currentPrice, onClose, onSuccess }: BidModalProps) {
  const [bidAmount, setBidAmount] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { address: userAddress } = useAccount()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      if (!bidAmount) throw new Error('Bid amount required')
      if (!auctionAddress) throw new Error('No auction selected')

      const amount = parseEther(bidAmount)
      if (amount < currentPrice) {
        throw new Error(`Bid must be at least ${formatEther(currentPrice)} ETH`)
      }

      // TODO: Call bid function on auction contract
      // For now, just show success
      setTimeout(() => {
        setLoading(false)
        onSuccess?.()
        onClose()
        setBidAmount('')
      }, 1000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to place bid')
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Place Your Bid</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bid-info">
            <div className="info-item">
              <span>Current Price</span>
              <strong>{formatEther(currentPrice)} ETH</strong>
            </div>
            {userAddress && (
              <div className="info-item">
                <span>Your Address</span>
                <code>{userAddress.slice(0, 10)}...{userAddress.slice(-8)}</code>
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Bid Amount (ETH)</label>
            <div className="bid-input-group">
              <input
                type="number"
                value={bidAmount}
                onChange={e => setBidAmount(e.target.value)}
                placeholder={formatEther(currentPrice)}
                step="0.01"
                min={formatEther(currentPrice)}
              />
              <button
                type="button"
                className="max-btn"
                onClick={() => setBidAmount(formatEther(currentPrice))}
              >
                Min
              </button>
            </div>
            <small>Must be at least {formatEther(currentPrice)} ETH</small>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Placing Bid...' : 'Place Bid'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
