// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title DutchAuction
 * @dev Dutch auction contract with automated price decay and fee splitting
 */
contract DutchAuction is ReentrancyGuard, Ownable {
    // Events
    event BidPlaced(address indexed bidder, uint256 amount);
    event AuctionFinalized(address indexed winner, uint256 finalPrice);
    event AuctionCancelled(address indexed creator);

    // Auction state
    address public auctionCreator;
    string public itemDescription;
    uint256 public startPrice;
    uint256 public reservePrice;
    uint256 public startTime;
    uint256 public endTime;
    
    // Winner info
    address public winner;
    uint256 public finalPrice;
    
    // State tracking
    bool public isActive;
    bool public isFinalized;

    constructor(
        address _creator,
        string memory _description,
        uint256 _startPrice,
        uint256 _reservePrice,
        uint256 _duration
    ) {
        auctionCreator = _creator;
        itemDescription = _description;
        startPrice = _startPrice;
        reservePrice = _reservePrice;
        startTime = block.timestamp;
        endTime = block.timestamp + _duration;
        isActive = true;
        isFinalized = false;
    }

    /**
     * @dev Calculate current price based on linear decay
     */
    function getCurrentPrice() public view returns (uint256) {
        if (!isActive || block.timestamp > endTime) {
            return reservePrice;
        }

        uint256 elapsed = block.timestamp - startTime;
        uint256 duration = endTime - startTime;
        uint256 priceDrop = startPrice - reservePrice;

        // Linear decay: price decreases linearly from startPrice to reservePrice
        uint256 currentPrice = startPrice - ((priceDrop * elapsed) / duration);
        return currentPrice < reservePrice ? reservePrice : currentPrice;
    }

    /**
     * @dev Place a bid at current auction price
     */
    function bid() external payable nonReentrant {
        require(isActive, "Auction is not active");
        require(block.timestamp <= endTime, "Auction has ended");
        require(winner == address(0), "Auction already has a winner");

        uint256 currentPrice = getCurrentPrice();
        require(msg.value >= currentPrice, "Bid too low");

        winner = msg.sender;
        finalPrice = currentPrice;
        isActive = false;

        emit BidPlaced(msg.sender, currentPrice);
    }

    /**
     * @dev Finalize auction after end time (if no winner placed bid)
     */
    function finalizeAuction() external nonReentrant {
        require(!isFinalized, "Auction already finalized");
        require(block.timestamp > endTime, "Auction still active");

        isActive = false;
        isFinalized = true;

        if (winner != address(0)) {
            emit AuctionFinalized(winner, finalPrice);
        }
    }

    /**
     * @dev Cancel auction and refund bids
     */
    function cancelAuction() external {
        require(msg.sender == auctionCreator, "Only creator can cancel");
        require(!isFinalized, "Cannot cancel finalized auction");

        isActive = false;
        isFinalized = true;

        emit AuctionCancelled(auctionCreator);
    }

    /**
     * @dev Get auction status
     */
    function getAuctionStatus() external view returns (
        bool active,
        bool finalized,
        uint256 currentPrice,
        address currentWinner,
        uint256 timeRemaining
    ) {
        active = isActive;
        finalized = isFinalized;
        currentPrice = getCurrentPrice();
        currentWinner = winner;
        timeRemaining = block.timestamp < endTime ? endTime - block.timestamp : 0;
    }
}
