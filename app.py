from flask import Flask, request, jsonify

app = Flask(__name__)

# Simple hardcoded user data for demo purposes
users = {
    "user1": "password123",
    "user2": "mypassword"
}

@app.route('/')
def home():
    return "Welcome to the backend API"

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if users.get(username) == password:
        return jsonify({"message": "Login successful", "status": "OK"}), 200
    else:
        return jsonify({"message": "Invalid credentials", "status": "ERROR"}), 401

@app.route('/unlock-pro', methods=['POST'])
def unlock_pro():
    # Simulate unlocking the Pro version for the user
    return jsonify({"message": "Pro version unlocked!"}), 200

if __name__ == '__main__':
    app.run(debug=True)
