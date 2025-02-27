import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const authService = {
  // Get auth nonce from server
  getNonce: async (address) => {
    const response = await axios.get(`${API_URL}/nonce/${address}`);
    return response.data.nonce;
  },

  // Verify signature and login
  verifySignature: async (address, signature, message) => {
    const response = await axios.post(`${API_URL}/verify`, {
      address,
      signature,
      message,
    });

    // Store JWT token in local storage
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem("user");
  },

  // Get current user
  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem("user"));
  },
};
