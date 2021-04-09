const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideosSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId
  },
  title: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('video', VideosSchema);
