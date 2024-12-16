const BASE_URL = "http://localhost:3000"; // Backend server URL

// User login/signup
function login() {
  const username = document.getElementById("username").value.trim();
  if (!username) {
    alert("Please enter a username.");
    return;
  }

  fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert(`Welcome, ${username}!`);
        document.getElementById("auth").style.display = "none";
        document.getElementById("age-group").style.display = "block";
        document.getElementById("pro").style.display = "block";
      } else {
        alert("Login failed. Try again.");
      }
    })
    .catch((error) => console.error("Error:", error));
}

// Fetch workout/diet plan
function generatePlan() {
  const ageGroup = document.getElementById("ageSelector").value;

  fetch(`${BASE_URL}/plans?ageGroup=${ageGroup}`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("result").style.display = "block";
      document.getElementById("plan").innerHTML = `
        <p><strong>Workout:</strong> ${data.workout}</p>
        <p><strong>Diet:</strong> ${data.diet}</p>`;
    })
    .catch((error) => console.error("Error:", error));
}

// Initiate Razorpay Payment
function initiatePayment() {
  const options = {
    key: "YOUR_RAZORPAY_KEY", // Replace with your Razorpay key
    amount: 250 * 100, // Amount in paise (₹250)
    currency: "INR",
    name: "Anime Physique App",
    description: "Unlock Pro features for ₹250",
    handler: function (response) {
      // Payment was successful, handle success
      alert("Payment successful!");
      unlockPro(response.razorpay_payment_id); // Call backend to unlock Pro
    },
    prefill: {
      name: document.getElementById("username").value, // Get username from input
      email: "user@example.com", // Pre-fill the email (if any)
      contact: "9999999999", // Pre-fill the contact number
    },
    theme: {
      color: "#F37254", // Theme color
    },
  };

  const razorpay = new Razorpay(options);
  razorpay.open(); // Open the Razorpay payment popup
}

// Unlock Pro Features after successful payment
function unlockPro(paymentId) {
  const username = document.getElementById("username").value;

  fetch(`${BASE_URL}/unlock-pro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, paymentId }), // Send username and payment ID to backend
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        document.getElementById("proFeatures").style.display = "block"; // Show Pro Features
      } else {
        alert("Payment verification failed. Try again.");
      }
    })
    .catch((error) => console.error("Error:", error));
}
