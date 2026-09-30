import React from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import './Header.css'

interface HeaderProps {
  onCreateClick?: () => void
}

export function Header({ onCreateClick }: HeaderProps) {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>🌍 World Dutch Auctions</h1>
          <span className="subtitle">On Sepolia Testnet</span>
        </div>

        <div className="header-actions">
          <button className="btn-create" onClick={onCreateClick}>
            ➕ Create Auction
          </button>

          {isConnected ? (
            <div className="wallet-info">
              <span className="wallet-address">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
              <button className="btn-disconnect" onClick={() => disconnect()}>
                Disconnect
              </button>
            </div>
          ) : (
            <div className="wallet-connect">
              {connectors.map(connector => (
                <button
                  key={connector.id}
                  onClick={() => connect({ connector })}
                  className="btn-connect"
                >
                  Connect Wallet
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
