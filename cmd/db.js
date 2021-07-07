import mongoose from "mongoose";

const options = {
  useNewUrlParser: true,
  // reconnectTries: Number.MAX_VALUE,
  // reconnectInterval: 500,
  connectTimeoutMS: 10000,
  useUnifiedTopology: true,
};

// const url = `${process.env.MONGO_URL}`;
const url = `mongodb://localhost:27017/taskdb`;
mongoose
  .connect(url, options)
  .then(function () {
    console.log("MongoDB is connected");
  })
  .catch(function (err) {
    console.log(err);
  });
