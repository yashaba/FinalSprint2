<template>
  <div id="app">
    <div v-if="!navbarMobile" class="header flex space-between align-center">
        <router-link class="link" to="/">
          <i class="fas fa-home"></i>
          <!-- Home -->
        </router-link> 
        <router-link to="/" class="logo">
          <h1>PROJIFY</h1>
        </router-link>
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

    <div v-else>
      <div @click="toggleNavbarMobile" class="mobile-navbar menu-button">
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
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
        navbarMobile: false
      }
    },
    components: {
      userLogin,
      userSignup
    },

    methods: {
      toggleNavbarMobile() {
        this.navbarMobile = !this.navbarMobile
      },
      loginModal() {
        this.isLoginModal = true;
      },
      signupModal() {
        this.isSignupModal = true;
      },
      // extractBackgroundImageFromRoute(path) {
      //   const imageMap = {
          // '/': '/img/aerial-of-photo-of-forest-and-body-of-water-2876520.4138ab26.jpg',
        //   '/u': 
        //   '/board': 
        //   '/board/5f15f93ac4ad519b6bee5d9e': '/img/aerial-of-photo-of-forest-and-body-of-water-2876520.4138ab26.jpg'
        // };

    //     document.body.style.backgroundImage = `url(${imageMap[path]})`;
    //   }
    // },

    // watch: {
    //   '$route.path': function (path) {
    //     this.extractBackgroundImageFromRoute(path);
    //   }
    // },

    // created() {
    //     this.extractBackgroundImageFromRoute(this.$route.path);
    // }
}
  }
</script>

<style lang="scss">
  .menu-button {
    display: none;
}

@media (max-width: 770px) {
 .menu-button {
        display: inline-block;
        cursor: pointer;
        margin-right: 10px;
        margin-top: 15px;
        position: relative;
        z-index: 200;
    }
    .bar1, .bar2, .bar3 {
        width: 28px;
        height: 3px;
        background-color: black;
        margin: 5px 0;
    }
}
</style>
