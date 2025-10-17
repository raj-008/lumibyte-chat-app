import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import displayError from "../utils/displayError";
import { apiUrl } from "../config/envConfig";

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { sessionId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      if (!sessionId) {
        setMessages([]);
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/chat/${sessionId}`);
        const history = response.data?.data || [];
        setMessages(history);
      } catch (error) {
        console.error("Failed to load chat history:", error);
        displayError(error.response?.data?.message || "Failed to fetch chat history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [sessionId]);

  const sendMessage = async (question) => {
    setLoading(true);
    try {
      let currentSessionId = sessionId;

      if (!currentSessionId) {
        const response = await axios.post(`${apiUrl}/chat/new`);
        currentSessionId = response.data?.data?.sessionId;
        navigate(`/chat/${currentSessionId}`, { replace: true });
      }

      const answerResponse = await axios.post(`${apiUrl}/chat/question/${currentSessionId}`, { question: question });

      const messageHistory = answerResponse.data?.data?.history || [];
      setMessages(messageHistory);
    } catch (error) {
      console.error("Error sending message:", error);
      displayError(error.response?.data?.message || "Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return { messages, loading, sendMessage };
};
