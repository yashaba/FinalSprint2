<template>
  <section class="user-signup">
    <div class="signup-container">
      <button class="btn-close" @click="close">&times;</button>
      <h1 class="signup-title">Signup</h1>
        <!-- <div v-if="loggedinUser">
            <h3>Currently logged as: {{loggedinUser.username}}</h3>
            <p>Please logout first</p>
            <button @click="logout">Logout</button>
        </div> -->
        <!-- v-else -->
        <form @submit.prevent="signup">
          <input type="text" placeholder="Full name" required/>
          <input type="text" placeholder="Username" required/>
          <input type="password" placeholder="Password" required/>
          <input type="password" placeholder="Confirm your password" required/>
          <button class="btn-signup">Signup</button>
        </form>
        <div class="bottom-text">
          <p>Already have an account ?</p>
          <p class="login-text" @click="openLoginModal">Login</p>
        </div>
      </div>
  </section>
</template>

<script>
export default {
    name: 'user-signup',

    methods: {
      close() {
        this.$emit('closeUserSignup');
      },
       openLoginModal() {
          this.$emit('openUserLogin');
          this.close();
        }
    }
}
</script>

<style>

</style>