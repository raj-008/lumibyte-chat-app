const express = require("express");
const router = express.Router();
const { startChat, askQuestion, getSessions, getSessionHistory, likeDislikeResponse } = require("../controllers/chatController");

router.post("/new", startChat);
router.post("/question/:sessionId", askQuestion);
router.get("/sessions", getSessions);
router.get("/:sessionId", getSessionHistory);
router.post("/like-dislike/:sessionId", likeDislikeResponse);

module.exports = router;
