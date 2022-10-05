// Importation de jsonwebtoken
const jwt = require('jsonwebtoken');
// Importation de bcrypt pour le cryptage des mdp 
const bcrypt = require('bcrypt');
require('dotenv').config();
const mongoose = require('mongoose');

// Importation du schema user
const User = require('../models/user');

// Pour l'inscription
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          firstName: req.body.firstName,
          name: req.body.name, 
          email: req.body.email,
          admin: req.body.admin, 
          password: hash,
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
          
      })
      .catch(error => res.status(500).json({ error }));
      
  };

// Pour la connexion

  exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
      // Si l'utilisateur n'existe pas dans notre bdd
        if (!user) {
            return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
        }
        bcrypt.compare(req.body.password, user.password)
          
            .then(valid => {
              // Si le password est incorrect
                if (!valid) {
                    return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                // Si le password est correct
                }else{
                res.status(200).json({
                    userId: user._id,
                    firstName: user.firstName,
                    name: user.name,
                    admin : user.admin,
                    token: jwt.sign(
                      {userId: user._id},
                      process.env.SECRET,
                      { expiresIn: '24h'}
                      ),
                })};
            })
            .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
  };