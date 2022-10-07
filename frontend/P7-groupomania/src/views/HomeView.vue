
<template>
<body>
	
 <header>
 		<nav>
			<div class="groupomania">
				<img class="logoGroupomania" src="../components/icons/logo.JPG" alt ="Groupomania">
				<h1>Groupomania</h1>
			</div>
				<img title="Déconnexion" @click="logout" class="fasIcone" src="../components/icons/logout.svg" alt="deconnexion">
				
		</nav>
 </header>

 <main>
	<div class="container d-flex justify-content-center ">
		<Creation/>
	</div>	
 </main>
<Footers/>
 </body>  
 
</template>


<script>

  
import router from '../router';
import Footers from '../components/Footers.vue';
import Creation from '../components/Creation.vue';


export default{
    methods: {
        logout() {
            sessionStorage.clear();
            router.push({ path: "/" });
        }
    },
    components: { Footers, Creation}
}

</script>




<style scoped>

/* WelcomeUser */

body{
   min-height: 100vh;
   background-color:rgba(255, 215, 215, 0.3);
   height: auto;
   	
   
}
header{
	width:100%;
} 

nav{
	width:100%;
	height:80px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid black;
	box-shadow: 0px 1px 2px 1px #000000;
}

.groupomania{
	width:100%;
	display: flex;
	justify-content: center;
}
h1{
	margin-top: 5px;
	color:#fd2d01;
	font-weight:bold;
}

.logoGroupomania{
	margin-top: 5px;
	height:50px;
	padding:0 2px;
	z-index: -1;
}

.fasIcone{
	height:20px;
	cursor:pointer;
	padding: 0 10px;
}




main{
	min-height: 100vh;
	display:flex;
	justify-content: center;
	
	
}
.container{
	height:auto;
	width:auto;
	min-width: 500px;
	min-height: 100vh;
	display: flex;
	justify-content: center;
	flex-direction: column;
}





@media (hover: hover) {
	a:hover {
		background-color: transparent;
	}
}

@media screen and (max-width: 500px) {
	h1 {
		font-size: 25px;
	}
  .logoGroupomania{
	height:30px;
  }

  main{
	padding: 0px
  }
  .container{
	min-height:100vh;
	width:100%;
	min-width: 250px;
	display:flex;
	justify-content: center;
  }
  .fasIcone{
	height:15px;
	
  }
}
</style>