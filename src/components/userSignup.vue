<template>
  <section class="user-signup">
     <h1>Signup</h1>
      <!-- <div v-if="loggedinUser">
          <h3>Currently logged as: {{loggedinUser.username}}</h3>
          <p>Please logout first</p>
          <button @click="logout">Logout</button>
      </div> -->
      <!-- v-else -->
      <form @submit.prevent="signup">
        <input type="text" placeholder="Full name">
        <input type="text" placeholder="Username">
        <input type="password" placeholder="Password">
        <input type="password" placeholder="Confirm your password">
        <button>Signup</button>
      </form>
       <p>Already have a user?</p>
      <button>Login</button>
  </section>
</template>

<script>
export default {
    name: 'user-signup'
}
</script>

<style>

</style>