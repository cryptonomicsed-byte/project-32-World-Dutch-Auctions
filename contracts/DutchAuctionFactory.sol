// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./DutchAuction.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title DutchAuctionFactory
 * @dev Factory for creating and managing Dutch auctions with fee distribution
 * Fee split: 3.69% ecosystem + 1.31% personal = 5% total
 */
contract DutchAuctionFactory is Ownable {
    // Events
    event AuctionCreated(
        address indexed auctionAddress,
        address indexed creator,
        string description,
        uint256 startPrice,
        uint256 reservePrice
    );
    event FeeDistributed(
        address indexed auction,
        uint256 ecosystemFee,
        uint256 personalFee
    );

    // Constants for fee distribution
    uint256 public constant ECOSYSTEM_FEE_PERCENT = 369; // 3.69% (in basis points)
    uint256 public constant PERSONAL_FEE_PERCENT = 131;  // 1.31% (in basis points)
    uint256 public constant TOTAL_FEE_PERCENT = 500;     // 5% (in basis points)

    // Recipients
    address public ecosystemRecipient;
    address public personalRecipient;

    // Auction tracking
    address[] public allAuctions;
    mapping(address => address[]) public creatorAuctions;

    constructor(address _ecosystemRecipient, address _personalRecipient) {
        require(_ecosystemRecipient != address(0), "Invalid ecosystem recipient");
        require(_personalRecipient != address(0), "Invalid personal recipient");

        ecosystemRecipient = _ecosystemRecipient;
        personalRecipient = _personalRecipient;
    }

    /**
     * @dev Create a new Dutch auction
     */
    function createAuction(
        string memory _description,
        uint256 _startPrice,
        uint256 _reservePrice,
        uint256 _duration
    ) external returns (address) {
        require(_startPrice >= _reservePrice, "Start price must be >= reserve");
        require(_duration > 0, "Duration must be positive");

        DutchAuction auction = new DutchAuction(
            msg.sender,
            _description,
            _startPrice,
            _reservePrice,
            _duration
        );

        address auctionAddress = address(auction);
        allAuctions.push(auctionAddress);
        creatorAuctions[msg.sender].push(auctionAddress);

        emit AuctionCreated(
            auctionAddress,
            msg.sender,
            _description,
            _startPrice,
            _reservePrice
        );

        return auctionAddress;
    }

    /**
     * @dev Distribute fees from a completed auction
     */
    function distributeFees(address _auctionAddress) external payable {
        require(msg.value > 0, "No fees to distribute");

        uint256 ecosystemFee = (msg.value * ECOSYSTEM_FEE_PERCENT) / 10000;
        uint256 personalFee = (msg.value * PERSONAL_FEE_PERCENT) / 10000;

        // Transfer ecosystem fee
        (bool ecosystemSuccess, ) = payable(ecosystemRecipient).call{
            value: ecosystemFee
        }("");
        require(ecosystemSuccess, "Ecosystem transfer failed");

        // Transfer personal fee
        (bool personalSuccess, ) = payable(personalRecipient).call{
            value: personalFee
        }("");
        require(personalSuccess, "Personal transfer failed");

        // Remaining amount stays in contract or can be retrieved by caller
        uint256 remaining = msg.value - ecosystemFee - personalFee;
        if (remaining > 0) {
            (bool returnSuccess, ) = payable(msg.sender).call{value: remaining}(
                ""
            );
            require(returnSuccess, "Return transfer failed");
        }

        emit FeeDistributed(_auctionAddress, ecosystemFee, personalFee);
    }

    /**
     * @dev Update ecosystem recipient
     */
    function setEcosystemRecipient(address _newRecipient) external onlyOwner {
        require(_newRecipient != address(0), "Invalid recipient");
        ecosystemRecipient = _newRecipient;
    }

    /**
     * @dev Update personal recipient
     */
    function setPersonalRecipient(address _newRecipient) external onlyOwner {
        require(_newRecipient != address(0), "Invalid recipient");
        personalRecipient = _newRecipient;
    }

    /**
     * @dev Get all auctions count
     */
    function getAuctionCount() external view returns (uint256) {
        return allAuctions.length;
    }

    /**
     * @dev Get creator's auctions count
     */
    function getCreatorAuctionCount(address _creator)
        external
        view
        returns (uint256)
    {
        return creatorAuctions[_creator].length;
    }

    /**
     * @dev Get auction at index
     */
    function getAuctionAt(uint256 _index) external view returns (address) {
        require(_index < allAuctions.length, "Index out of bounds");
        return allAuctions[_index];
    }

    /**
     * @dev Calculate fee breakdown for a given amount
     */
    function calculateFees(uint256 _amount)
        external
        pure
        returns (uint256 ecosystemFee, uint256 personalFee)
    {
        ecosystemFee = (_amount * ECOSYSTEM_FEE_PERCENT) / 10000;
        personalFee = (_amount * PERSONAL_FEE_PERCENT) / 10000;
    }
}
