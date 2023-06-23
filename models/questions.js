const mongoose = require("mongoose");
// this is model for question
const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    // options: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Option",
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

const question = mongoose.model("Question", questionSchema);

module.exports = question;
