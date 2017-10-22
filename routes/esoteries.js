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
    .then(esoteries => {
      res.send(esoteries);
    })
    .catch(e => res.send(e));
});

router.post('/', (req, res) => {
  Character.findOne({ _id: req.params.id }).then(character => {
    character = character.toString();
    const newEsoteries = {
      character,
      name: req.body.name,
      cost: req.body.cost,
      costType: req.body.costType,
      description: req.body.description
    };

    new Esoteries(newEsoteries)
      .save()
      .then(esotery => {
        res.send(esotery);
      })
      .catch(e => res.send(e));

    Character.findOne({ _id: newEsoteries.character })
      .then(character => {
        character.esoteries.push(newEsoteries);
        character.save();
      })
      .catch(e => res.send(e));
  });

  router.put('/:id', (req, res) => {
    Esoteries.findOne({
      _id: req.params.id
    }).then(esotery => {
      esotery.name = req.body.name;
      esotery.description = req.body.description;
      esotery.cost = req.body.cost;
      esotery.costType = req.body.costType;

      estoery
        .save()
        .then(esotery => res.send(esotery))
        .catch(e => res.send(e));
    });
  });
});

router.delete('/:id', (req, res) => {});

module.exports = router;
