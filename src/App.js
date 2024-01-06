
import { useState, useEffect } from 'react';
import './App.css';
import Web3 from 'web3';

function App() {
  const [web3Api, setWeb3Api] = useState({
    provider: null, 
    web3: null
  })

  useEffect(() => {
    const loadProvider = async() => {
      // with metamask we have an access to window.ethereum & to window.web3
      // metamask injects a global API into the website
      // this API allows website to request users, accounts and read data to the blockchain
      // sign messales and transactions
      let provider = null;

      if (window.ethereum) {
        provider = window.ethereum;
      } else if (window.web3) {
        provider = window.web3.currentProvider;
      } else if (!process.env.production) {
        provider = new Web3.providers.HttpProvider("http://localhost:7545")
      }
    }

    setWeb3Api({
      web3: new Web3(provider),
      provider;
    })

    loadProvider()
  }, [])

  return (
    <>
      <div className="faucet-wrapper">
        <div className="faucet">
          <div className="balance-view is-size-2">
            Current Balance: <strong>10</strong> ETH
          </div>
          <button 
            className="btn mr-2"
            onClick={async() => {
              const accounts = await window.ethereum.request({method: "eth_requestAccounts"})
              console.log(accounts)
            }}
          >
            Enable Ethereum
          </button>
          <button className="btn mr-2">Donate</button>
          <button className="btn">Withdraw</button>
        </div>
      </div>
    </>
  );
}

export default App;
