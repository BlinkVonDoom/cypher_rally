const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Esoteries = new Schema({
  character: {
    type: Schema.Types.ObjectId,
    ref: 'characters'
  },
  esoteryName: {
    type: String
  },
  costType: {
    type: String
  },
  esoteryCost: {
    type: Number
  },
  esoteryDescription: {
    type: String
  }
});

mongoose.model('esoteries', Esoteries);
