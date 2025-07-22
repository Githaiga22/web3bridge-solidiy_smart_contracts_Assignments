import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import contractABI from './assets/abi.json' // ABI file in assets folder

const contractAddress = '0xe3157cf7A74A8686e1949b1d9d01DfCD9b4dC822'

function App() {
  const [walletAddress, setWalletAddress] = useState('')
  const [provider, setProvider] = useState(null)
  const [contract, setContract] = useState(null)
  const [messageInput, setMessageInput] = useState('')
  const [storedMessage, setStoredMessage] = useState('')

  // Connect wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        setWalletAddress(accounts[0])

        const tempProvider = new ethers.BrowserProvider(window.ethereum)
        const signer = await tempProvider.getSigner()
        const tempContract = new ethers.Contract(contractAddress, contractABI, signer)

        setProvider(tempProvider)
        setContract(tempContract)

        console.log('Wallet connected:', accounts[0])
      } catch (error) {
        console.error('Error connecting to wallet or contract:', error)
      }
    } else {
      alert('Please install Metamask to use this app.')
    }
  }

  // Store message
  const storeMessage = async () => {
    if (!contract) return console.error('Contract not connected')

    try {
      const tx = await contract.store(messageInput)
      await tx.wait()
      console.log('Message stored successfully!')
    } catch (error) {
      console.error('Error storing message:', error)
    }
  }

  // Retrieve message
  const getMessage = async () => {
    if (!contract) return console.error('Contract not connected')

    try {
      const msg = await contract.retrieve()
      setStoredMessage(msg.toString())
      console.log('Stored message:', msg.toString())
    } catch (error) {
      console.error('Error retrieving message:', error)
    }
  }

  return (
    <main>
      <h1>📝 Store a Message on the Blockchain</h1>

      {/* Connect Wallet Button */}
      <button onClick={connectWallet}>
        {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}
      </button>

      <section>
        {/* Input Field for Message */}
        <input
          type='text'
          placeholder='Enter a message'
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />

        <button onClick={storeMessage} disabled={!walletAddress}>
          Store
        </button>

        <button onClick={getMessage} disabled={!walletAddress}>
          Get
        </button>

        <h3>{storedMessage && `🔓 Retrieved: ${storedMessage}`}</h3>
      </section>
    </main>
  )
}

export default App
