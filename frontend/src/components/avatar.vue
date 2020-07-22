<template>
<div>
  <avatar v-for="userId in users" :key="getUsername(userId)" :size="32" :username="getUsername(userId)" backgroundColor="#dfe1e6" color="#172b4d"/>
  <!-- <div> -->
    <!-- TODO - Change :key to userId only -->
  </div>
</template>
    
<script>
import Avatar from "vue-avatar";
export default {
  components: {
    Avatar
 },

  props: ['users'],

  methods: {
    getUsername(userId) {
      if (typeof userId === 'object') return userId.fullName;
      
      const user = this.$store.getters.getUserById(userId);
      return user.fullName;
    }
  }
};
</script>

<style>
</style> 