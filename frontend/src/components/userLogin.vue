<template>
  <section class="user-login">
    <div class="login-container">
      <button class="btn-close" @click="close">&times;</button>
      <h1 class="login-title">Login</h1>
      <!-- <div v-if="loggedinUser">
          <h3>Currently logged as: {{loggedinUser.username}}</h3>
          <button @click="logout">Logout</button>
      </div> -->
      <!-- v-else -->
      <form @submit.prevent="login">
        <input type="text" placeholder="Username" required/>
        <input type="password" placeholder="Password" required/>
        <button class="btn-login">Login</button>
      </form>
      <hr>
      <div class="bottom-text">
        <p>Not registered yet ?</p>
        <p class="new-account-text" @click="openSignupModal">Create new account</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
    name: 'user-login',

    methods: {
       close() {
            this.$emit('closeUserLogin');
        },
        openSignupModal() {
          this.$emit('openUserSignup');
          this.close();
        }
    }
}
</script>

<style>

</style>