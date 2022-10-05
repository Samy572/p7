<template>
     <!--  Modal modifier la publication -->
    
     <div  class="modal fade" id="modal"  role="dialog">
                     <div class="modal-dialog" role="document">
                        
                         <div class="modal-content" >
                                <div class="modal-header">
                                     <h5 class="modal-title">Modifier votre publication</h5>
                                    <button  type="button" class="close btn-close" data-bs-dismiss="modal" aria-label="Close">
                                    </button>
                                </div>
                                 <div class="modal-body">
                                    <textarea v-model="postUserModify" class="form-control p-2"></textarea>
                                     <div v-if ="this.prevImage != undefined" class="imageUser d-flex justify-content-center ">
                                        <img class="imgPost" :src="prevImage" />
                                     </div>
                                 </div>
                                     <div class="modal-footer">
                                        <label for="modifyFile" class="btn btn-primary w-5">
                                        <input id="modifyFile" hidden type="file" accept="image/*"
                                         @change="modifyImg($event)">
                                         Modifier une image</label>
                                         
                                         <button type="button" class="btn btn-success"
                                         @click="modifyArticle()
                                         " data-bs-dismiss="modal"
                                         ><span class="d-none">{{card._id}}</span>Sauvegarder les modifications</button>
                                     </div>
                          </div>
                        </div>
                    </div>
</template>

<script>
import axios from 'axios';

export default {
  
   name: 'ModifyPost',
   props: {
    card: {
        type: Object, 
        _id: '',
    }
   },
   data () {
    return{
        prevImage: undefined,
            modifyFile: null,
            postUserModify: "",
            
    }
   },
   methods: {
       // Modifier une image
       modifyImg(e) {
            const image = e.target.files[0];
            const readFile = new FileReader();
            // Permet de lire le contenu de l'image
            readFile.readAsDataURL(image);
            readFile.onload = e => {
                this.prevImage = e.target.result;
            };
        },

        // Envoyer la modification
        modifyArticle() {
            const token = sessionStorage.getItem('token');
            const userId = sessionStorage.getItem('userId'); 
            let formData = new FormData();
            if (this.postUserModify != "" && this.prevImage != undefined) {
                    formData.append('id', sessionStorage.getItem('id')),
                    formData.append("message", this.postUserModify),
                    formData.append('image', this.prevImage),
                    console.log('cas modification de l image et du texte');
                    axios.put("http://localhost:3000/api/articles/" +sessionStorage.getItem('id'), formData, {
                        headers : 
                        {'Content-Type': 'multipart/formdata' ,
                        authorization: `Bearer ${token}`,
                        userId
                   }
                    });
            }else if (this.postUserModify != "" && this.prevImage === undefined){
                formData.append("message", this.postUserModify),
                console.log("cas modification du texte de la publication");
                axios.put("http://localhost:3000/api/articles/" +sessionStorage.getItem('id'), formData, {
                    headers : 
                        {'Content-Type': 'multipart/formdata' ,
                        authorization: `Bearer ${token}`,
                        userId
                   }
                });
            }else if(this.prevImage != undefined && this.postUserModify === ""){
                formData.append("image", this.prevImage),
                console.log('cas modification de l image de la publication');
                axios.put("http://localhost:3000/api/articles/" +sessionStorage.getItem('id'), formData, {
                    headers : 
                        {'Content-Type': 'multipart/formdata' ,
                        authorization: `Bearer ${token}`,
                        userId
                   }
                
                });
            }
        
           this.prevImage = undefined;
           this.postUserModify = "";
           this.$router.go(); 
        },
        
   },
   
   
}
</script>

<style scoped>
    textarea{
    resize:none; 
}
.imgPost{
    margin-top: 10px;
    max-width:100%;
    height:300px;
    background-size: cover center; 

}
.form-control:focus {
        border-color: #ffd7d7;
        box-shadow: 0 0 0 0.2rem rgba(255, 215, 215, 0.3);
    } 

.modal-footer{
    display: flex;
    width:100%;
    justify-content: space-between;
}
@media screen and (max-width: 500px){
    .modal-footer{
        display:flex;
        align-items: center;
        justify-content: center;
    }
   
}
</style>