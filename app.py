from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

responses = {
    "hi": "Hello! How can I assist you today?",
    "hello": "Hi there! How’s your day going?",
    "how are you": "I’m just a chatbot, but I’m here to help you!",
    "bye": "Goodbye! Stay healthy and take care!",
    "thank you": "You’re welcome! I’m happy to help.",
    "what is your name": "I’m your friendly chatbot, here to support your fitness journey!",
    "default": "I'm not sure how to respond to that."
}

# Serve Home Page
@app.route('/')
def home():
    return render_template('index.html')

# Serve Chat Page
@app.route('/chat')
def chat():
    return render_template('chat.html')

# Handle Chat POST Request
@app.route('/chat', methods=['POST'])
def chatbot_response():
    message = request.form.get('message', '').lower()
    response = responses.get(message, responses['default'])
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(port=4567, debug=True)
