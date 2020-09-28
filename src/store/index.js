import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginUser: {
      displayName: null,
      wallet: null,
    },
    users: [],
  },
  getters: {
    displayName: (state) =>
      state.loginUser.displayName ? state.loginUser.displayName : null,
    wallet: (state) => (state.loginUser.wallet ? state.loginUser.wallet : null),
    users: (state) => state.users,
  },
  mutations: {
    setLoginUser(state, payload) {
      state.loginUser.displayName = payload.displayName;
      state.loginUser.wallet = payload.wallet;
    },
    deleteLoginUser(state) {
      state.loginUser.displayName = null;
      state.loginUser.wallet = null;
    },
    addUser(state, { id, user }) {
      user.id = id;
      state.users.push(user);
    },
  },
  actions: {
    fetchUsers({ commit }) {
      firebase
        .firestore()
        .collection('users')
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) =>
            commit('addUser', {
              id: doc.id,
              user: doc.data(),
            })
          );
        });
    },
    register({ dispatch }, authData) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(authData.email, authData.password)
        .then((user) => {
          // walletの初期値（500円）と表示名をusersコレクションに登録
          firebase
            .firestore()
            .collection('users')
            .doc(user.user.uid)
            .set({
              displayName: authData.displayName,
              wallet: 500,
            });
          dispatch('setLoginUser');
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
          firebase
            .firestore()
            .collection('users')
            .doc(user.uid)
            .get()
            .then((doc) => {
              commit('setLoginUser', doc.data());
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