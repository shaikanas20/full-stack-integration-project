import React, { useState, useEffect } from "react";
import io from "socket.io-client";

// Connect to the backend Socket.io server
const socket = io("http://localhost:5000");

function App() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    // Define the message handler
    const handleMessage = (data) => {
      setChat((prev) => [...prev, data]);
    };

    // Listen for messages from the server
    socket.on("receive_message", handleMessage);

    // Cleanup function to remove the listener (prevents duplicate messages)
    return () => {
      socket.off("receive_message", handleMessage);
    };
  }, []);

  // Function to send message
  const sendMessage = (e) => {
    e.preventDefault();
    if (name.trim() === "" || message.trim() === "") return;

    const msgData = { name, message };
    socket.emit("send_message", msgData);
    setMessage("");
  };

  return (
    <div
      style={{
        border: "2px solid black",
        width: "400px",
        margin: "auto",
        textAlign: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2>💬 Real-Time Chat App</h2>

      {/* Username input */}
      <input
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          marginBottom: "10px",
          padding: "5px",
          width: "80%",
          borderRadius: "4px",
          border: "1px solid gray",
        }}
      />

      {/* Message input and send button */}
      <form onSubmit={sendMessage}>
        <input
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            padding: "5px",
            width: "70%",
            borderRadius: "4px",
            border: "1px solid gray",
          }}
        />
        <button
          type="submit"
          style={{
            marginLeft: "10px",
            padding: "6px 12px",
            borderRadius: "4px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </form>

      {/* Chat messages */}
      <div
        style={{
          border: "2px solid black",
          marginTop: "20px",
          textAlign: "left",
          padding: "10px",
          maxHeight: "300px",
          overflowY: "auto",
          backgroundColor: "#fafafa",
        }}
      >
        {chat.map((msg, index) => (
          <p key={index} style={{ margin: "5px 0" }}>
            <strong>{msg.name}:</strong> {msg.message}
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
