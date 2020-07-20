<template>
  <div id="app">
    <div id="nav" class="flex space-between align-center">
      <h1>Logo</h1>
      <div class="flex">
        <router-link to="/">Home</router-link> |
        <router-link to="/board">Board</router-link> |
        <router-link to="/u">Dashboard</router-link> |
        
        <div class="link" @click="loginModal">Login</div> |
        <div class="link" @click="signupModal">Signup</div>
      </div>
    </div>
    <user-login v-if="isLoginModal"></user-login>
    <user-signup v-if="isSignupModal"></user-signup>
    <router-view/>
  </div>
</template>

<script>
  import userLogin from './components/userLogin.vue';
  import userSignup from './components/userSignup.vue';

  export default {
    data() {
      return {
        isLoginModal: false,
        isSignupModal: false
      }
    },
    components: {
      userLogin,
      userSignup
    },

    methods: {
      loginModal() {
        this.isLoginModal = true;
      },
      signupModal() {
        this.isSignupModal = true;
      }
    }
}
</script>

<style lang="scss">
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  // // text-align: center;
  // color: #2c3e50;
}

#nav {
  // padding: 30px;

  // a {
  //   font-weight: bold;
  //   color: #a09c9c;

  //   &.router-link-exact-active {
  //     color: #f5f4f4ce;
  //   }
  // }

  // .link {
  //     font-weight: bold;
  //     color: #a7a3a3e7;

  //     &:active {
  //       color: #f1f1f1c2;
  //     }
  // }
}
</style>
