const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  completedVideo:{type:Number,default:0},  // Last completed video sequence
  lastVideoTimeStamp : {type:Number,default: 0}, // Timestamp of the last video watched
});

module.exports = mongoose.model('User', userSchema);
