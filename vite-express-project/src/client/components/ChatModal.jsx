import React, { useEffect, useState } from "react";
import { useTheme } from "../hooks/ThemeContext";
import { createClient } from "@supabase/supabase-js";
import { useAuth } from "../hooks/AuthContext";
import { supabase } from "./supabase"



const ChatModal = (closeModal2) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showModal, setShowModal] = useState(true);

  const closeModal = () => {
    setShowModal(false);
  };

  const { loggedInUser } = useAuth();

  useEffect(() => {
    // Subscribe to the 'messages' table using Supabase Realtime. The subscription will be called everytime any event occurs.
    const messageSubscription = supabase
      .channel("YOUR_CHANNEL_NAME")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        (payload) => {
          setMessages((prevMessages) => [...prevMessages, payload.new]);
          console.log("Change received!", payload);
        }
      )
      .subscribe();

    // Clean up subscription on component unmount
    return () => {
      messageSubscription.unsubscribe();
    };
  }, []);

 
 // Fetch old messages for presistent chat
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from("messages")
          .select("receiver_id, sender_id, text, timestamp, channel")
          .order("timestamp", { ascending: true });

        if (error) {
          throw error;
        }
        setMessages(data || []);
      } catch (error) {
        console.error("Error fetching messages:", error.message);
      }
    };

    fetchMessages();
  }, []);

  const sendMessage = async () => {
    try {
      if (newMessage.trim() !== "") {
        const timestamp = new Date().toISOString(); 
        const { data, error } = await supabase.from("messages").insert([
          {
            sender_id: `${loggedInUser.id}`, 
            receiver_id: "2", 
            text: newMessage,
            timestamp,
            channel: "YOUR_CHANNEL_NAME",
          },
        ]);
        if (error) {
          throw error;
        }
        setNewMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  };

  console.log("loggedInUser", loggedInUser);

  return (
    <div>
      <div className="fixed top-1/2 right-6 transform -translate-x-1/2 -translate-y-1/2 w-80 h-96 border rounded-lg overflow-hidden">
        <div className="bg-white p-4 rounded-lg shadow-lg h-full flex flex-col">
          <h1 className="fixed top-1 right-6">
            X
          </h1>
          <p>{messages.channel}</p>
          <ul className="flex-1 overflow-y-auto mb-4">
            {Object.values(messages).map((msg, index) => {
              const isSentByLoggedInUser = msg.sender_id == loggedInUser.id;

              return (
                <li
                  key={index}
                  className={`mb-2 ${
                    isSentByLoggedInUser ? "chat chat-end" : "chat chat-start"
                  }`}
                >
                  <p className="chat-bubble">{msg.text}</p>
                  <div className="chat-header">
                    <strong>
                      {isSentByLoggedInUser ? "You" : msg.sender_id}
                    </strong>
                    :
                  </div>
                </li>
              );
            })}
          </ul>
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="border border-gray-300 p-2 rounded-md mb-2 w-full"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
