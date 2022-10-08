<!-- Création du footer -->
<template>
    <footer>
        <p>Copyright © 2022. Tous droits reservés. <span>Groupomania.</span></p>
    </footer>
</template>

<script>
export default{
    name: 'Footers'
}
</script>

<style scoped>

footer{
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 50px;
    width:100vw;
    position:absolute;
    left: 0;
    bottom: 0;
    margin-top: 50px;
    background-color:  #fd2d01;
}

footer p {
    font-size: 16px;
    color: rgba(255, 215, 215, 0.9); 
}
span{
    font-size: 18px;
    color: white;
    font-weight: 400;
}

@media screen and (max-width: 500px){
    footer{
        text-align: left;
    }
    footer p{
        font-size: 12px;
    }
    span{
        font-size: 14px;
    }
}


</style> 
