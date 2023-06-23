const express = require("express");

let db = require("./config/mongoose");

const app = express();
app.use(express.json());
const port = 8000;

// // this is for the form data
// app.use(express.urlencoded());

app.use("/", require("./routes/index"));

app.listen(port, (err) => {
  if (err) {
    console.log(`Error in running the server: ${err}`);
    return;
  }

  console.log(`Server is running on port: ${port}`);
});
