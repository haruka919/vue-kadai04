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
                <td><button type="button" class="ml-2 button is-small is-primary" @click="openSendModal(user)">送る</button></td>
              </tr>
            </tbody>
        </table>

        <div class="modal" :class="{'is-active': isOpenWalletModal}">
          <div class="modal-background" @click="closeWalletModal"></div>
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

        <div class="modal" :class="{'is-active': isOpenSendModal}">
          <div class="modal-background" @click="closeSendModal"></div>
          <div class="modal-card mt-6">
            <section class="modal-card-body">
              <p>あなたの残高：{{ loginUser.wallet }}<br>送る金額</p>
              <input class="input" type="number" v-model="money">
            </section>
            <footer class="modal-card-foot">
              <button class="button is-danger" @click="sendMoney()">送信</button>
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
      isOpenWalletModal: false,
      isOpenSendModal: false,
      targetUser: {
        id: '',
        displayName: '',
        wallet: '',
      },
      money: ''
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
    },
    openWalletModal (targetUser) {
      this.isOpenWalletModal = true,
      this.targetUser.displayName = targetUser.displayName
      this.targetUser.wallet = targetUser.wallet
    },
    closeWalletModal () {
      this.isOpenWalletModal = false
      this.targetUser.displayName = ''
      this.targetUser.wallet = ''
    },
    openSendModal (targetUser) {
      this.isOpenSendModal = true,
      this.targetUser.id = targetUser.id
      this.targetUser.wallet = targetUser.wallet
    },
    closeSendModal () {
      this.isOpenSendModal = false
      this.targetUser.id = ''
      this.targetUser.wallet = ''
    },
    sendMoney () {
      if (this.targetUser.id !== this.loginUser.id) {
        const loginUserWallet = Number(this.loginUser.wallet) - Number(this.money)
        const targetUserWallet = Number(this.targetUser.wallet) + Number(this.money)
        this.$store.dispatch('sendMoney', { loginUserWallet, targetUserId: this.targetUser.id, targetUserWallet })
        .then(() => {
          this.closeSendModal();
        })
      } else {
        alert('自分自身には送金できません')
      }
    }

  }
}
</script>
<style scoped>
.modal-card-body {
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
.modal-card-foot {
  justify-content: flex-end;
}
</style>