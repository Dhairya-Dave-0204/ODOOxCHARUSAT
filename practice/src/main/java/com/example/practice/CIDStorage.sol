// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CIDStorage {
    // Mapping to store multiple CIDs for each user
    mapping(address => string[]) private userCIDs;

    // Event to log CID storage
    event CIDStored(address indexed user, string cid);

    // Function to store CID in blockchain
    function storeCID(string memory _cid) public {
        require(bytes(_cid).length > 0, "CID cannot be empty");

        userCIDs[msg.sender].push(_cid); // Append CID to the user's list
        emit CIDStored(msg.sender, _cid);
    }

    // Function to retrieve all stored CIDs for a user
    function getCIDs(address user) public view returns (string[] memory) {
        return userCIDs[user];
    }
}
