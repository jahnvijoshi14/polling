const ques = require("../models/questions");
const options = require("../models/options");

//this is to add questions
module.exports.createQuestion = async (req, res) => {
  try {
    const data = await ques.create({ title: req.body.title });
    console.log(data);
    return res.json(200, data);
  } catch (err) {
    return res.json(500, { message: err });
  }
};

//to delete a question
module.exports.deleteQuestion = async (req, res) => {
  try {
    const identity = req.params.id;
    let data = await options.find({ question: req.params.id });
    let flag = false;

    data.map((i) => {
      if (!flag && i.votes > 0) {
        flag = true;
      }
      return i;
    });

    if (flag) {
      return res.json(401, {
        Message:
          "Sorry!!! This question have option whose Votes are greater then 0 so, we cannot delete it",
      });
    }

    const checking = await options.find({ question: req.params.id });

    if (checking && checking.length > 0) {
      console.log(checking);

      const Option = await options.deleteMany({
        question: req.params.id,
      });
    }

    data = await ques.findByIdAndDelete(identity);

    return res.json(200, data);
  } catch (err) {
    return res.json(500, { message: err });
  }
};

//this is to a delete option
module.exports.deleteOption = async (req, res) => {
  try {
    let data = await options.findById(req.params.id);
    if (data.votes >= 1) {
      return res.json(401, {
        Message:
          "Sorry!!! This option's Votes are greater then 0 so, we cannot delete it",
      });
    }

    data = await options.findByIdAndDelete(req.params.id);
    return res.json(200, data);
  } catch (err) {
    return res.json(500, { message: "Incorrect data" });
  }
};

//this is to get all the questions and options combined
module.exports.getAll = async (req, res) => {
  try {
    const data = await options
      .find({ question: req.params.id })
      .populate("question");
    console.log(data);

    const response = await options.find({ question: req.params.id });
    const end = [];
    response.map((i) => {
      end.push({
        id: i.id,
        title: i.title,
        votes: i.votes,
        link: i.tovote,
      });
      return i;
    });

    return res.json(200, {
      Question: data[0].question.title,
      Options: end,
    });
  } catch (err) {
    return res.json(500, { message: err });
  }
};

//this is to vote any option
module.exports.addVotes = async (req, res) => {
  const mapping = req.params.qid;
  const oid = req.params.id;
  try {
    const data = await options.find({ question: mapping, id: oid });
    const uid = data[0]._id;
    const response = await options.findByIdAndUpdate(uid, {
      votes: data[0].votes + 1,
    });

    const endresponse = await options.findById(uid);
    console.log(endresponse);
    return res.json(200, endresponse);
  } catch (err) {
    return res.json(500, { message: err });
  }
};

//this is to add options
module.exports.createOptions = async (req, res) => {
  console.log(req.params.id);
  const mapping = req.params.id;
  let data = req.body;

  const prevData = await options.find({ question: mapping });

  let newData = data.map((i, index) => {
    i.id = prevData.length > 0 ? prevData[prevData.length - 1].id + 1 : 1;
    i.tovote =
      "http://localhost:8000/options/" + mapping + "/" + i.id + "/add_vote";
    i.votes = 0;
    i.question = mapping;
    prevData.push(i);
    return i;
  });
  try {
    console.log(newData);

    const option = await options.create(newData);
    console.log(newData);
    return res.json(200, newData);
  } catch (err) {
    return res.json(500, { message: err });
  }
};
