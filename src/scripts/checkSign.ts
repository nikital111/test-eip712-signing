const TestArtifacts = require('../artifacts/contracts/Test.sol/Test.json');

export default async function checkSign(web3:any,contractAddress:string,bid:any,v:number,r:string,s:string) {
    const [acc] = await web3.eth.getAccounts();

    const MyContract = new web3.eth.Contract(TestArtifacts.abi,contractAddress);

    const isSign = await MyContract.methods.verify(acc,bid,v,r,s).call({from:acc});

    console.log(isSign);

    return isSign;
}