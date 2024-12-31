import { useRef, useState } from "react";
import "./index.css";

interface ChatEntry {
  user: string;
  message: string;
}

export const Chat = () => {
  const [chatHistory, setChatHistory] = useState<ChatEntry[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let userMessage = inputRef.current?.value;
    if (userMessage && checkMessage(userMessage)) {
      setChatHistory((prev) => [
        ...prev,
        { user: "user", message: userMessage },
      ]);
      e.currentTarget.reset();
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

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {chatHistory.map((message, index) => {
          return (
            <p
              key={index}
              className={`chat-message chat-message-${
                message.user != "bot" ? "user" : "bot"
              }`}
            >
              {message.user}: {message.message}
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
