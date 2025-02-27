const { ethers } = require("ethers");
const crypto = require("crypto");

// Generate random nonce
const generateNonce = () => {
  return crypto.randomBytes(16).toString("hex");
};

// Verify Ethereum signature
const verifySignature = (address, signature, message) => {
  try {
    const recoveredAddress = ethers.utils.verifyMessage(message, signature);
    return recoveredAddress.toLowerCase() === address.toLowerCase();
  } catch (error) {
    console.error("Verification error:", error);
    return false;
  }
};

module.exports = {
  generateNonce,
  verifySignature,
};
