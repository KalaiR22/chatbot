import React, { useState } from "react";
import { Web3Service } from "../services/Web3Service";
import { authService } from "../services/authService";

const Signup = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState("");

  const handleConnect = async () => {
    try {
      setLoading(true);
      setError("");

      // Connect wallet and get address
      const address = await web3Service.connectWallet();
      setAccount(address);

      // Get nonce from server
      const nonce = await authService.getNonce(address);

      // Sign message with nonce
      const { signature, message } = await Web3Service.signMessage(
        address,
        nonce
      );

      // Verify signature on server and get token
      const userData = await authService.verifySignature(
        address,
        signature,
        message
      );

      console.log("Authentication successful:", userData);

      // Redirect or update UI as needed
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message || "Authentication failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Web3 Authentication</h2>
      {!account ? (
        <button onClick={handleConnect} disabled={loading}>
          {loading ? "Connecting..." : "Connect Wallet"}
        </button>
      ) : (
        <div>
          <p>Connected: {account}</p>
          <button onClick={() => authService.logout()}>Disconnect</button>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Signup;
