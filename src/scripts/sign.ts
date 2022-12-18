const solidityCode = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Verifier {
    uint256 constant chainId = <CHAINID>;
    address constant verifyingContract = 0x1C56346CD2A2Bf3202F771f50d3D14a367B48070;
    bytes32 constant salt = 0xf2d857f4a3edcb9b78b4d503bfe733db1e3f6cdc2b7971ee739626c97e86a558;
    
    string private constant EIP712_DOMAIN  = "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract,bytes32 salt)";
    string private constant IDENTITY_TYPE = "Identity(uint256 userId,address wallet)";
    string private constant BID_TYPE = "Bid(uint256 amount,Identity bidder)Identity(uint256 userId,address wallet)";
    
    bytes32 private constant EIP712_DOMAIN_TYPEHASH = keccak256(abi.encodePacked(EIP712_DOMAIN));
    bytes32 private constant IDENTITY_TYPEHASH = keccak256(abi.encodePacked(IDENTITY_TYPE));
    bytes32 private constant BID_TYPEHASH = keccak256(abi.encodePacked(BID_TYPE));
    bytes32 private constant DOMAIN_SEPARATOR = keccak256(abi.encode(
        EIP712_DOMAIN_TYPEHASH,
        keccak256("test"),
        keccak256("2"),
        chainId,
        verifyingContract,
        salt
    ));
    
    struct Identity {
        uint256 userId;
        address wallet;
    }
    
    struct Bid {
        uint256 amount;
        Identity bidder;
    }
    
    function hashIdentity(Identity memory identity) private pure returns (bytes32) {
        return keccak256(abi.encode(
            IDENTITY_TYPEHASH,
            identity.userId,
            identity.wallet
        ));
    }
    
    function hashBid(Bid memory bid) private pure returns (bytes32){
        return keccak256(abi.encodePacked(
            "\\x19\\x01",
            DOMAIN_SEPARATOR,
            keccak256(abi.encode(
                BID_TYPEHASH,
                bid.amount,
                hashIdentity(bid.bidder)
            ))
        ));
    }
    
    function verify() public pure returns (bool) {
        Identity memory bidder = Identity({
            userId: <ID>,
            wallet: <WALLET>
        });
        
        Bid memory bid = Bid({
            amount: <AMOUNT>,
            bidder: bidder
        });
            
        bytes32 sigR = <SIGR>;
        bytes32 sigS = <SIGS>;
        uint8 sigV = <SIGV>;
        address signer = <SIGNER>;
    
        return signer == ecrecover(hashBid(bid), sigV, sigR, sigS);
    }
}
`.trim();

function parseSignature(signature: string) {
  var r = signature.substring(0, 64);
  var s = signature.substring(64, 128);
  var v = signature.substring(128, 130);

  return {
    r: "0x" + r,
    s: "0x" + s,
    v: parseInt(v, 16),
  };
}

function genSolidityVerifier(
  signature: any,
  amount: string,
  id: string,
  wallet: string,
  signer: string,
  chainId: string
) {
  return solidityCode
    .replace("<CHAINID>", chainId)
    .replace("<SIGR>", signature.r)
    .replace("<SIGS>", signature.s)
    .replace("<SIGV>", signature.v)
    .replace("<SIGNER>", signer)
    .replace("<AMOUNT>", amount)
    .replace("<ID>", id)
    .replace("<WALLET>", wallet);
}

async function getSign(
  web3: any,
  callback: (bid: any, v: number, r: string, s: string) => void,
  userMessage: any
) {
  const domain = [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
    { name: "chainId", type: "uint256" },
    { name: "verifyingContract", type: "address" },
    { name: "salt", type: "bytes32" },
  ];

  const bid = [
    { name: "amount", type: "uint256" },
    { name: "bidder", type: "Identity" },
  ];

  const identity = [
    { name: "userId", type: "uint256" },
    { name: "wallet", type: "address" },
  ];

  const chainId = "5";
  console.log("chain: ", chainId);

  const domainData = {
    name: "test",
    version: "2",
    chainId: chainId,
    verifyingContract: "0x1C56346CD2A2Bf3202F771f50d3D14a367B48070",
    salt: "0xf2d857f4a3edcb9b78b4d503bfe733db1e3f6cdc2b7971ee739626c97e86a558",
  };

  var message = {
    amount: userMessage.amount,
    bidder: {
      userId: userMessage.id,
      wallet: userMessage.wallet,
    },
  };

  const data = JSON.stringify({
    types: {
      EIP712Domain: domain,
      Bid: bid,
      Identity: identity,
    },
    domain: domainData,
    primaryType: "Bid",
    message: message,
  });

  const [signer] = await web3.eth.getAccounts();
  console.log("signer: ", signer);

  web3.currentProvider.sendAsync(
    {
      method: "eth_signTypedData_v3",
      params: [signer, data],
      from: signer,
    },
    function (err: string, result: any) {
      if (err || result.error) {
        return console.error(result);
      }

      const signature = parseSignature(result.result.substring(2));
      console.log("signature: ", signature);

      console.log(
        genSolidityVerifier(
          signature,
          message.amount,
          message.bidder.userId,
          message.bidder.wallet,
          signer,
          chainId
        )
      );
      callback(message, signature.v, signature.r, signature.s);
    }
  );
}

export default getSign;
