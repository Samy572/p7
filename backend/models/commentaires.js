const mongoose = require('mongoose'); 

// Schéma pour les commentaires
const schemaCommentaires = mongoose.Schema({
userId: {type: String, required: true},
firstName: {type: String, required: true},
articleId : {type: Array}, 
active:{type: Boolean}, 
name: { type: String, required: true },
message: {type: String, required: true},

})

module.exports = mongoose.model('Commentaires', schemaCommentaires); 