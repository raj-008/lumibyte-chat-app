const asyncErrorHandler = require("../utils/asyncErrorHandler");
const createNewSession = require("../utils/createNewSession");
const fs = require("fs");
const path = require("path");
const sendResponse = require("../utils/sendResponse");
const CustomError = require("../utils/customError");

let sessions = [];

const mockData = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/mockData.json")));

exports.startChat = asyncErrorHandler(async (req, res) => {
  const newSession = createNewSession(sessions.length);

  sessions.push(newSession);

  const sessionId = newSession.id;

  return sendResponse(res, "New Chat Created", { sessionId });
});

exports.askQuestion = asyncErrorHandler(async (req, res, next) => {
  const { sessionId } = req.params;
  const { question } = req.body;  

  const session = sessions.find((s) => s.id === sessionId);
  if (!session) return next(new CustomError("Session not found, Create new chat", 404));

  const response = mockData.responses.find((r) => r.question.toLowerCase() === question.toLowerCase()) || { answer: { description: "Sorry, No data found for your query. Try using one of the predefined questions to get a mock response", table: [] } };

  session.history.push({ id: Date.now(), role: "user", content: question });
  session.history.push({ id: Date.now(), role: "bot", content: response.answer.description, table: response.answer.table });

  return sendResponse(res, "Answer send successfully", session);
});

exports.getSessions = asyncErrorHandler(async (req, res) => {
  const session = sessions.map((s) => ({ id: s.id, title: s.title }));

  return sendResponse(res, "Sessions retrived successfully", session);
});

exports.getSessionHistory = asyncErrorHandler(async (req, res, next) => {
  const { sessionId } = req.params;
  const session = sessions.find((s) => s.id === sessionId);
  if (!session) return next(new CustomError("Session not found, Create new chat", 404));

  return sendResponse(res, "Session history retrived successfully", session.history);
});

exports.likeDislikeResponse = asyncErrorHandler(async (req, res, next) => {
  const { sessionId } = req.params;
  const { messageId, isliked } = req.body;

  const session = sessions.find((s) => s.id === sessionId);
  if (!session) return next(new CustomError("Session not found, Create new chat", 404));

  const response = session.history.find((message) => message.id === messageId && message.role === "bot");
  if (!response) return next(new CustomError("Message not found", 404));
  response.isliked = isliked;

  return sendResponse(res, "Session history retrived successfully", session.history);
});
