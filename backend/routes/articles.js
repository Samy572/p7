const express = require('express');
//Permet de créer des routeurs séparés pour chaque route principale de l'application
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const articlesCtrl = require('../controllers/articles');



router.post('/', auth, multer, articlesCtrl.createArticle);
router.get('/', auth,  articlesCtrl.getAllArticle);
router.get('/:id', auth, articlesCtrl.getOneArticle);
router.put('/:id',auth, multer, articlesCtrl.modifyArticle);
router.delete('/:id', auth, articlesCtrl.deleteArticle);

router.post('/:id/like', articlesCtrl.like);

// On exporte notre router
module.exports = router;