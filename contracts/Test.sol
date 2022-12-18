// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Verifier.sol";

contract Test is Verifier {

    function verify(address signer, Bid memory bid, uint8 v, bytes32 r, bytes32 s) public pure override returns (bool) {
    return super.verify(signer, bid, v, r, s);
    }

}