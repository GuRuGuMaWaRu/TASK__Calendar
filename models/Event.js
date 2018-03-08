const mongoose = require("mongoose");
const { Schema } = mongoose;

const eventSchema = new Schema({
  title: String,
  fromTime: String,
  tillTime: String,
  start: Number,
  duration: Number,
  _user: { type: Schema.Types.ObjectId, ref: "User" }
});

mongoose.model("events", eventSchema);
