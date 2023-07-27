import Simplestorage from "./contracts/Simplestorage.json"//abi import
import Web3 from "web3"
import {useEffect, useState} from "react"
import './App.css';

function App() {
  const [state,setstate]=useState({
    we3:null,
    contract:null
  });
  useEffect(()=>{
    const provider=new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
    async function template(){
    const web3=new Web3(provider);
    const networkID=await web3.eth.net.getId();
    const deployednetwork=Simplestorage.networks[networkID];
    // console.log();
    const contract=new web3.eth.Contract(Simplestorage.abi,deployednetwork.address);
    setstate({web3:web3,contract:contract});
  }
  provider && template();
},[])
// run only once
const [accounts1,setaccounts1]=useState([]);

async function getAccounts()
{
  const {web3}=state;
  const account= await web3.eth.getAccounts();
  // console.log(account);
  setaccounts1(account);
}
const [take,settake]=useState(0);


// useEffect(()=>{
async function readcontract()
{
const {contract}=state;
  const value=await contract.methods.getter().call();
  console.log(value);
  settake(Number(value));
  // console.log(settake);
  console.log({take});
}
  // contract && readcontract();
// },[state]);
async function writecontract()
{
  const {contract}=state;
  const data1=document.querySelector("#data").value;
  await contract.methods.setter(data1).send({from:"0x077Ae83b01846Cd6F38177833a2b0550bc9A5868"});
  // console.log(value);
}
  return (

    <div className="App">
      <header className="App-header">
        Hello world
        <br></br>
        <button onClick={getAccounts}>Get Accounts</button>
        <p>your accounts are :{accounts1.map((account)=>{
          return <li key={account}>{account}</li>
        })}</p>
        <button onClick={readcontract}>Contract data</button>
        <p>The data is :{take}</p>
        <button onClick={writecontract}>Contract data set</button> 
        <input type="text" id="data"></input>
          
       </header>
    </div>

  );
}

export default App;
