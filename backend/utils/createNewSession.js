const { v4: uuidv4 } = require("uuid");

function createNewSession(size) {
  return {
    id: uuidv4(),
    title: `Chat ${size + 1} - ${new Date().toLocaleTimeString()}`,
    history: [],
  };
}

module.exports = createNewSession;
