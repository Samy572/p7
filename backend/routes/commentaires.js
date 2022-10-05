const express = require('express');
//Permet de créer des routeurs séparés pour chaque route principale de l'application
const router = express.Router();
// importation de notre middleware authentification
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
// Importation de notre schéma
const commentairesCtrl = require('../controllers/commentaires');



router.post('/:id', commentairesCtrl.createCommentaires);
router.get('/', auth, commentairesCtrl.getAllCommentaires);
router.get('/',  commentairesCtrl.getOneCommentaires);
router.delete('/:id', auth, commentairesCtrl.deleteCommentaires);

// On exporte notre router
module.exports = router;