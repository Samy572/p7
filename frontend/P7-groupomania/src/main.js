import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import "bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/main.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faComment, faPaperPlane, faThumbsDown, faThumbsUp } from '@fortawesome/free-regular-svg-icons'

library.add(faThumbsUp, faThumbsDown, faComment, faPaperPlane )

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)
app.use(VueAxios, axios)
app.use(router)


app.mount('#app')
import 'bootstrap/dist/js/bootstrap.js';