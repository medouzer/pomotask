const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { schemaOptions } = require('./modelOptions');

const pomodoroSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  type: {
    type: String,
    default: 'work',
  },
  totaltime : {
    type: Number,
    default: '0',
  },
  time: {
    type: Number,
    default: '0',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: 'pause',
  },
  break_time: {
    type: Number,
    default: '0',
  },
});

module.exports = mongoose.model('Pomodoro', pomodoroSchema);
