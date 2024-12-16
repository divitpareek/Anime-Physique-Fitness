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
      triggerVibration(); // Trigger vibration when a plan is generated
    })
    .catch((error) => console.error("Error:", error));
}

// Unlock Pro Features
function unlockPro() {
  fetch(`${BASE_URL}/unlock-pro`, { method: "POST" })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Pro Features Unlocked!");
        document.getElementById("proFeatures").style.display = "block";
        triggerVibration(); // Trigger vibration when Pro is unlocked
      } else {
        alert("Payment failed. Try again.");
      }
    })
    .catch((error) => console.error("Error:", error));
}

// Handle touch events for better interaction
function handleTouchEvent(event) {
  // Prevent default scrolling behavior on mobile devices
  event.preventDefault();
  
  // You can add custom behavior here, for example:
  document.body.style.backgroundColor = "#f0f0f0"; // Change background color on touch

  triggerVibration(); // Trigger vibration on touch event
}

// Trigger vibration (haptic feedback)
function triggerVibration() {
  if (navigator.vibrate) {
    navigator.vibrate(200); // Vibrate for 200ms
  } else {
    console.log("Vibration API not supported on this device.");
  }
}

// Add touch event listeners to interactive elements
document.getElementById("loginForm").addEventListener("touchstart", handleTouchEvent);
document.getElementById("ageSelector").addEventListener("touchstart", handleTouchEvent);
document.getElementById("pro").addEventListener("touchstart", handleTouchEvent);
