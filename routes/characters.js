const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Character = mongoose.model('characters');
const CharacterSkills = mongoose.model('characterSkills');
const Esoteries = mongoose.model('esoteries');
const User = mongoose.model('users');
const { ensureAuthenticated, ensureGuest } = require('../helpers/auth');

router.get('/', ensureAuthenticated, (req, res) => {
  Character.find({}, 'name')
    .populate('author')
    .sort({ date: 'desc' })
    .then(characters => {
      res.render('characters/index', characters);
    });
});

router.get('/show/:id', ensureAuthenticated, (req, res) => {
  Character.findOne({
    _id: req.params.id
  })
    .populate('user')
    .then(character => {
      res
        .render(`characters/show`, {
          character
        })
        .catch(e => res.send(err));
    });
});

router.get('/new', ensureAuthenticated, (req, res) => {
  res.render('characters/new');
});

router.post('/', ensureAuthenticated, (req, res) => {
  const newCharacter = {
    name: req.body.name,
    type: req.body.type,
    descriptor: req.body.descriptor,
    focus: req.body.focus,
    tier: req.body.teir,
    effort: req.body.effot,
    might: {
      pool: req.body.mightPool,
      edge: req.body.mightEdge
    },
    speed: {
      pool: req.body.speedPool,
      edge: req.body.speedEdge
    },
    intellect: {
      pool: req.body.intellectPool,
      edge: req.body.intellectEdge
    },
    armor: req.body.armor,
    author: req.user.id
  };

  new Character(newCharacter)
    .save()
    .then(character => {
      res.redirect(`characters/show/${character.id}`);
    })
    .catch(e => res.send(e));
});

router.get('/edit/:id', ensureAuthenticated, (req, res) => {
  Character.findOne({
    _id: req.params.id
  })
    .then(character => {
      res.render('characters/edit', character);
    })
    .catch(e => res.send(e));
});

router.put('/:id', ensureAuthenticated, (req, res) => {
  var id = req.params.id;
  Character.findOne({
    _id: id
  })
    .then(character => {
      character.id = req.params.id;
      character.name = req.body.name;
      character.type = req.body.type;
      character.descriptor = req.body.descriptor;
      character.focus = req.body.focus;
      character.tier = req.body.tier;
      character.effort = req.body.effot;
      character.might.pool = req.body.mightPool;
      character.might.edge = req.body.mightEdge;
      character.speed.pool = req.body.speedPool;
      character.speed.edge = req.body.speedEdge;
      character.intellect.pool = req.body.intellectPool;
      character.intellect.edge = req.body.intellectEdge;
      character.armor = req.body.armor;

      character
        .save()
        .then(character => {
          res.render(`/characters/show/${character.id}`);
        })
        .catch(e => res.send(e));
    })
    .catch(e => res.send(e));
});

router.delete('/:id', ensureAuthenticated, (req, res) => {
  Character.remove({ _id: req.params.id }).then(() =>
    res.redirect('/dashboard')
  );
});

module.exports = router;
