<template>
  <div id="app">
    <div class="header flex space-between align-center">
        <router-link class="link" to="/">
          <i class="fas fa-home"></i>
          <!-- Home -->
        </router-link> 
        <h1>PROJIFY</h1>
      <div class="nav flex">
        <!-- <router-link class="link" to="/board">
          <i class="fas fa-border-all"></i>
          Board
        </router-link>  -->
        <router-link class="link" to="/u"><i class="fas fa-border-all"></i> Boards</router-link> 
        <a href="#" class="link" @click="loginModal">Login</a>
        <a href="#" class="link" @click="signupModal">Signup</a>
      </div>
    </div>
    <user-login v-if="isLoginModal" @closeUserLogin="isLoginModal=!isLoginModal" @openUserSignup="signupModal"></user-login>
    <user-signup v-if="isSignupModal" @closeUserSignup="isSignupModal=!isSignupModal" @openUserLogin="loginModal"></user-signup>
    <router-view/>
  </div>
</template>

<script>
  import userLogin from './components/userLogin.vue';
  import userSignup from './components/userSignup.vue';

  import {eventBus} from "./services/event-bus.service.js";


  export default {
    data() {
      return {
        isLoginModal: false,
        isSignupModal: false,
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
      },
    },
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
