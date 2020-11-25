const express = require("express");
const mongoose = require("mongoose");
// const morgan = require("morgan");

const app = express()
const PORT = process.env.PORT || 3000;

//use logger/morgan
// app.use(morgan("dev"));
//parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//mongodb://<dbuser>:<dbpassword>@budget.lvarg.mongodb.net/budget-tracker?retryWrites=true&w=majority
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget-tracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});
mongoose.connection.on("connected", () => {
    console.log("Mongoose is connected!!!!");
});
// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App listening on: http://localhost:3000 ${PORT}!`);
});