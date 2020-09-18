import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import router from '@/router';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginUser: {
      name: null,
      wallet: null,
    },
  },
  getters: {
    displayName: (state) =>
      state.loginUser.name ? state.loginUser.name : null,
    wallet: (state) =>
      state.loginUser.wallet ? state.loginUser.wallet.wallet : null,
  },
  mutations: {
    setLoginUser(state, payload) {
      state.loginUser.name = payload.name;
    },
    setWallet(state, payload) {
      state.loginUser.wallet = payload;
    },
  },
  actions: {
    register({ dispatch }, authData) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(authData.email, authData.password)
        .then((user) => {
          user.user.updateProfile({
            displayName: authData.displayName,
          });
          firebase
            .firestore()
            .collection('users')
            .doc(user.user.uid)
            .set({
              wallet: 500,
            });
          dispatch('setLoginUser');
          router.push('/');
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    login({ dispatch }, { email, password }) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          dispatch('setLoginUser');
          router.push('/');
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    setLoginUser({ commit }) {
      firebase.auth().onAuthStateChanged(function(user) {
        console.log(user);
        if (user) {
          commit('setLoginUser', { name: user.displayName });
          firebase
            .firestore()
            .collection('users')
            .doc(user.uid)
            .get()
            .then((doc) => {
              commit('setWallet', doc.data());
            });
        }
      });
    },
  },
});