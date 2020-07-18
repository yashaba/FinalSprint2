<template>
<div>
  <avatar v-for="user in users" :key="user._id" :username="user.fullName"/>
  </div>
</template>
    
<script>
import Avatar from "vue-avatar";
export default {
    props: ['users'],
    data() {
        return {
        }
    },
    created(){
        console.log(this.users)
    },
  components: {
    Avatar
  }
};
</script>

<style>
</style>