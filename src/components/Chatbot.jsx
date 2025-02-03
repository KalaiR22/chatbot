import { useState } from "react";
import { BsSendFill } from "react-icons/bs";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isChatStarted, setIsChatStarted] = useState(false);

  const handleSendMessage = () => {
    if (input.trim() === "") return;
    setMessages([...messages, input]);
    setInput("");
    if (!isChatStarted) setIsChatStarted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-white relative">
      <div className="w-full max-w-lg p-4 bg-white rounded-lg shadow-md flex flex-col">
        <div className="flex-1 overflow-y-auto max-h-[70vh] p-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className="bg-blue-500 text-white p-2 rounded-md my-2 self-end"
            >
              {msg}
            </div>
          ))}
        </div>
      </div>

      <div
        className={`w-full max-w-2xl  p-4 rounded-lg bg-white ${
          isChatStarted ? "fixed bottom-0" : "absolute top-1/2 -translate-y-1/2"
        } flex items-center justify-between`}
      >
        <div className="flex w-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-1.5 px-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0000007a] focus:ring-offset-2 focus:ring-offset-white placeholder:text-sm placeholder:font-normal"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim()} // Disable button if input is empty
            className={`ml-2 text-white rounded-lg px-3 py-1 text-lg transition-colors ${
              input.trim()
                ? "bg-black cursor-pointer"
                : "bg-[#0000007a] "
            }`}
          >
            <BsSendFill />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
