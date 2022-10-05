const mongoose = require('mongoose');

// On crée notre schéma pour notre base de donnée pour les publications
const articleSchema = mongoose.Schema({
    userId: { type: String, required: true },
    message: {type: String, required: true},
    date: {type : String}, 
    firstName: {type: String, required: true},
    name: { type: String, required: true },
    image: { type: String},
    likes: { type: Number },
    usersLiked: { type: Array },

});
// On exporte notre schéma 
module.exports = mongoose.model('Article', articleSchema); 