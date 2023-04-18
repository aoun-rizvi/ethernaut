// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract CoinFlip {

  uint256 public consecutiveWins;
  uint256 lastHash;
  uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;

  constructor() {
    consecutiveWins = 0;
  }

  function flip(bool _guess) public returns (bool) {
    // console.log('_guess', _guess);
    uint256 blockValue = uint256(blockhash(block.number - 1));
    console.log('block.number', block.number);
    console.log('blockValue', blockValue);
    console.log('lastHash', lastHash);

    if (lastHash == blockValue) {
      revert('reverting');
    }
    // console.log('after revert');

    lastHash = blockValue;
    uint256 coinFlip = blockValue / FACTOR;
    bool side = coinFlip == 1 ? true : false;

    console.log('coin-flip:', side, _guess);

    if (side == _guess) {
      consecutiveWins++;
      return true;
    } else {
      consecutiveWins = 0;
      return false;
    }
  }
}