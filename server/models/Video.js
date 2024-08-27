const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  metadata: { type: String, required: true },
  order: { type: Number, required: true }, // Sequence within the module
});

module.exports = mongoose.model("Video", videoSchema);
