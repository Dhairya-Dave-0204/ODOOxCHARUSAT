import React, { useState } from "react";

function Chatbot() {
  const [showChatbot, setShowChatbot] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { text: userInput, sender: "user" }];
    setMessages(newMessages);
    setUserInput("");

    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });
      const data = await response.json();

      setMessages([...newMessages, { text: data.response, sender: "ai" }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  return (
    <>
      {/* Chatbot Toggler */}
      <div className="fixed z-50 right-8 bottom-8">
        <button
          className="flex items-center justify-center w-12 h-12 text-white transition-all duration-300 rounded-full shadow-md bg-primary hover:bg-secondary focus:outline-none"
          onClick={() => setShowChatbot((prev) => !prev)}
        >
          {showChatbot ? (
            <i className="fa-solid fa-x" />
          ) : (
            <i className="far fa-message" />
          )}
        </button>
      </div>

      {/* Chatbot Container */}
      {showChatbot && (
        <div className="fixed bottom-20 max-h-[30rem] right-8 w-full max-w-lg flex flex-col bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden sm:w-96">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-primary">
            <h2 className="text-lg font-semibold">Lung Cancer AI Chatbot</h2>
            <button
              onClick={() => setShowChatbot(false)}
              className="text-white cursor-pointer"
            >
              <i className="fa-solid fa-x" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2 h-80">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg max-w-xs break-words ${
                  msg.sender === "user"
                    ? "bg-primary self-end"
                    : "bg-gray-700 self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="flex items-center border-t border-gray-700 p-2">
            <input
              type="text"
              className="flex-1 p-2 bg-gray-700 text-white rounded-lg focus:outline-none"
              placeholder="Type your message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              className="bg-primary hover:bg-secondary transition duration-300 text-white p-2 ml-2 rounded-lg"
              onClick={sendMessage}
            >
              <i className="ri-send-plane-line"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
