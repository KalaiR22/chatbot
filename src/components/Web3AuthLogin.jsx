import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";
import { ethers } from "ethers";
import axios from "axios";

const clientId =
  "BCqmu1bRDa-JEq8vKUfHAfoPeW4IFSikPk40Sq6b3kgEWR0yFcypeimcdcs4UXDAKNyftuJubBdcB_E6SV7mOcM"; // Replace with your Web3Auth client ID

function Web3AuthLogin() {
  const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState("");
  const [jwt, setJwt] = useState("");

  useEffect(() => {
    const initWeb3Auth = async () => {
      try {
        const web3authInstance = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: "eip155",
            chainId: "8453", // Ethereum Mainnet (change if needed)
          },
        });

        await web3authInstance.initModal();
        setWeb3auth(web3authInstance);
      } catch (error) {
        console.error("Web3Auth init failed:", error);
      }
    };

    initWeb3Auth();
  }, []);

  const login = async () => {
    if (!web3auth) return;

    const provider = await web3auth.connect();
    setProvider(provider);

    const ethersProvider = new ethers.providers.Web3Provider(provider);
    const signer = ethersProvider.getSigner();
    const address = await signer.getAddress();
    setAccount(address);

    // Secure authentication using signed message
    const message = "Sign this message to verify your identity.";
    const signature = await signer.signMessage(message);

    // Send signed message to backend for verification
    const response = await axios.post("http://localhost:5000/auth", {
      address,
      message,
      signature,
    });

    setJwt(response.data.token); // Store JWT for secure API calls
  };

  return (
    <div>
      <button onClick={login}>Login with Web3Auth</button>
      {account && <p>Connected Wallet: {account}</p>}
      {jwt && <p>Authenticated (JWT Token received!)</p>}
    </div>
  );
}

export default Web3AuthLogin;
