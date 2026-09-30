import React, { useState } from 'react'
import { useContractWrite } from 'wagmi'
import { parseEther } from 'viem'
import { FACTORY_ADDRESS, FACTORY_ABI } from '../config/contracts'
import './CreateAuctionModal.css'

interface CreateAuctionModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export function CreateAuctionModal({ isOpen, onClose, onSuccess }: CreateAuctionModalProps) {
  const [formData, setFormData] = useState({
    description: '',
    startPrice: '',
    reservePrice: '',
    duration: '3600', // 1 hour default
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      if (!formData.description) throw new Error('Description required')
      if (!formData.startPrice) throw new Error('Start price required')
      if (!formData.reservePrice) throw new Error('Reserve price required')

      const startPrice = parseEther(formData.startPrice)
      const reservePrice = parseEther(formData.reservePrice)
      const duration = BigInt(formData.duration)

      if (startPrice < reservePrice) {
        throw new Error('Start price must be >= reserve price')
      }

      // TODO: Call factory contract with writeContract
      // For now, just show success
      setTimeout(() => {
        setLoading(false)
        onSuccess?.()
        onClose()
        setFormData({ description: '', startPrice: '', reservePrice: '', duration: '3600' })
      }, 1000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create auction')
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Auction</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Item Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the item being auctioned..."
              rows={3}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start Price (ETH)</label>
              <input
                type="number"
                name="startPrice"
                value={formData.startPrice}
                onChange={handleChange}
                placeholder="1.0"
                step="0.01"
                min="0"
              />
            </div>

            <div className="form-group">
              <label>Reserve Price (ETH)</label>
              <input
                type="number"
                name="reservePrice"
                value={formData.reservePrice}
                onChange={handleChange}
                placeholder="0.5"
                step="0.01"
                min="0"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Duration (seconds)</label>
            <select
              name="duration"
              value={formData.duration}
              onChange={e => setFormData(prev => ({ ...prev, duration: e.target.value }))}
            >
              <option value="3600">1 hour</option>
              <option value="7200">2 hours</option>
              <option value="86400">1 day</option>
              <option value="604800">1 week</option>
            </select>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Creating...' : 'Create Auction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
