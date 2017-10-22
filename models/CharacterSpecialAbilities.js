const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharacterSpecialAbilities = new Schema({
  character: {
    type: Schema.Types.ObjectId,
    ref: 'characters'
  },
  name: {
    type: String
  },
  description: {
    type: String
  }
});

mongoose.model('characterSpecialAbilities', CharacterSpecialAbilities);
