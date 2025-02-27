// Install required packages
// npm install @web3auth/modal @web3auth/base

import React, { useState, useEffect } from "react";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { ethers } from "ethers";


const clientId = "YOUR_WEB3AUTH_CLIENT_ID"; // Get from https://dashboard.web3auth.io

function App() {
  const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);
  const [user, setUser] = useState(null);
  const [account, setAccount] = useState("");

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x1", // Ethereum mainnet
            rpcTarget: "https://eth.llamarpc.com", // Public RPC endpoint
          },
          uiConfig: {
            theme: "dark",
            loginMethodsOrder: [
              "google",
              "facebook",
              "twitter",
              "email_passwordless",
            ],
          },
        });

        setWeb3auth(web3auth);
        await web3auth.initModal();
      } catch (error) {
        console.log(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!web3auth) {
      console.log("Web3Auth not initialized yet");
      return;
    }

    try {
      const web3authProvider = await web3auth.connect();
      setProvider(web3authProvider);

      if (web3authProvider) {
        const ethersProvider = new ethers.providers.Web3Provider(
          web3authProvider
        );
        const signer = ethersProvider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);

        const userInfo = await web3auth.getUserInfo();
        setUser(userInfo);

        // Send auth info to your backend
        const token = await authenticateWithBackend(address, userInfo);
        localStorage.setItem("authToken", token);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const logout = async () => {
    if (!web3auth) {
      console.log("Web3Auth not initialized yet");
      return;
    }

    await web3auth.logout();
    setProvider(null);
    setAccount("");
    setUser(null);
    localStorage.removeItem("authToken");
  };

  const authenticateWithBackend = async (address, userInfo) => {
    // Call your backend to authenticate the user
    // This is where you'd integrate with your Express backend
    try {
      const response = await fetch("http://localhost:5000/api/auth/web3auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
          email: userInfo.email,
          name: userInfo.name,
          profileImage: userInfo.profileImage,
        }),
      });

      const data = await response.json();
      return data.token;
    } catch (error) {
      console.error("Backend authentication error:", error);
      throw error;
    }
  };

  return (
    <div className="container">
      <h1>Web3Auth Demo</h1>

      {!account ? (
        <button onClick={login}>Login with Web3Auth</button>
      ) : (
        <div>
          <p>Address: {account}</p>
          {user && (
            <div>
              <p>User: {user.name}</p>
              <p>Email: {user.email}</p>
              {user.profileImage && (
                <img src={user.profileImage} alt="Profile" width="50" />
              )}
            </div>
          )}
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default App;
