const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// @route   POST api/auth/web3auth
// @desc    Authenticate user with Web3Auth
// @access  Public
router.post("/web3auth", async (req, res) => {
  try {
    const { address, email, name, profileImage } = req.body;

    // Check if address is provided
    if (!address) {
      return res.status(400).json({ msg: "Wallet address is required" });
    }

    // Find or create user
    let user = await User.findOne({ address: address.toLowerCase() });

    if (!user) {
      // Create new user
      user = new User({
        address: address.toLowerCase(),
        email,
        name,
        profileImage,
      });
      await user.save();
    } else {
      // Update user info if needed
      user.email = email || user.email;
      user.name = name || user.name;
      user.profileImage = profileImage || user.profileImage;
      await user.save();
    }

    // Create JWT token
    const payload = {
      user: {
        id: user.id,
        address: user.address,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: { address: user.address, name: user.name, email: user.email },
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
