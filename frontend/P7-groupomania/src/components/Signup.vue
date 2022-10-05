<!-- Formulaire signup -->
<template>
<div id="signup">
    <section class="sec_signup" >
			<form  >
				<label for="firstName"><b>Prénom</b></label>
				<input
					id="firstName"
					type="text"
					placeholder="Entrer votre prénom"
					name="firstName"
					required
					title="Les chiffres et les caractères spéciaux ne sont pas acceptés."
					v-model ="form.firstName"
					@change = "checkFirstName()"
				/><div v-if ="errFirstName"><span  >Prénom incorrect.</span></div>
				
				<label for="name"><b>Nom</b></label>
				<input 
					
					id="name"
					type="text"
					placeholder="Entrer votre nom"
					name="name"
					required
					title="Les chiffres et les caractères spéciaux ne sont pas acceptés."
					v-model ="form.name"
					@change = "checkName()"
				/>
				<div v-if ="errName"><span>nom incorrect</span></div>
				<label for="email"><b>Email</b></label>
				<input
					id="email"
					type="email"
					placeholder="Entrer votre email"
					name="email"
					required
					v-model = "form.email"
					@change = "checkEmail(), checkAdmin()"
					
				/>
				<div v-if ="errEmail"><span>Email incorrect</span></div>
				<label for="password"><b>Mot de passe</b></label>
				<input 
					id="password"
					type="password"
					placeholder="Entrer votre mot de passe"
					name="password"
					required
					title="Votre mot de passe doit contenir 6 caratères minimum dont un chiffre et une lettre les caractères spéciaux ne sont pas acceptés."
					v-model = "form.password"
					@change = "checkPassword()"
				/>
				<div v-if ="errPassword"><span>Le mot de passe doit contenir au minimum  </span><br><span>6 caractères dont au moins un chiffre.</span></div>
				<button class="btn_signup"
				@click="postFormSignup()"
				@click.prevent="redirect"
				> Créer un compte</button>
				
				
			</form>									
		</section>
	</div>
</template>
 

<script >
import axios from 'axios'
import router from '../router';

const regexFirstName = new RegExp("[a-zA-Z éèêûëïôö -]{2,25}$");
const regexName = new RegExp("[a-zA-Z éèêûëïôö -]{2,25}$");
const regexEmail = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9]+[.]{1}[a-z]{2,3}$");
const regexPassword = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#)(+-?&^_-]{6,30}$/);
					

export default{
name: 'Signup',	
	data(){
		return {
			form:{
			firstName: '',
			name: '',
			email: '',
			password: '',
			admin: Boolean, 
			
			},
			errFirstName: '',
			errName: '',
			errEmail: '',
			errPassword: '' 
		}
	},
	

	// Regex forms
	methods: {
		checkFirstName(){
			if(regexFirstName.test(this.form.firstName)){
				this.errFirstName = false;
			}else{
				this.errFirstName = true;
				console.log('erreur de saisie');
			}
			return this.errFirstName; 
		},

		checkName(){
			if(regexName.test(this.form.name)){
				this.errName = false;
				
			}else{
				this.errName = true;
				console.log('erreur de saisie');
			}
			return this.errName;
		},

		checkEmail(){
			if(regexEmail.test(this.form.email)){
				this.errEmail = false;				
			}else{
				this.errEmail = true;
				console.log('erreur de saisie');
			}
			return this.errEmail;
			},

		checkPassword(){
			if(regexPassword.test(this.form.password)){
				this.errPassword = false;
				
			}else{
				this.errPassword = true;
				console.log('erreur de saisie');
			}
			return this.errPassword;
		},

		checkAdmin(){
			if(this.form.email === 'admin@groupomania.fr'){
				this.form.admin = true;
			}else{
				this.form.admin = false; 
			}
			return this.form.admin; 
		},

		// Axios post
		postFormSignup(){
		// Verification des input avant envoie du formulaire
		if(this.errFirstName === false && this.errName === false, this.errEmail === false && this.errPassword === false){
		const token = ''; 
		axios.post('http://localhost:3000/api/auth/signup',{
			
			firstName: this.form.firstName,
			name: this.form.name,
			email: this.form.email,
			password: this.form.password,
			admin: this.form.admin, 
			},
			{
				
			})
			.then(()=> {
			  alert('Votre compte est crée, vous pouvez dès à présent vous connecter');
			  this.$router.push('/');
	 
			}).catch((error)=>{
              console.log(error)});
	  	 }else{
			alert('Erreur dans la saisie du formulaire, veuillez respecter le format.');
		 }
	   }
	  }
	}	
		
	

	

</script>

<style scoped>
.sec_signup {
	display: flex;
	justify-content: center;
	height: 100%;
	width: 0 auto;
	
}
.btn_signup {
	cursor: pointer;
	padding: 7px;
	transition: 0.5s;
	border: solid 0.5px #fd2d01;
	background-color: #ffd7d7;
	color: black;
	letter-spacing: 0.1em;
	border-radius: 7px;
}

.btn_signup:hover {
	background: #fd2d01;
	color:white;
	text-shadow: 1px 0 0 currentColor;
	border: 0.5px solid #fd2d01;
	
}


input {
	margin-top: 5px;
	display: flex;
	height: 35px;
	width: 30vw;
	min-width: 200px;
	border-radius: 5px solid black;
	margin-bottom: 10px;
}

 span{
	
	font-size: 14px;
	color:#fd2d01;
}


input:focus {
	outline-color: #ffd7d7;
}


</style>