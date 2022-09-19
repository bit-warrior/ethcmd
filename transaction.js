const Web3=require('web3')
const EthTx=require('ethereumjs-tx')
const EthUtil=require('ethereumjs-util')
const util=require('util')

const networkList={"Mainnet":"https://mainnet.infura.io/v3/3836a217ff0e4854ac7e3cbf9b6c3511",
                   "Rinkeby":"https://rinkeby.infura.io/v3/3836a217ff0e4854ac7e3cbf9b6c3511",
                   "Kovan":"https://kovan.infura.io/v3/3836a217ff0e4854ac7e3cbf9b6c3511",
                   "Ropsten":"https://ropsten.infura.io/v3/3836a217ff0e4854ac7e3cbf9b6c3511"
                  }
 const chain={
    "Mainnet":1,
    "Rinkeby":4,
    "Kovan":42,
    "Ropsten":3

 }


exports.web3=async function(network,privateKey,sendTo,amount){
    
 const web3= new Web3(new Web3.providers.HttpsProvider(networkList[network]));
 const address=EthUtil.privateToAddress("0x"+privateKey);
 const getTransactionCount = util.promisify(web3.eth.getTransactionCount.bind(web3));
 const getGasPrice=util.promisify(web3.eth.getGasPrice.bind(web3));
 const sendSignedTransaction=util.promisify(web3.eth.sendSignedTransaction.bind(web3));

 const tx = new EthTx(null);
      let count=await getTransactionCount("0x"+address.toString('hex'));
      
      tx.nonce=web3.utils.toHex(count);
      let gp=await getGasPrice();
      
      tx.gasPrice=web3.utils.toHex(gp);
      
      tx.to="0x"+sendTo;
      tx.value=web3.utils.toHex( web3.utils.toWei(amount, 'ether') );
      tx.gasLimit=web3.utils.toHex(300000);
      tx.chainId=chain[network];
      tx.data='';
      let pk=Buffer.from(privateKey,'hex');
      tx.sign(pk)
      let transactionid= await sendSignedTransaction("0x"+tx.serialize().toString('hex'));
      return transactionid;

}


