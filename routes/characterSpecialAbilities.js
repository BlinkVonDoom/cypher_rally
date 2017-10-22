const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Character = mongoose.model('characters');
const CharacterSkills = mongoose.model('characterSkills');
const CharacterSpecialAbilities = mongoose.model('characterSpecialAbilities');
const User = mongoose.model('users');
const { ensureAuthenticated, ensureGuest } = require('../helpers/auth');

router.get('/:id', (req, res) => {
  CharacterSpecialAbilities.findOne({ _id: req.params.id })
    .then(characterSpecialAbilities => {
      res.send(characterSpecialAbilities);
    })
    .catch(e => res.send(e));
});

router.post('/', (req, res) => {
  let character = req.body.character;
  character = character.toString();
  const newCharacterSpecialAbilities = {
    character,
    name: req.body.name,
    description: req.body.description
  };

  new CharacterSpecialAbilities(newCharacterSpecialAbilities)
    .save()
    .then(characterSpecialAbility => {
      res.send(characterSpecialAbility);
    })
    .catch(e => res.send(e));

  Character.findOne({ _id: newCharacterSpecialAbilities.character })
    .then(character => {
      character.characterSpecialAbilities.push(newCharacterSpecialAbilities);
      character.save();
    })
    .catch(e => res.send(e));
});

router.put('/:id', (req, res) => {
  CharacterSpecialAbilities.findOne({
    _id: req.params.id
  }).then(characterSpecialAbility => {
    characterSpecialAbility.name = req.body.name;
    characterSpecialAbility.description = req.body.description;

    characterSpecialAbility
      .save()
      .then(characterSpecialAbility => res.send(characterSpecialAbility))
      .catch(e => res.send(e));
  });
});

router.delete('/:id', (req, res) => {});

module.exports = router;
