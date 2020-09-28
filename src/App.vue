<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import firebase from 'firebase'
import { mapActions } from 'vuex'
export default {
  created () {
    // 現在ログインしているユーザーを取得
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setLoginUser(user)
        this.$router.push({ name: 'Home' }).catch(() => {})
      } else {
        this.deleteLoginUser()
        if (this.$router.currentRoute.name === 'Home') {
          this.$router.push({ name: 'Login' })
        }
      }
    })
  },
  methods: {
    ...mapActions(['setLoginUser', 'deleteLoginUser'])
  }
}
</script>
<style lang="scss">
@import '../node_modules/bulma/bulma.sass';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
