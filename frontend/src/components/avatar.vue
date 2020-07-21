<template>
<div>
  <avatar v-for="user in users" :key="user.id" :size="28" :username="user.fullName" backgroundColor="#dfe1e6" color="#172b4d"/>
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
        // console.log(this.users)
    },
  components: {
    Avatar
  }
};
</script>

<style>
</style>