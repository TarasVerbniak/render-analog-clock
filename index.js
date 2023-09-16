const express = require("express");
const { PORT } = require("./config");

const app = express();

app.use(express.static("public"));

app.listen(PORT, () => console.log("Server started.."));

const stopHandler = (exitCode, isException) => (error) => {
  // Make sure we stop server properly without loosing data (in real life we'll have to close connection to DB and other things like that)
  if (isException) console.error(`Uncaught exception: ${error}`); // for real app - add proper logger here
  process.exit(exitCode);
};
process.on("SIGINT", stopHandler(0));
process.on("SIGTERM", stopHandler(0));
process.on("uncaughtException", stopHandler(1, true));
process.on("unhandledRejection", stopHandler(1, true));
