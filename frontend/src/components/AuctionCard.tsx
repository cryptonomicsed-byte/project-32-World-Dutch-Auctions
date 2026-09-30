import React, { useEffect, useState } from 'react'
import { formatEther } from 'viem'
import './AuctionCard.css'

interface AuctionCardProps {
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
  onBid?: (auctionAddress: string) => void
}

export function AuctionCard({
  address,
  description,
  startPrice,
  reservePrice,
  currentPrice,
  active,
  finalized,
  winner,
  timeRemaining,
  creator,
  onBid,
}: AuctionCardProps) {
  const [formattedTime, setFormattedTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const remaining = Number(timeRemaining)
      if (remaining <= 0) {
        setFormattedTime('Ended')
      } else {
        const hours = Math.floor(remaining / 3600)
        const minutes = Math.floor((remaining % 3600) / 60)
        const seconds = remaining % 60
        setFormattedTime(`${hours}h ${minutes}m ${seconds}s`)
      }
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [timeRemaining])

  const priceDecay = (
    ((Number(startPrice) - Number(currentPrice)) / Number(startPrice)) *
    100
  ).toFixed(1)

  return (
    <div className="auction-card">
      <div className="auction-header">
        <h3>{description}</h3>
        <span className={`status ${active ? 'active' : 'ended'}`}>
          {active ? '🔴 Live' : finalized ? '✅ Finalized' : '⏸️ Ended'}
        </span>
      </div>

      <div className="auction-details">
        <div className="detail-row">
          <span>Current Price</span>
          <strong>{formatEther(currentPrice)} Ξ</strong>
        </div>
        <div className="detail-row">
          <span>Start Price</span>
          <span>{formatEther(startPrice)} Ξ</span>
        </div>
        <div className="detail-row">
          <span>Reserve Price</span>
          <span>{formatEther(reservePrice)} Ξ</span>
        </div>
        <div className="detail-row">
          <span>Price Decay</span>
          <span>{priceDecay}% ↓</span>
        </div>
      </div>

      <div className="auction-time">
        <div>⏱️ {formattedTime}</div>
        {winner !== '0x0000000000000000000000000000000000000000' && (
          <div className="winner">🏆 Winner: {winner.slice(0, 6)}...{winner.slice(-4)}</div>
        )}
      </div>

      <div className="auction-address">
        <small>{address.slice(0, 10)}...{address.slice(-8)}</small>
      </div>

      <button
        className="bid-button"
        onClick={() => onBid?.(address)}
        disabled={!active}
      >
        {active ? 'Place Bid' : 'View Details'}
      </button>
    </div>
  )
}
