import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

export default function ChatRoom() {
  const { id: roomId } = useParams();
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const s = io("http://localhost:3001");
    setSocket(s);

    s.emit("join-room", roomId);

    s.on("receive-message", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => s.disconnect();
  }, [roomId]);

  const sendMessage = () => {
    if (message.trim() && socket) {
      const newMessage = { content: message, fromSelf: true };
      setMessages((prev) => [...prev, newMessage]);
      socket.emit("send-message", { roomId, content: message });
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Chat Room: {roomId}</h2>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={msg.fromSelf ? "message-self" : "message"}>
            {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
