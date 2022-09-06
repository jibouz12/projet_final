const express = require('express');
const userCtrl = require('../controllers/user');

const router = express.Router();

///////////////////
/// routes post :
/// --> créer un nouvel utilisateur
/// --> connection utilisateur
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;