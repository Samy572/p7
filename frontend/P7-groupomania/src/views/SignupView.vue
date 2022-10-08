
<template>
<body>
	<NavbarForm/>
	<div class="groupomaniaTitle">
			<h1>
				<img
					src="../components/icons/logo.JPG"
					id="logo"
					alt="logo groupomania"
				/>Groupomania
			</h1>
		</div>

		<h2>Bienvenue sur le réseau social<br />de votre entreprise.</h2>

		<Signup/>
		
	</body>
</template>



<script>
	import Signup from '@/components/Signup.vue'
	import NavbarForm from '@/components/NavbarForm.vue'
	import Footers from '../components/Footers.vue';
	
		export default{
			components: { Signup, NavbarForm, Footers }
		}
	
	
</script>

<style scoped>

body{
	height:120vh;
	padding: 0 2rem;
}
.groupomaniaTitle {
	height: auto;
	width:100%;
	justify-content: center;
	padding-bottom: 5px;
	border-bottom: 1px solid black;
}

nav {
	height: auto;
	display: flex;
	justify-content: flex-end;
}



img {
	height: 45px;
	margin-right: 20px;
	margin-top: 10px;
}

h1 {
	display: flex;
	height: 80px;
	font-size: 50px;
	align-items: center;
	justify-content: center;
	color: #fd2d01;
	text-align: center;
}

.login_signup {
	height: 100%;
	display: flex;
	justify-content: space-around;
	align-items: flex-end;
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



h2 {
	margin: 50px 0;
	text-align: center;
	color: #fd2d01;
	line-height: 2em;
}

/* Partie form */


@media screen and (max-width: 500px) {
	h1 {
		font-size: 25px;
	}
  h2{
    font-size: 16px;
  }
 
}
</style>
