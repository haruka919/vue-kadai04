<template>
  <div class="container my-5">
    <nav class="navbar is-transparent">
      <div id="navbarExampleTransparentExample" class="navbar-menu">
        <div class="navbar-start">
          <p class="is-size-5">さんようこそ！！</p>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="is-size-5">残高：</p>
              <p class="control">
                <a class="button is-primary" href="/logout">ログアウト</a>
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
              <td></td>
              <td><button type="button" class="ml-2 button is-small is-primary">walletを見る</button></td>
              <td><button type="button" class="ml-2 button is-small is-primary">送る</button></td>
            </tbody>
        </table>

        <div class="modal">
          <div class="modal-background"></div>
          <div class="modal-card mt-6">
            <section class="modal-card-body">
              <p>あなたの残高</p>
              <p>2000</p>
            </section>
            <footer class="modal-card-foot">
              <button class="button is-danger">close</button>
            </footer>
          </div>
        </div>

        <p class="is-size-7">Copyright©️2019 inc.All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register'
}
</script>
