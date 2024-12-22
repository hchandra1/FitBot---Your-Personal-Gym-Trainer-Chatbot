require 'json'

# Function to load predefined responses from a JSON file
def load_responses
  file_path = 'responses.json'
  if File.exist?(file_path)
    JSON.parse(File.read(file_path))
  else
    puts "Error: The file 'responses.json' was not found!"
    exit
  end
end

# Main function to handle chatbot interactions
def start_chatbot
  responses = load_responses
  puts "Welcome to FitBot! Type your questions or type 'exit' to quit."

  loop do
    print "You: "
    user_input = gets.chomp.downcase

    break if user_input == 'exit'

    if responses.key?(user_input)
      puts "Bot: #{responses[user_input]}"
    else
      puts "Bot: I'm not sure how to respond to that. Try asking something else!"
    end
  end
end

# Start the chatbot
start_chatbot
