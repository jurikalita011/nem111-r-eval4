const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  device: {
    type: String,
    enum: ["Laptop", "Tablet", "Mobile"],
    required: true,
  },
  no_of_comments: { type: Number, required: true },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const PostModel = mongoose.model("Post", postSchema);

module.exports = PostModel;
