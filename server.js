const express = require("express");
const bodyParser = require("body-parser");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const app = express();
app.use(bodyParser.json());

// Razorpay credentials
const razorpayInstance = new Razorpay({
  key_id: "YOUR_RAZORPAY_KEY", // Replace with your Razorpay key ID
  key_secret: "YOUR_RAZORPAY_SECRET", // Replace with your Razorpay secret key
});

// Create a Razorpay order
app.post("/create-order", (req, res) => {
  const { amount } = req.body; // Amount in INR

  const options = {
    amount: amount * 100, // Amount in paise (100 paise = 1 INR)
    currency: "INR",
    receipt: "receipt#1",
  };

  razorpayInstance.orders.create(options, function (err, order) {
    if (err) {
      return res.status(500).json({ success: false, message: "Error creating order" });
    }
    res.json({ success: true, order_id: order.id });
  });
});

// Verify payment signature
app.post("/verify-payment", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", "YOUR_RAZORPAY_SECRET")
    .update(body)
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    // Payment is successful
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// Endpoint to unlock Pro features after successful payment
app.post("/unlock-pro", (req, res) => {
  const { username, paymentId } = req.body;

  // Update the user's record in the database (set isPro = 1)
  db.run("UPDATE users SET isPro = 1 WHERE username = ?", [username], (err) => {
    if (err) {
      res.status(500).json({ success: false, message: "Database error" });
      return;
    }
    res.json({ success: true, message: "Pro features unlocked!" });
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
