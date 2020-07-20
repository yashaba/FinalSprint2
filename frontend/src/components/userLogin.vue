<template>
  <section class="user-login">
      <h1>Login</h1>
      <!-- <div v-if="loggedinUser">
          <h3>Currently logged as: {{loggedinUser.username}}</h3>
          <button @click="logout">Logout</button>
      </div> -->
      <!-- v-else -->
      <form @submit.prevent="login">
        <input type="text" placeholder="Username" />
        <input type="password">
        <button>Login</button>
      </form>
      <p>Not registered yet?</p>
      <button>Create new account</button>
  </section>
</template>

<script>
export default {
    name: 'user-login'
}
</script>

<style>

</style>