import { useEffect, useRef, useState } from "react";
import { FiSend, FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import { useChat } from "../hooks/useChat";

const Chat = () => {
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);
  const { messages, loading, sendMessage } = useChat();

  const handleSend = async () => {
    const trimmedMessage = input.trim();
    if (!trimmedMessage || loading) return;
    await sendMessage(trimmedMessage);
    setInput("");
  };

  const handleLikeDislike = (id, value) => {
    sendMessage((prev) => prev.map((msg) => (msg.id === id ? { ...msg, liked: value } : msg)));
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex flex-col chat-height h-[calc(100vh-5rem)] bg-gray-50 dark:bg-neutral-900 rounded-lg shadow-sm">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-screen">
          <p className="text-gray-400 dark:text-gray-500 text-xl m-0">Ask me anything 💬</p>
        </div>
      ) : (
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600 [&::-webkit-scrollbar-track]:bg-gray-200 dark:[&::-webkit-scrollbar-track]:bg-neutral-800">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className="flex flex-col">

                {/* Chat Text  */}
                <div className={`px-4 py-2 max-w-xs md:max-w-md rounded-2xl text-sm ${msg.role === "user" ? "bg-blue-600 text-white rounded-br-none" : "bg-gray-200 dark:bg-neutral-700 dark:text-gray-100 rounded-bl-none"}`}>
                  {msg.content}
                </div>
                
                {/* Chat Table */}
                {msg.role === "bot" && msg.table.length > 0 && (
                  <div className="my-2 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl overflow-hidden text-sm shadow-sm transition-colors duration-300">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100 dark:bg-neutral-800">
                          {Object.keys(msg.table[0]).map((key) => (
                            <th key={key} className="p-2 text-left font-semibold capitalize border-b border-gray-200 dark:border-neutral-700 !text-gray-800 dark:!text-gray-200">
                              {key}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {msg.table.map((row, i) => (
                          <tr key={i} className={`border-t border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800`}>
                            {Object.values(row).map((val, j) => (
                              <td key={j} className="p-2 text-gray-700 dark:!text-gray-200 transition-colors duration-300">
                                {val}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Chat Likes & Dislike */}
                {msg.role === "bot" && (
                  <div className="flex gap-2 mt-1 text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                    <button onClick={() => handleLikeDislike(msg.id, "like")} className={`flex items-center gap-1 text-sm ${msg.liked === "like" ? "text-blue-600 dark:text-blue-400 font-semibold" : ""}`}>
                      <FiThumbsUp />
                    </button>
                    <button onClick={() => handleLikeDislike(msg.id, "dislike")} className={`flex items-center gap-1 text-sm ${msg.liked === "dislike" ? "text-red-600 dark:text-red-400 font-semibold" : ""}`}>
                      <FiThumbsDown />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Message Input */}
      <div className="dark:border-neutral-700 p-4 bg-white dark:bg-neutral-800">
        <div className="flex items-center gap-3">
          <input type="text" placeholder="Type a message..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} className="flex-1 px-4 py-2 rounded-full bg-gray-100 dark:bg-neutral-700 text-gray-900 dark:text-gray-100 placeholder-white-500 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <button onClick={handleSend} className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition">
            <FiSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
