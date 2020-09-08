<template>
  <div class="container my-5">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <img alt="Vue logo" src="../assets/logo.png">
        <h1 class="mb-3 title">新規登録画面</h1>

        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">ユーザー名</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input class="input" type="text" placeholder="userName">
              </p>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">メールアドレス</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input class="input" type="email" placeholder="Email">
              </p>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">パスワード</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input class="input" type="pass" placeholder="Password">
              </p>
            </div>
          </div>
        </div>

        <button class="button is-link is-outlined">新規登録</button>
        <p class="mb-4"><a href="/login">ログインはこちらから</a></p>

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
