const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  descriptor: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  focus: {
    type: String,
    required: true
  },
  tier: {
    type: Number,
    default: 1
  },
  effort: {
    type: Number,
    default: 1
  },
  might: {
    pool: {
      type: Number,
      required: true
    },
    edge: {
      type: Number,
      default: 0
    }
  },
  speed: {
    pool: {
      type: Number,
      required: true
    },
    edge: {
      type: Number,
      default: 0
    }
  },
  intellect: {
    pool: {
      type: Number,
      required: true
    },
    edge: {
      type: Number,
      default: 0
    }
  },
  armor: {
    type: Number
  },
  characterSkills: [],
  esoteries: [
    // {
    //   type: Schema.Types.ObjectId,
    //   ref: 'esoteries'
    // }
  ],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('characters', CharacterSchema, 'characters');
