import { useCallback, useEffect, useState } from 'react'
import { usePublicClient, useContractRead } from 'wagmi'
import { AUCTION_ABI } from '../config/contracts'

export interface AuctionData {
  active: boolean
  finalized: boolean
  currentPrice: bigint
  currentWinner: string
  timeRemaining: bigint
  description: string
  startPrice: bigint
  reservePrice: bigint
  startTime: bigint
  endTime: bigint
  creator: string
}

export function useAuction(auctionAddress: string | undefined) {
  const publicClient = usePublicClient()
  const [auction, setAuction] = useState<AuctionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAuctionData = useCallback(async () => {
    if (!auctionAddress || !publicClient) return

    try {
      setLoading(true)
      setError(null)

      const [statusData, description, startPrice, reservePrice, startTime, endTime, creator] = await Promise.all([
        publicClient.readContract({
          address: auctionAddress as `0x${string}`,
          abi: AUCTION_ABI,
          functionName: 'getAuctionStatus',
        }),
        publicClient.readContract({
          address: auctionAddress as `0x${string}`,
          abi: AUCTION_ABI,
          functionName: 'itemDescription',
        }),
        publicClient.readContract({
          address: auctionAddress as `0x${string}`,
          abi: AUCTION_ABI,
          functionName: 'startPrice',
        }),
        publicClient.readContract({
          address: auctionAddress as `0x${string}`,
          abi: AUCTION_ABI,
          functionName: 'reservePrice',
        }),
        publicClient.readContract({
          address: auctionAddress as `0x${string}`,
          abi: AUCTION_ABI,
          functionName: 'startTime',
        }),
        publicClient.readContract({
          address: auctionAddress as `0x${string}`,
          abi: AUCTION_ABI,
          functionName: 'endTime',
        }),
        publicClient.readContract({
          address: auctionAddress as `0x${string}`,
          abi: AUCTION_ABI,
          functionName: 'auctionCreator',
        }),
      ] as const)

      const [active, finalized, currentPrice, currentWinner, timeRemaining] = statusData as [
        boolean,
        boolean,
        bigint,
        string,
        bigint
      ]

      setAuction({
        active,
        finalized,
        currentPrice,
        currentWinner,
        timeRemaining,
        description: description as string,
        startPrice: startPrice as bigint,
        reservePrice: reservePrice as bigint,
        startTime: startTime as bigint,
        endTime: endTime as bigint,
        creator: creator as string,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch auction')
    } finally {
      setLoading(false)
    }
  }, [auctionAddress, publicClient])

  useEffect(() => {
    fetchAuctionData()
    const interval = setInterval(fetchAuctionData, 5000) // Update every 5 seconds
    return () => clearInterval(interval)
  }, [fetchAuctionData])

  return { auction, loading, error, refetch: fetchAuctionData }
}
