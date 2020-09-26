import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
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
    deleteLoginUser(state) {
      state.loginUser.name = null;
      state.loginUser.wallet = null;
    },
  },
  actions: {
    register({ dispatch }, authData) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(authData.email, authData.password)
        .then((user) => {
          // walletの初期値（500円）を登録
          firebase
            .firestore()
            .collection('users')
            .doc(user.user.uid)
            .set({
              wallet: 500,
            });
          // 表示名を登録
          user.user
            .updateProfile({
              displayName: authData.displayName,
            })
            .then(() => {
              dispatch('setLoginUser');
            });
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    login({ dispatch }, authData) {
      firebase
        .auth()
        .signInWithEmailAndPassword(authData.email, authData.password)
        .then(() => {
          dispatch('setLoginUser');
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    setLoginUser({ commit }) {
      firebase.auth().onAuthStateChanged((user) => {
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
    logout() {
      firebase.auth().signOut();
    },
    deleteLoginUser({ commit }) {
      commit('deleteLoginUser');
    },
  },
});