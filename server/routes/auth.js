require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const User = require("../models/Users");
const Subscriber = require("../models/SubscriberSchema");
const Cart = require("../models/Cart");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const otpHolder = {};

const temp = process.env.FRONTEND_URL;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

router.post("/send-otp-email", async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists!" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    console.log(otp);

    otpHolder[email] = otp;

    const mailOptions = {
      from: "Kashvi Sarees <" + process.env.OWNER_EMAIL + ">",
      to: email,
      subject: "Your One-Time Password (OTP) for Registration",
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #fff; padding: 40px; color: #000; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="font-size: 2em; font-weight: bold; text-align: center; margin-bottom: 20px;">Your OTP for Secure Access</h2>
    
          <p style="font-size: 1.1em; text-align: center; margin-bottom: 30px;">
            Use the OTP below to complete your registration process. This code is valid for a limited time.
          </p>
    
          <div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 2em; font-weight: bold; letter-spacing: 5px; border-radius: 8px;">
            ${otp}
          </div>
    
          <p style="text-align: center; margin-top: 20px; font-size: 1em;">
            If you didn’t request this OTP, please ignore this email.
          </p>
    
          <p style="text-align: center; font-size: 0.9em; color: #555; margin-top: 30px;">
            Need help? Reply to this email, and we’ll assist you.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "OTP sent successfully!", success: true });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Error sending OTP", success: false });
  }
});

// **VERIFY OTP API**
router.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (parseInt(otp) === otpHolder[email]) {
    delete otpHolder[email];
    res
      .status(200)
      .json({ message: "OTP verified successfully!", success: true });
  } else {
    res.status(400).json({ message: "Invalid OTP", success: false });
  }
});

// **REGISTER API**
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists!" });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "User registered successfully!",
      user: newUser,
      token,
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Registration failed!",
      error: err.message,
      success: false,
    });
  }
});

// **LOGIN API**
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(409)
        .json({ message: "User doesn't exist!", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid Credentials!", success: false });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/user", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

router.post("/add-address", async (req, res) => {
  const { userId, street, city, state, pincode, country, name } = req.body;
  if (!userId || !name || !street || !city || !state || !pincode) {
    return res.status(400).json({ error: "All fields are required." });
  }
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.addresses.push({ street, city, state, pincode, country, name });

    await user.save();

    res.json({ message: "Address added successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });

    console.log(error);
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); // Exclude password
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/google-login", async (req, res) => {
  const { email, name, googleId, picture } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        email,
        name,
        googleId,
        profilePicture: picture,
      });
      await user.save();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Google authentication failed!" });
  }
});

// Route to send password reset email
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = jwt.sign({ id: user._id }, "SECRET_KEY", {
      expiresIn: "15m",
    });

    // Email content
    const mailOptions = {
      from: "Kashvi Sarees <" + process.env.OWNER_EMAIL + ">",
      to: email,
      subject: "Reset Your Password",
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #fff; padding: 40px; color: #000; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="font-size: 2em; font-weight: bold; text-align: center; margin-bottom: 20px;">Password Reset Request</h2>
    
          <p style="font-size: 1.1em; text-align: center; margin-bottom: 30px;">
            You have requested to reset your password. Click the button below to proceed.
          </p>
    
          <div style="text-align: center; margin-bottom: 30px;">
            <a href="https://kashvi-creation-psi.vercel.app/reset-password/${resetToken}" 
               style="display: inline-block; font-size: 1.2em; font-weight: bold; text-decoration: none; padding: 12px 24px; border: 2px solid #000; border-radius: 5px; color: #000;">
              Reset Password
            </a>
          </div>
    
          <p style="text-align: center; font-size: 1em; margin-bottom: 20px;">
            This link expires in <strong>15 minutes</strong>. If you didn’t request this, you can ignore this email.
          </p>
    
          <p style="text-align: center; font-size: 0.9em; color: #555;">
            Need help? Reply to this email, and we’ll assist you.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Password reset email sent!" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, "SECRET_KEY");
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();
    res.json({ message: "Password reset successful!" });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
});

router.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }
  try {
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber)
      return res.status(400).json({ message: "Email already subscribed." });

    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();
    const emailTemplate = `
      <div style="font-family: Arial, sans-serif; background-color: #fff; padding: 40px; color: #000; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="font-size: 2em; font-weight: bold; text-align: center; margin-bottom: 20px;">Welcome to Our Newsletter</h2>
        
        <p style="font-size: 1.1em; line-height: 1.5; text-align: center;">
          Thank you for subscribing! You’re now part of an exclusive group that receives the latest updates, insights, and special offers directly in your inbox.
        </p>

        <hr style="border: none; border-top: 1px solid #ccc; margin: 30px 0;">

        <h3 style="text-align: center; margin-bottom: 10px;">What You’ll Receive:</h3>
        <ul style="padding: 0 20px; font-size: 1em; line-height: 1.6;">
          <li>Exclusive content & industry insights</li>
          <li>Special promotions & early access to deals</li>
          <li>Expert tips & curated recommendations</li>
        </ul>

        <p style="text-align: center; margin: 20px 0; font-size: 1em;">Stay tuned—exciting content is on the way!</p>

        <div style="text-align: center; margin-top: 20px;">
          <a href="https://kashvi-creation-psi.vercel.app" style="display: inline-block; font-size: 1em; font-weight: bold; text-decoration: none; padding: 12px 24px; border: 2px solid #000; border-radius: 5px; color: #000;">Visit Our Website</a>
        </div>

        <p style="text-align: center; font-size: 0.9em; color: #555; margin-top: 30px;">If you have any questions, simply reply to this email. We’d love to hear from you!</p>
      </div>
    `;

    // Send the Email
    await transporter.sendMail({
      from: '"Kashvi Sarees" <navneetprajapati46@gmail.com>',
      to: email,
      subject: "Welcome to Our Newsletter!",
      html: emailTemplate,
    });

    res.json({ message: "Subscribed successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error, please try again." });
  }
});

router.get("/cart/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    const cartLength = cart ? cart.items.length : 0;

    res.status(200).json({ cartLength });
  } catch (error) {
    console.error("Error fetching cart length:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/wishlist/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    const wishList = user.wishlist;
    const wishListLength = wishList.length;
    res.status(200).json(wishListLength);
  } catch (error) {
    console.error("Error fetching wishlist length:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
