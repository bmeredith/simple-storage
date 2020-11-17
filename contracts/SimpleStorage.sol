// SPDX-License-Identifier: MIT
pragma solidity >= 0.5.0 < 0.8.0;

contract SimpleStorage {
  mapping (address => uint) public counter;

  address public owner = msg.sender;
  uint256 public storedData;

  modifier onlyOwner() {
    if(msg.sender != owner)
      revert("Only the owner can call this.");
    _;
  }

  function getStoredData() public view returns (uint256) {
    return storedData;
  }

  function setStoredData(uint256 x) public {
    storedData = x;
    counter[msg.sender] += 1;
  }

  function getCount(address _address) public view onlyOwner returns (uint) {
    return counter[_address];
  }
}
