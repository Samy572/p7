const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');


// Router pour l'authentification et l'inscription
router.post('/', userCtrl.login); 
router.post('/signup', userCtrl.signup); 



module.exports = router; 