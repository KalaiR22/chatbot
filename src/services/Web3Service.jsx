import { ethers } from "ethers";

export const Web3Service = {
  // Check if MetaMask is installed
  isMetaMaskInstalled: () => {
    return typeof window.ethereum !== "undefined";
  },

  // Request account access
  connectWallet: async () => {
    try {
      if (!web3Service.isMetaMaskInstalled()) {
        throw new Error("MetaMask is not installed");
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      return accounts[0];
    } catch (error) {
      console.error("Error connecting to wallet:", error);
      throw error;
    }
  },

  // Get personal sign message
  signMessage: async (address, nonce) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Message to sign
      const message = `Sign this message to verify your identity. Nonce: ${nonce}`;

      // Sign the message
      const signature = await signer.signMessage(message);
      return { signature, message };
    } catch (error) {
      console.error("Error signing message:", error);
      throw error;
    }
  },
};
