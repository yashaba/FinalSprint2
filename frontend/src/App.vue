<template>
  <div id="app">
    <div class="navbar header space-between align-center">
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

    <div class="mobile-navbar">
      <div @click="toggleMobileNavbar" class="menu-button">
        <i class="fa fa-bars"></i>
      </div>
      <div class="mobile-menu flex column" :class="{open: mobileNavbarStatus}">
        <router-link to="/" class="mobile-menu-item" @click.native="toggleMobileNavbar">Home</router-link>
        <router-link to="/u" class="mobile-menu-item" @click.native="toggleMobileNavbar">Boards</router-link>
        <a href="#" class="mobile-menu-item" @click="loginModal(); toggleMobileNavbar()">Login</a>
        <a href="#" class="mobile-menu-item" @click="signupModal(); toggleMobileNavbar()">Signup</a>
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
        mobileNavbarStatus: false
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
      toggleMobileNavbar() {
        this.mobileNavbarStatus = !this.mobileNavbarStatus;
      }
    }
  }
</script>

<style lang="scss">
.menu-button {
    display: none;
}

.navbar {
  display: flex;
}

.mobile-navbar {
  display: none;
}

@media (max-width: 770px) {
  .navbar {
    display: none;
  }

  .mobile-navbar {
    display: block;
  }


 .menu-button {
    display: inline-block;
    cursor: pointer;
    position: relative;
    z-index: 200;
    padding: 10px 20px;
  }

  .mobile-menu {
    position: absolute;
    left: -50%;
    width: 50%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 20px;
    transition: 0.5s left;
    z-index: 1;
  }

  .mobile-menu-item {
    font-size: 17px;
    color: #ffffff;
    font-weight: 400;
    padding: 10px 0;
    text-decoration: none;
  }

  .mobile-menu.open {
    left: 0;
  }
}
</style>
