const mongoose = require('mongoose');
// Permet de ne pas avoir des utilisateurs avec le même email
const uniqueValidator = require('mongoose-unique-validator');

// Schéma pour les users 
const userSchema = mongoose.Schema({
	firstName: { type: String, required: true},
	name: {type: String, required: true},
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	admin: {type: Boolean,  default: false}, 
});
// On ajoute le plugin unique validator à notre schéma
userSchema.plugin(uniqueValidator);
// On exporte notre schéma user
module.exports = mongoose.model('User', userSchema);