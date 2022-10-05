 <!-- Navbar -->
 <template>
   <header>
      <nav>
        <RouterLink to="/">Se connecter</RouterLink>
        <RouterLink to="/signup">S'inscrire</RouterLink>
      </nav>
   </header> 
 </template>
  
<script>
import { RouterLink, RouterView } from 'vue-router'
</script>


<style scoped>


  header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  padding-right: 2rem;
  width: 100%;
  font-size: 14px;
  text-align: right;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color:#fd2d01;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  color:black;
}

nav a:first-of-type {
  border: 0;
}

@media screen and (max-width:500px) {
  nav{
    text-align: center;
    padding:0px
  }
}
</style>