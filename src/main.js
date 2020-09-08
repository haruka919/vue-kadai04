import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

const config = {
  apiKey: 'AIzaSyAYvflwGz0YqDWATdh3ewhHlv_WOkSk2ZQ',
  authDomain: 'vue-nagesen.firebaseapp.com',
  databaseURL: 'https://vue-nagesen.firebaseio.com',
  projectId: 'vue-nagesen',
  storageBucket: 'vue-nagesen.appspot.com',
  messagingSenderId: '289164813474'
}

firebase.initializeApp(config)

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
