const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    default: []
  },
  jobPreferences: {
    type: String,
    default: 'Not specified'
  }
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);
