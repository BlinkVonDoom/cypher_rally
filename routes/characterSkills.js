const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Character = mongoose.model('characters');
const CharacterSkills = mongoose.model('characterSkills');
const Esoteries = mongoose.model('esoteries');

const User = mongoose.model('users');
const { ensureAuthenticated, ensureGuest } = require('../helpers/auth');

router.get('/:id', (req, res) => {
  Esoteries.findOne({ _id: req.params.id })
    .then(characterSkills => {
      res.send(characterSkills);
    })
    .catch(e => res.send(e));
});

router.post('/', (req, res) => {
  let character = req.body.character;
  character = character.toString();
  const newCharacterSkills = {
    character,
    name: req.body.name,
    trained: req.body.trained,
    skilled: req.body.skilled
  };

  new CharacterSkills(newCharacterSkills)
    .save()
    .then(characterSkill => {
      res.send(characterSkill);
    })
    .catch(e => res.send(e));

  Character.findOne({ _id: newCharacterSkills.character })
    .then(character => {
      character.characterSkills.push(newCharacterSkills);
      character.save();
    })
    .catch(e => res.send(e));
});

router.put('/:id', (req, res) => {
  CharacterSkills.findOne({
    _id: req.params.id
  }).then(characterSkill => {
    characterSkills.name = req.body.name;
    characterSkills.trained = req.body.trained;
    characterSkills.skilled = req.body.skilled;

    characterSkill
      .save()
      .then(characterSkill => res.send(characterSkill))
      .catch(e => res.send(e));
  });
});

router.delete('/:id', (req, res) => {});

module.exports = router;
