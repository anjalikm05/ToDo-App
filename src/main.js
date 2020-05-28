import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { store } from './store/store'
import Vuetify from 'vuetify/lib';
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import alertCmp from './components/shared/alert.vue'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.component('app-alert', alertCmp)

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: "AIzaSyDOFzS9zacLiPMrWLIDs8IqbLfmCm0fqVg",
      authDomain: "todo-app-anjalikm05.firebaseapp.com",
      databaseURL: "https://todo-app-anjalikm05.firebaseio.com",
      projectId: "todo-app-anjalikm05",
      storageBucket: "todo-app-anjalikm05.appspot.com",
      messagingSenderId: "210282142582",
      appId: "1:210282142582:web:e1db4dd5816ebe391a7857",
      measurementId: "G-5XWT4Z0HDW"
    })
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.$store.dispatch('autoLogin', user)
      }
    })
    this.$store.dispatch('loadtodo')
  }
}).$mount('#app')
