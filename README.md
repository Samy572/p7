Pour lancer le backend => cd backend => nodemon server
Pour lancer le frontend => cd P7-groupomania => npm run dev
L'application se lance sur le port 5173.

Pour acceder à la base de donnée je vous ai crée un profil utilisateur sur mangoDB : Nom d'utilisateur : Evaluateur et mdp evaluationp7
Vous pouvez remplacer la ligne PASSWORD_DB dans le fichier env par cette ligne :
PASSWORD_DB ="mongodb+srv://Evaluateur:evaluation@cluster0.huyhrql.mongodb.net/?retryWrites=true&w=majority"

Si vous souhaitez vous connecter en tant qu'administrateur l'email utilisé est admin@groupomania.fr et le mot de passe admin123
