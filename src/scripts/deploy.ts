const TestArtifacts = require('../artifacts/contracts/Test.sol/Test.json');
export default async function Deploy(web3:any) {
    const [acc] = await web3.eth.getAccounts();
    const MyContract = new web3.eth.Contract(TestArtifacts.abi);

    MyContract.deploy({
        data: TestArtifacts.bytecode
        // arguments:["0x4AF47648dA52a1f19d20e669aaF0B0a55fF04d65"]
    })
    .send({
        from: acc
    })
    .then(function(newContractInstance:any){
        console.log(newContractInstance.options.address) // instance with the new contract address
        return newContractInstance.options.address;
    });
}