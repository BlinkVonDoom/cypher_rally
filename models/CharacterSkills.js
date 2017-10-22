const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharacterSkills = new Schema({
  character: {
    type: Schema.Types.ObjectId,
    ref: 'characters'
  },
  name: {
    type: String
  },
  trained: {
    type: Boolean,
    default: true
  },
  skilled: {
    type: Boolean,
    default: false
  }
});

mongoose.model('characterSkills', CharacterSkills);
