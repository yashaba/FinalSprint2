<template>
  <section class="user-login">
    <div class="login-container">
      <button class="btn-close" @click="close">&times;</button>
      <h1 class="login-title">Login</h1>
      <!-- <div v-if="loggedinUser">
          <h3>Currently logged as: {{loggedinUser.username}}</h3>
          <button @click="logout">Logout</button>
      </div>-->
      <!-- v-else -->
      <form @submit.prevent="doLogin">
        <input type="text" placeholder="Email" required v-model="loginCred.userName" />
        <input type="password" placeholder="Password" required v-model="loginCred.password"/>
        <button class="btn-login">Login</button>
      </form>
      <hr />
      <div class="bottom-text">
        <p>Not registered yet ?</p>
        <p class="new-account-text" @click="openSignupModal">Create new account</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "user-login",
  data() {
    return {
      loginCred: {
        userName: "dani@tt.com",
        password: "12345",
      },
    };
  },

  methods: {
    close() {
      this.$emit("closeUserLogin");
    },
    openSignupModal() {
      this.$emit("openUserSignup");
      this.close();
    },
    async doLogin() {
      const cred = this.loginCred
      if(!cred.userName || !cred.password) return this.msg = 'Please enter user/password'
      await this.$store.dispatch({type :'login', userCred:cred})
      this.loginCred = {};
    },   
  }
};
</script>

<style>
</style>