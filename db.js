const mongoose = require("mongoose");
const { MONGO_URI } = require("./config/dev");

const username = process.env.REACT_APP_USER_NAME;
const password = process.env.REACT_APP_PASSWORD;

// to remove this warning
// [MONGOOSE] DeprecationWarning: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7. Use `mongoose.set('strictQuery', false);` if you want to prepare for this change. Or use `mongoose.set('strictQuery', true);` to suppress this warning.
// (Use `node --trace-deprecation ...` to show where the warning was created)
mongoose.set("strictQuery", false);

const connectToMongo = () => {
  mongoose.connect(MONGO_URI, () => {
    console.log("Connected to Database successfully...");
  });
};

module.exports = connectToMongo;
