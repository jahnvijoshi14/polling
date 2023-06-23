const express = require("express");
const router = express.Router();
const Controller = require("../controller/QuestionController");

router.post("/questions/create", Controller.createQuestion);
//put id of question
router.post("/questions/:id/options/create", Controller.createOptions);
router.get("/options/:qid/:id/add_vote", Controller.addVotes);

//put id of question
router.get("/questions/:id", Controller.getAll);

//put id of option
router.delete("/options/:id/delete", Controller.deleteOption);

//put id of question
router.delete("/questions/:id/delete", Controller.deleteQuestion);
//649556774f3f36a8ae8ee3b2
// router.get("/details", Controller.details);

module.exports = router;
