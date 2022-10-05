// Permet d'acceder à notre model Article
const Article = require('../models/articles');
// donne acces à des methodes file systeme
const fs = require('fs');



// Requête POST nouvel articles qui vont être rajouté à la base
exports.createArticle = (req, res, next) => {
	const articleObjet = (req.body);

	const article = new Article({
		...articleObjet,
		image:  req.file != undefined ? `${req.protocol}://${req.get("host")}/image/${req.file.filename}`: '',

	});
	
	// enregistrement des articles en bdd
	article
		.save()
		.then(() => res.status(201).json({ message: 'Article enregistré.' }))
		.catch((error) => {
			res.status(400).json({ error });
		});
		
};

// Utilisation de la méthode findOne() dans notre modèle article pour trouver l'article unique ayant le même _id que le paramètre de la requête
exports.getOneArticle = (req, res, next) => {
	Article.findOne({ id: req.params.id })
		.then((article) => {
			res.status(200).json(article);
		})
		.catch((error) => res.status(400).json({ error }));
};

// Routes put pour la modification des données images et texte.

exports.modifyArticle = (req, res, next) => {
	
	Article.updateOne({_id: req.params.id}, {...req.body}, {image:  req.file != undefined ? `${req.protocol}://${req.get("host")}/image/${req.file.filename}`: '',})
	.then(()=> res.status(200).json({message: 'Publication modifiée'}))
	.catch((error) => res.status(400).json({ error }));
		};
		

// Routes pour les likes

exports.like = (req, res, next) => {
Article.findOne({_id : req.params.id})

.then((article) =>{
	
	// Si l'id de l'utilisateur n'est pas dans userliked dans la bdd et que like est à 1
	if (!article.usersLiked.includes(req.body.userId) ) {
		// Maj bdd 
		Article.updateOne({_id: article._id},{
			// Incrémentation du like 
			$inc: {likes: 1}, 
			// On pousse le like dans userliked
			$push: {usersLiked: req.body.userId}
			
		})
		.then(() => res.status(201).json({message: 'article like +1' }))
		.catch((error) => res.status(400).json({ error }));
		
		// Si l'id de l'utilisateur est dans userliked dans la bdd et que le like est à 0
	}	else if (article.usersLiked.includes(req.body.userId) ) {
		
		Article.updateOne({_id: article._id},{
			// On enleve 1 like 
			$inc: {likes: -1}, 
			// On supprime du tableau un like en bdd 
			$pull: {usersLiked: req.body.userId}
		})
		.then(() => res.status(201).json({message: 'article like -1' }))
		.catch((error) => res.status(400).json({ error }));
	};
	
}).catch((error) => res.status(404).json({ error }));
}


// Route pour la suppresions des données.

exports.deleteArticle = (req, res, next) => {
	// On cherche l'objet avec l'url de l'image
	Article.findOne({ _id: req.params.id })
		.then((article) => {
			const filename = article.image.split('/image/')[1];
			// Suppression du fichier
			fs.unlink(`image/${filename}`, () => {
				Article.deleteOne({ _id: req.params.id })
					.then(() => res.status(200).json({ message: 'Article supprimé !' }))
					.catch((error) => res.status(400).json({ error }));
			});
		})
		.catch((error) => res.status(500).json({ error }));
		
};


// L'application utilisera cette fonction pour faire une requete à l'api
//Renvoie un tableau de toutes les articles de la base de données.
exports.getAllArticle = (req, res, next) => {
	Article.find()
		.then((article) => res.status(200).json(article))
		.catch((error) => {
			res.status(401).json({ error });
		});
};
