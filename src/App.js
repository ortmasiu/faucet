
import { useState, useEffect } from 'react';
import './App.css';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider'


function App() {
  const [web3Api, setWeb3Api] = useState({
    provider: null, 
    web3: null
  })

  const [account, setAccount] = useState(null)

  useEffect(() => {
    const loadProvider = async() => {
      // with metamask we have an access to window.ethereum & to window.web3
      // metamask injects a global API into the website
      // this API allows website to request users, accounts and read data to the blockchain
      // sign messales and transactions
      const provider = await detectEthereumProvider()

      if (provider) {
        setWeb3Api({
          web3: new Web3(provider),
          provider
        })
      } else {
        console.error("Please install Metamask")
      }
    }

    loadProvider()
  }, [])

  
  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts();
      setAccount(accounts[0]);
    }

    web3Api.web3 && getAccount();
  }, [web3Api.web3])

  return (
    <>
      <div className="faucet-wrapper">
        <div className="faucet">
          <span>
            <strong>Account: </strong>
          </span>
          <h1>
            { account ? 
              account : 
              <button className="button is-small">
                Connect 
              </button>
            }
          </h1>
          <div className="balance-view is-size-2  mb-4">
            Current Balance: <strong>10</strong> ETH
          </div>
          <button className="button is-primary mr-2">Donate</button>
          <button className="button is-link">Withdraw</button>
        </div>
      </div>
    </>
  );
}

export default App;
