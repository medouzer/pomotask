const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { schemaOptions } = require('./modelOptions');

const boardSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    icon: {
      type: String,
      default: '🎯',
    },
    title: {
      type: String,
      default: 'Untitled',
    },
    description: {
      type: String,
      default: `Add descreption here
    🟢 You can add multiline descreption
    🟢 Let's start... `,
    },
    position: {
      type: Number,
    },
    favourite: {
      type: Boolean,
      default: false,
    },
    favouritePosition: {
      type: Number,
      default: 0,
    },
  },
  schemaOptions
);

module.exports = mongoose.model('Board', boardSchema);
