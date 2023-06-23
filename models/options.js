const mongoose = require("mongoose");
// this is model for options
const optionSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Question",
    },
    title: {
      type: String,
      required: true,
    },
    votes: {
      type: Number,
      required: true,
    },
    tovote: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const option = mongoose.model("Option", optionSchema);

module.exports = option;
