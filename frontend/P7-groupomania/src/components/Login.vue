<!-- Formulaire login -->

<template>
	<div id ="login">
		
		<section class="sec_login" >
			<form class="app_login">
		
				<label for="email"><b>Email</b></label>
				<input 
					id="email"
					type="email"
					placeholder="Entrer votre email"
					name="email" required
					v-model ="form.email"
					@change ="checkEmail"
					
				/>
				<label for="password"><b>Mot de passe</b></label>
				<input 
					id="password"
					type="password"
					placeholder="Entrer votre mot de passe"
					name="password" required
					v-model ="form.password"
					@change="checkPassword"
				/>
				<div v-if="errLogin">
					<span>Paire email mot de passe incorrect.</span>
				</div>
				<button class="btn_login" 
				type="submit" 
				@click ="loginForm()"
				@click.prevent="redirect"
				
				>Se connecter</button>
			</form>
		</section>
   </div>
</template>




<script >
import axios from 'axios'
const regexEmail = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9]+[.]{1}[a-z]{2,3}$");
const regexPassword = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#)(+-?&^_-]{6,30}$/);

export default{
	name: 'Login',
	
		data(){
		return {
			form:{
			email: '',
			password: '',
			
			},
			errEmail: '',
			errPassword: '',
			errLogin: false,
			
		}
	},

	// Vérification des input
	methods: {
			checkEmail(){
			if(regexEmail.test(this.form.email)){
				this.errEmail = false;
				
			}else{
				this.errEmail = true;
				console.log('erreur de saisie');
			}
			return this.errEmail
			
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
		// Connexion recupération du token de l'id et prénom puis redirection vers la page home
		loginForm(){
			if(this.errEmail === false && this.errPassword === false){
				axios.post('http://localhost:3000/api/auth/', {
							
					email: this.form.email,
					password: this.form.password,
					
				})
				.then(function (response){
					sessionStorage.setItem('userId', response.data.userId)
					sessionStorage.setItem('token', response.data.token)
					sessionStorage.setItem('firstName', response.data.firstName)
					sessionStorage.setItem('name', response.data.name)
					sessionStorage.setItem('admin', response.data.admin); 
					
				}).then(()=>{
					this.$router.push('/home');
				})
			
			}else{
				this.errLogin = true;
				}
		}
	},
	

}

</script>




<style scoped>


.sec_login {
	height: 100%;
	display: flex;
	justify-content: space-around;
	align-items: flex-end;
	
}

form{
	height:auto;
}

ul {
	margin-top: 20px;
	display: inline-flex;
	flex-wrap: nowrap;
	margin-bottom: 5px;
	list-style: none;
}



a {
	text-decoration: none;
}

.sec_signup {
	display: flex;
	justify-content: center;
	height: 100%;
	width: 0 auto;
}

h2 {
	margin: 100px 0;
	text-align: center;
	color: #fd2d01;
	line-height: 2em;
}



.btn_login{
	cursor: pointer;
	padding: 7px;
	transition: 0.5s;
	border: solid 0.5px #fd2d01;
	background-color: #ffd7d7;
	color: black;
	letter-spacing: 0.1em;
	border-radius: 7px;
}

.btn_login:hover {
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

input:focus {
	outline-color: #ffd7d7;
}
div span{
	color:#fd2d01;
	font-size: 12px;
}


</style>
