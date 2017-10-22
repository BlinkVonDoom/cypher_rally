const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Esoteries = new Schema({
  character: {
    type: Schema.Types.ObjectId,
    ref: 'characters'
  },
  name: {
    type: String
  },
  costType: {
    type: String
  },
  cost: {
    type: Number
  },
  description: {
    type: String
  }
});

mongoose.model('esoteries', Esoteries);
