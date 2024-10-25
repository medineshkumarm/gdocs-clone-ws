const { Schema, model } = require("mongoose");
const messageSchema = new Schema({
  text: String,
  user: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = model("Messages", messageSchema);
