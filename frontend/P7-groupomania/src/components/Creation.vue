<template>
<!-- Création des publications -->
    <div class="article ">
        <h3 class="actuality mt-5">File d'actualité</h3>
        <div class="form-floating border shadow-sm p-2 mb-5 bg-white rounded mt-5">
            <div class="helloUser">
                 <p class="opacity-60 ">Quoi de neuf aujourd'hui {{firstName}} ?</p>
            </div>
         <textarea v-model="postUser" class="form-control p-2"></textarea>
            <div  class="imageUser">
                <img class="imgPost" :src="previewImage" />
             </div>
       
         <div class="space-between ">
            <label for="file" class="btn btn-primary w-5">
                <input id="file" hidden type="file"  accept="image/*" @change="uploadImage($event)">Ajouter une image</label>
             
            <button type="sumbit" @click="clickPost(userId, )"
             class="btn btn-success mt-1 ml-auto 0 float-end" >Publier</button>
         </div>
     </div>
  
   </div>
   <Post/>
    
 
</template>


<script>
import axios from 'axios';
import Post from './Post.vue';

export default{
    name: "Creation",
 
    data() {
        return {
            firstName: sessionStorage.getItem("firstName"),
            lastName: sessionStorage.getItem("name"),
            postUser: '',
            postSend: null,
            previewImage: null,
            likes: 0,
            userLiked: [],
            file: null,
        };
    },
    methods: {
        // Permet de lire le contenu de l'image et de stocker la valeur dans this.file
        uploadImage(e) {
      const image = e.target.files[0]; 
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e => {
        this.previewImage = e.target.result;
        }
       this.file = image; 
       
    }, 
   
   
    
        // Création d'une publication
        clickPost() {
            let formData = new FormData();
            const token = sessionStorage.getItem('token');
            const userId = sessionStorage.getItem('userId'); 
            if (this.postUser != "" ) {
                this.postSend = this.postUser;
                this.postUser = "";
                formData.append('firstName', this.firstName),
                formData.append('name', this.lastName),
                formData.append('userId', userId),
                formData.append('message', this.postSend),
                formData.append('image', this.file),
                formData.append('date', this.date()),
                formData.append('likes', this.likes),
                formData.append('usersLiked', this.usersLiked),
                
                axios.post(`http://localhost:3000/api/articles`, formData,  {

                    headers : 
                        {'Content-Type': 'multipart/formdata' ,
                        authorization: `Bearer ${token}`,
                        userId
                   }
                })
                    .then((response) => {
                    console.log(response.data.message);
                }).catch((error) => {
                    (console.log(error));
                });
                // reload
                this.$router.go(); 
            }
            else {
                this.postUser = 'Veuillez renseigner votre message...'
            }
        },
        // Fonction pour afficher la date des publications 
        date() {
            let d = new Date();
            let hours = d.getHours() + ":" + (d.getMinutes()<10?'0':'') + d.getMinutes();
            let today = new Date().toLocaleDateString();
            return today + " à " + hours;
        },
       
    },
    components: { Post }
}

</script>

<style scoped>

.article{
    height: auto;
    width: auto;
    min-width:250px;
    max-width: 600px;
    display:flex;
    flex-direction: column;
}

.actuality{
    font-weight: normal;
    padding-bottom: 5px;
    color: #fd2d01;
    border-bottom: solid 1px rgba(34, 32, 34, 0.2);
}
.helloUser{
    height: auto;
    width:100%;
}



.imgPost{
    margin-top: 10px;
    max-width:100%;
    height:300px;
    background-size: cover center; 
    
    
}

.form-floating{
    display: flex;
    align-items: center;
    flex-direction: column;
    min-width: 270px;
    max-width: 600px;
    min-height: 200px;
    max-height:auto;

}

.space-between{
    margin-top: 5px;
    height:50px;
    width:100%;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    
}


textarea{
    resize: none;
    min-width: 200px;
    
}
.form-control:focus {
        border-color: #ffd7d7;
        box-shadow: 0 0 0 0.2rem rgba(255, 215, 215, 0.3);
    } 
.btn{
    font-size: 12px;
    height:30px;
}



.imagePost{
    margin-top: 10px;
    width: 100%;
    max-height:300px;
    display: flex;
    justify-content: flex-start;  
}

.card{
    border: none;
    height: auto;
    padding: 0;
    margin-bottom: 15px;

}
.username{
    margin: 0;
    padding: 2px 0px 2px 1px;
    color:#fd2d01;
    opacity: 0.6;
}
.date{
    margin: 0;
    font-size: 12px;
    padding: 2px 0px 2px 1px;
    
}
.userAction{
    width:100%;
    height:20px;
    display: flex; 
    align-items: center;  
}

.comment{
    display:flex;
    width:100%;
    justify-content: flex-end;
}

.far:hover{
    cursor:pointer;
}
.fa-thumbs-up{
    margin-right: 20px;
}

.fa-thumbs-up:hover{
    color: green;
 
    
}
.fa-thumbs-down:hover{
    color:#fd2d01;    
}

.fa-comment:hover{
    color:blue
}

</style>