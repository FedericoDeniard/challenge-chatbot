import { useEffect, useRef, useState } from "react";
import "./index.css";

interface ChatEntry {
  user: string;
  message: string;
}

export const Chat = () => {
  const [chatHistory, setChatHistory] = useState<ChatEntry[]>([]);

  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userMessage = inputRef.current?.value;
    if (userMessage && checkMessage(userMessage)) {
      setChatHistory((prev) => [
        ...prev,
        { user: "user", message: userMessage },
      ]);
      e.currentTarget.reset();
      setChatHistory((prev) => [...prev, { user: "bot", message: "..." }]);
      fetchAnswer(userMessage);
    }
  };

  const checkMessage = (message: string): boolean => {
    let checkEmpty = message.trim().length > 0;
    let checkTurn =
      chatHistory.length == 0 ||
      chatHistory[chatHistory.length - 1].user === "bot";
    let canSend = checkEmpty && checkTurn;
    return canSend;
  };

  const fetchAnswer = async (prompt: string) => {
    const response = await fetch("http://localhost:3000/groq", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
      credentials: "include",
    });
    let data = await response.json();
    if (!data.success) {
      return;
    }
    data = data.data;
    setChatHistory((prev) => prev.slice(0, prev.length - 1));
    setChatHistory((prev) => [...prev, { user: "bot", message: data }]);
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="chat-container">
      <div className="chat-messages" ref={chatRef}>
        {chatHistory.map((message, index) => {
          return (
            <p
              key={index}
              className={`chat-message chat-message-${
                message.user != "bot" ? "user" : "bot"
              }`}
            >
              {message.message.split("<br>").map((line, idx) => (
                <span key={idx}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          );
        })}
      </div>
      <form className="chat-input-container" onSubmit={submit}>
        <input
          className="chat-input"
          type="text"
          placeholder="Escriba aquí"
          ref={inputRef}
        ></input>
        <input type="submit" className="chat-submit" />
      </form>
    </div>
  );
};
