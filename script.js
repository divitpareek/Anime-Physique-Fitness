// script.js
let userLoggedIn = false;
let isProUnlocked = false;

function login() {
  const username = document.getElementById("username").value;
  if (username.trim() === "") {
    alert("Please enter a username.");
    return;
  }
  userLoggedIn = true;
  alert(`Welcome, ${username}!`);
  document.getElementById("auth").style.display = "none";
  document.getElementById("age-group").style.display = "block";
  document.getElementById("pro").style.display = "block";
}

function generatePlan() {
  const ageGroup = document.getElementById("ageSelector").value;
  const plan = document.getElementById("plan");

  let workout, diet;

  switch (ageGroup) {
    case "teen":
      workout = "15-minute cardio, 30 squats, 15 pushups, 10 pullups.";
      diet = "High protein foods, fruits, and moderate carbs.";
      break;
    case "adult":
      workout = "30-minute cardio, 40 squats, 20 pushups, 15 pullups.";
      diet = "Balanced protein, healthy fats, and low carbs.";
      break;
    case "senior":
      workout = "20-minute walk, 20 squats, light yoga.";
      diet = "High fiber, moderate protein, and low sugar.";
      break;
    default:
      workout = "No workout plan found.";
      diet = "No diet plan found.";
  }

  document.getElementById("result").style.display = "block";
  plan.innerHTML = `<p><strong>Workout:</strong> ${workout}</p>
                    <p><strong>Diet:</strong> ${diet}</p>`;
}

function unlockPro() {
  if (isProUnlocked) {
    alert("Pro Features are already unlocked!");
    return;
  }
  const paymentSuccess = confirm(
    "Click OK to confirm payment of ₹700 for unlocking Pro features."
  );

  if (paymentSuccess) {
    isProUnlocked = true;
    alert("Pro Features Unlocked! Enjoy exclusive content.");
    document.getElementById("proFeatures").style.display = "block";
  }
}
