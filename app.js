function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    
    // Simulate login logic (in reality, use a backend API to verify)
    if (username && password) {
        alert("Login Successful!");
    } else {
        alert("Please enter both username and password.");
    }
}

function purchasePro() {
    // Simulate purchase functionality for Pro version
    alert("Purchase successful! You have unlocked the Pro version.");
}
