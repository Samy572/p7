// Permet d'acceder à notre model Article
const Commentaires = require('../models/commentaires');
// donne acces à des methodes file systeme
const fs = require('fs');


// Requête POST nouvel articles qui vont être rajouté à la bdd
exports.createCommentaires = (req, res, next) => {
	const commentairesObjet = (req.body);
	

	const commentaires = new Commentaires({
		...commentairesObjet,
		image:  req.file != undefined ? `${req.protocol}://${req.get("host")}/image/${req.file.filename}`: '',
		userId: req.body.userId,

	});

	// enregistrement des articles en bdd
	commentaires
		.save()
		.then(() => res.status(201).json({ message: 'Commentaire enregistré.' }))
		.catch((error) => {
			res.status(400).json({ error });
		});
};

// Utilisation de la méthode findOne() dans notre modèle article pour trouver l'article unique ayant le même _id que le paramètre de la requête
exports.getOneCommentaires = (req, res, next) => {
	Commentaires.findOne({ _id: req.params.id })
		.then((commentaires) => {
			res.status(200).json(commentaires);
		})
		.catch((error) => res.status(400).json({ error }));
};


exports.deleteCommentaires = (req, res, next) =>{
	Commentaires.deleteOne({_id : req.params.id})
	.then(() => res.status(200).json({ message: 'Article supprimé !' }))
	.catch((error) => res.status(400).json({ error }));
}



// L'application utilisera cette fonction pour faire une requete à l'api
//Renvoie un tableau de toutes les commentaires de la base de données.
exports.getAllCommentaires = (req, res, next) => {
	Commentaires.find()
		.then((commentaires) => res.status(200).json(commentaires))
		.catch((error) => {
			res.status(401).json({ error });
		});
};
