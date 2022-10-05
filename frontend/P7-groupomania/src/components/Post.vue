<template>
    <section>
        
        <!-- Publication -->
        <div  
         :key ="index" v-for ="(result, index) in result"
          class="card shadow-sm p-2"  >
             <div class="cardTxt">
                <button class="btnn-delete"
                title ="supprimer"
                @click ="deleteCard(result._id, result.userId )"
                v-if ="( result.userId === this.userId || this.admin != 'false')"
                 type="button">+</button>

                 <button
                 title ="modifier"
                 class="btnn-modify"
                 data-bs-toggle="modal"
                 data-bs-target ="#modal"
                 @click="saveId(result._id)"
                 v-if ="( result.userId === this.userId || this.admin != 'false')" 
                 >...</button>
                 <!--  Modal modifier la publication -->
                <ModifyPost :card="result" />

                <!-- Publication -->

                <p class="username">{{result.firstName}} {{result.name}} </p>
                <p class=" date fst-italic ">Publié le {{result.date}} </p>
                <p id="message">{{result.message}}</p>
              </div>
              
                    <img v-if ="result.image != ''" :src="result.image" >
             
                <div class="userAction">

                   <button id="liked" @click="likeDislike(result.userId, result._id, result.likes, articleId)" class="btnn likeDislike">J'aime <font-awesome-icon class="like far" title="J'aime" icon="fa-regular fa-thumbs-up" /><span  class="incrementation">{{ result.likes }}</span> 
                   </button>
                  
                   <!-- Commentaires -->

                  <div class="comment" >
                        <button title ="commenter" :key ="result._id" class="btnn" @click="dropDown(result._id)" >
                            <font-awesome-icon class ="fa-comment far" icon="fa-regular fa-comment" />
                        </button>
                  </div> 
                </div>
             
                <div class="comment  " :key="result._id" v-if=" result._id === this.idComment && this.activeComment === true " >
                    <form  class="form-comment" >
                        <label class="label-comment" for="input">
                            <div  v-for="element in commentaire" :key="element._id">
                             <div class="comment-user shadow-sm p-1 mb-3"
                             v-if="result._id === element.articleId[0]"
                             >
                                
                                <button class="btnn-delete" 
                                 title ="supprimer"
                                @click ="deleteComment(element._id, element.userId )"
                                v-if ="(element.userId === this.userId || this.admin != 'false' )"
                                type="button">+</button>
                                <div >
                                    <p class=" p-0 m-0">{{ element.firstName +' ' + element.name +' :'}}</p>
                                    <p  class="p-0 m-0 ">{{element.message}}</p>
                                </div>
                            </div>
                        </div>
                            <div class="container-inputBtn " >
                              <textarea 
                               v-model.lazy ="this.message"
                               class="comment-input form-control p-1" type="text" placeholder="Écrivez un commentaire..."></textarea>
                               <button @click.prevent="commentPost(result._id)" title ="envoyer" class="send-comment">
                                <font-awesome-icon class="paperPlane far" icon="fa-regular fa-paper-plane" />
                               </button>
                            </div>
                        </label>
                    </form>
                </div>    
        </div>
        
        
         
        
    </section>
</template>


<script>

import axios from 'axios'
import ModifyPost from './ModifyPost.vue';

export default {
    name: "Post",
    // Récupération des post et de tous les post et de tous les commentaires 
    mounted() {
        const token = sessionStorage.getItem("token");
        const userId = sessionStorage.getItem("userId");
        if (token != null) {
            console.log("connexion réussie");
            axios.get("http://localhost:3000/api/articles", {
                headers : 
                        {'Content-Type': 'application/json' ,
                        authorization: `Bearer ${token}`,
                        userId
                   },
            }).then((response) => {
                this.result = response.data;
            });
        }
        else {
            this.$router.push("/");
        }
        axios.get("http://localhost:3000/api/commentaires", {
            headers : 
                        {'Content-Type': 'application/json' ,
                        authorization: `Bearer ${token}`,
                        userId
                   },
        }).then((response) => {
            this.commentaire = response.data;
           
        });

        
    },
    data() {
        return {
            commentaire: "",
            message: "",
            image: null,
            commentSend: null,
            result: null,
            firstName: sessionStorage.getItem("firstName"),
            userId: sessionStorage.getItem("userId"),
            lastName: sessionStorage.getItem("name"),
            active: false,
            likes: 0,
            usersLiked: [],
            admin: sessionStorage.getItem("admin"),
            idComment: '',
            activeComment: false, 
            
            
        };
    },
    methods: {
        // Récupération de l'id pour la modification des publications voir component modify post
        saveId(_id){
            sessionStorage.setItem('id', _id); 
            
        },
     
        // Supprimer la publiciation
        deleteCard(_id) {
            const token = sessionStorage.getItem('token');
            const userId = sessionStorage.getItem('userId');
            axios.delete("http://localhost:3000/api/articles/" + _id, {
                headers : 
                        {'Content-Type': 'application/json' ,
                        authorization: `Bearer ${token}`,
                        userId
                   }               
            }).then(response => {
                console.log(response.data);
            });
            this.$router.go();
        },
        // Supprimer le commentaire
        deleteComment(_id) {
            const token = sessionStorage.getItem('token');
            const userId = sessionStorage.getItem('userId');
            axios.delete("http://localhost:3000/api/commentaires/" + _id, {
                headers : 
                        {'Content-Type': 'application/json' ,
                        authorization: `Bearer ${token}`,
                        userId
                   }

            })
            this.$router.go();
        },
     
    
        // Like utilisateurs
        likeDislike( articleId,  _id) {
            const token = sessionStorage.getItem('token');
            const userId = sessionStorage.getItem('userId');
            axios.post("http://localhost:3000/api/articles/" + _id + "/like", {
           
                userId: this.userId,
                likes: this.likes,
                usersLiked: this.usersLiked,
            });
        
            this.$router.go();
        },
        // Envoyer des commentaires
        commentPost(_id) {
            const token = sessionStorage.getItem("token");
            const userId = sessionStorage.getItem("userId");
            if (this.message != "") {
                this.commentSend = this.message;
                this.message = "";
                axios.post(`http://localhost:3000/api/commentaires/` + userId, {
                 
                    firstName: this.firstName,
                    name: this.lastName,
                    message: this.commentSend,
                    userId: userId,
                    articleId: _id,
                });
                this.$router.go();
            }
        },

        // Drop down pour les commentaires des publications 
        dropDown(_id){
            sessionStorage.setItem('idComment', _id); 
            this.idComment = _id ; 
            if(this.activeComment != true){
                this.activeComment = true;
               
            }else{
                this.activeComment = false; 
            }
            
        },

        
    },
    components: { ModifyPost }
   
}
  
    

</script>

 
<style scoped>
section{
    height: auto;
    display:flex;
    flex-direction: column-reverse;
    justify-content: center;
    padding-bottom: 300px;
    min-width:300px;
    width:auto;
}

.card{
    position: relative;
    border: none;
    height: auto;
    max-width: 600px;
    padding: 0;
    margin-bottom: 15px;

}
.btnn-delete {
  position:absolute;
  top:0;
  right:0;
  font-size: 18px;
  font-weight: 600;
  color:#ada7a6;
  padding:0;
  width:0;
  height:0;
  border: none;
  transform: rotate(45deg);
  cursor:pointer;
  z-index:2;
  transition: color 0.5s ease;
}

.btnn-delete:hover{
    color:#fd2d01;
}

.btnn-modify{
    position:absolute;
    top:0px;
    right:30px;
    font-size: 14px;
    font-weight: 600;
    border: none;
    color:black;
    padding:0;
    cursor:pointer;
    z-index:2;
    height: 0px;
    border-radius: transparent solid 1px;
    transition: color 0.5s ease; 
}

.btnn-modify:hover{

color: blue;
}
   

.username{
    margin: 0;
    padding: 2px 0px 2px 1px;
    color:#fd2d01;
    opacity: 0.8;
}
.date{
    margin: 0;
    font-size: 12px;
    padding: 2px 0px 2px 1px;
    
}

.userAction{
    width:100%;
    padding-top: 10px;
    height:30px;
    display: flex; 
    align-items: center;  
    
}
textarea{
    resize:none; 
}

.btnn{
    border: none;
    background-color: transparent;
    padding: 0px;
    
}

img{
    max-height:500px;
}



.likeDislike{
    display: flex;
    height:25px;
    align-items: center;
    transition: all 0.3s ease
}

.likeDislike:hover{
    color:green; 
    background-color:rgba(237, 235, 237, 0.6);
}

.comment{
    display:flex;
    width:100%;
    justify-content: flex-end;
    transition: transform 0.5s ease;   
}

.far:hover{
    cursor:pointer;
    transition: color 0.3s ease;
}
.fa-thumbs-up{
    margin-right: 5px;
    margin-left: 5px;
}
.incrementation{
    margin-right:10px;
}
.fa-thumbs-down{
    margin-left: 5px;
    margin-right: 5px;
}

.btnn-like{
    color: green;
}
.fa-thumbs-down:hover{
    color:#fd2d01;    
}

.fa-comment:hover{
    color:blue
}

.paperPlane{
    transform: rotate(55deg);
}

.label-comment{
    width:100%;
    display:flex;
    flex-direction: column;
    
}
.form-comment{
    height: auto;
    display: flex;
    width:100%;
    justify-content: space-between;
    margin-top: 15px;
    padding-top: 5px;
    border-top: solid 1px rgba(237, 235, 237, 0.2);
}
.comment-input{
    width:100%;
    border-radius: 15px;
    border: solid 1px #ada7a6;
}
.container-inputBtn{
    height: auto;
    width:100%;
    display: flex;
    justify-content: space-between;
}

.comment input:focus {
	outline-color: #ffd7d7;
}
.form-control:focus {
        border-color: #ffd7d7;
        box-shadow: 0 0 0 0.2rem rgba(255, 215, 215, 0.3);
    } 
.send-comment{
    background-color: transparent;
    border: none;
    padding: 0px 0px 0px 10px;
    
}

.send-comment:hover{
    color:blue;
}

.comment-user{
    width :100%;
    font-size: 14px;
    border: solid 1px transparent;
    border-radius: 12px;
    background-color:rgba(197, 188, 197, 0.1);
}

</style>