<template>
  <section class="user-signup">
    <div class="signup-container">
      <button class="btn-close" @click="close">&times;</button>
      <h1 class="signup-title">Signup</h1>
      <!-- <div v-if="loggedinUser">
            <h3>Currently logged as: {{loggedinUser.username}}</h3>
            <p>Please logout first</p>
            <button @click="logout">Logout</button>
      </div>-->
      <!-- v-else -->
      <form @submit.prevent="doSignup">
        <input type="text" placeholder="Full name" v-model="signupCred.fullName" required />
        <input type="text" placeholder="Email" v-model="signupCred.userName" required />
        <!-- <input type="password" placeholder="Password" v-model="signupCred.password" required/> -->
        <input
          type="password"
          placeholder="Confirm your password"
          v-model="signupCred.password"
          required
        />
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
  name: "user-signup",
  data() {
    return {
      signupCred: {
        userName: "dani@tt.com",
        password: "12345",
        fullName: "dani",
        imgUrl: ""
      }
    };
  },

  methods: {
    close() {
      this.$emit("closeUserSignup");
    },
    openLoginModal() {
      this.$emit("openUserLogin");
      this.close();
    },
    doSignup() {
      // debugger
      const cred = this.signupCred;
      if (!cred.fullName || !cred.password || !cred.userName)
        return (this.msg = "Please fill up the form");
      this.$store.dispatch({ type: "signup", userCred: cred });
    }
  }
};
</script>

<style>
</style>