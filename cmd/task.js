import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Task = new Schema({
  name: { type: String, unique: true },
  complete: { type: Boolean, default: false },
});

export default mongoose.model("Task", Task);
