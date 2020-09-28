<template>
  <div class="container my-5">
    <nav class="navbar is-transparent">
      <div id="navbarExampleTransparentExample" class="navbar-menu">
        <div class="navbar-start">
          <p class="is-size-5">{{ loginUser.displayName }}さんようこそ！！</p>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="is-size-5">残高：{{ loginUser.wallet }}</p>
              <p class="control">
                <button class="button is-link is-outlined" @click="logout">ログアウト</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="columns">
      <div class="column is-4 is-offset-4">
        <img alt="Vue logo" src="../assets/logo.png">
        <h1 class="mb-3 title">ユーザー一覧</h1>
        <h2 class="mb-3 title is-size-5">ユーザー名</h2>
        <table class="table is-fullwidth">
            <thead>
              <tr>
                <th>ユーザー名</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="user in users"
                :key=user.id>
                <td>{{ user.displayName }}</td>
                <td><button type="button" class="ml-2 button is-small is-primary" @click="openWalletModal(user)">walletを見る</button></td>
                <td><button type="button" class="ml-2 button is-small is-primary">送る</button></td>
              </tr>
            </tbody>
        </table>

        <div class="modal" :class="{'is-active': isOpen}">
          <div class="modal-background"></div>
          <div class="modal-card mt-6">
            <section class="modal-card-body">
              <p>{{ targetUser.displayName }}さんの残高</p>
              <p>{{ targetUser.wallet }}</p>
            </section>
            <footer class="modal-card-foot">
              <button class="button is-danger" @click="closeWalletModal">close</button>
            </footer>
          </div>
        </div>

        <p class="is-size-7">Copyright©️2019 inc.All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Register',
  computed: mapGetters(['loginUser', 'users']),
  data () {
    return {
      isOpen: false,
      targetUser: {
        displayName: '',
        wallet: ''
      }
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
    },
    openWalletModal (targetUser) {
      this.isOpen = true,
      this.targetUser.displayName = targetUser.displayName
      this.targetUser.wallet = targetUser.wallet
    },
    closeWalletModal () {
      this.isOpen = false
      this.targetUser.displayName = ''
      this.targetUser.wallet = ''
    }
  }
}
</script>
