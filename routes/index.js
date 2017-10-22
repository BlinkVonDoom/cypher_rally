const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Character = mongoose.model('characters');
const User = mongoose.model('users');
const { ensureAuthenticated, ensureGuest } = require('../helpers/auth');

router.get('/', ensureGuest, (req, res) => {
  res.render('index/welcome');
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
  Character.find({ author: req.user.id }).then(characters => {
    res.render('index/dashboard', { characters });
  });
});

router.get('/about', (req, res) => {
  res.render('index/about');
});

module.exports = router;

// 59ebba3bf84c7c10172336b5
