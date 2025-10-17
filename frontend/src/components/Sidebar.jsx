import axios from "axios";
import { useEffect, useState } from "react";
import { CgAddR } from "react-icons/cg";
import { Link, useParams } from "react-router-dom";
import displayError from "../utils/displayError";
import { apiUrl } from "../config/envConfig"

const SideBar = ({ collapsed, setCollapsed }) => {
  const [dropdownOpen, setDropdownOpen] = useState(true);
  const [sessions, setSessions] = useState([]);
  const { sessionId } = useParams();

  const fetchSessions = async () => {
    try {
      const response = await axios.get(`${apiUrl}/chat/sessions`);
      const data = response.data.data.reverse();
      setSessions(data);
    } catch (error) {
      console.error("Failed to load sessions:", error);
      displayError(error.response?.data?.message || "Failed to fetch chat history.");
    }
  };

  useEffect(() => {
    fetchSessions();
  }, [sessionId]);

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-full bg-white dark:bg-neutral-800 border-r border-gray-200 dark:border-neutral-700 transition-all duration-300 z-50 transform ${
          collapsed ? "w-16" : "w-64"
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-between px-4 pt-4 border-gray-200 dark:border-neutral-700">
          {!collapsed && (
            <span className="text-xl text-black dark:text-white">
              <Link to="/">LumiByte Chat</Link>
            </span>
          )}
          <button onClick={() => setCollapsed(!collapsed)} className="text-gray-600 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-700 p-1 rounded">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {collapsed ? <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />}
            </svg>
          </button>
        </div>

        <nav className="flex-1 px-2 py-4 overflow-y-auto">
          <Link to="/chat" className={`flex items-center gap-x-3 p-2 text-gray-800 dark:text-neutral-200 rounded hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors`}>
            <CgAddR size={20} />
            {!collapsed && <span>New Chat</span>}
          </Link>

          <div className="mt-2">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center w-full gap-x-3 p-2 text-gray-800 dark:text-neutral-200 rounded hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors"
            >
              {!collapsed && <span>Chats</span>}
              {!collapsed && (
                <svg className={`ml-auto w-4 h-4 transform transition-transform ${dropdownOpen ? "rotate-90" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 6L14 10L6 14V6Z" clipRule="evenodd" />
                </svg>
              )}
            </button>

            {dropdownOpen && !collapsed && (
              <div className="ml-8 mt-1 flex flex-col gap-1">
                {sessions.map((chat, index) => (
                  <a href={`/chat/${chat.id}`} key={index} className="p-1 text-sm text-gray-700 dark:text-neutral-300 rounded hover:bg-gray-100 dark:hover:bg-neutral-700">
                    {chat.title}
                  </a>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-200 dark:border-neutral-700 flex items-center gap-x-3">
          <img src="https://i.pravatar.cc/40" alt="avatar" className="w-8 h-8 rounded-full" />
          <div className="flex flex-col">
            {!collapsed && <span className="text-gray-800 dark:text-neutral-200">User</span>}
            {!collapsed && <span className="text-gray-600 dark:text-neutral-400 text-xs">user@gmail.com</span>}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
