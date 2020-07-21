<template>
  <section class="project-new-member-modal">
      <button class="btn-close" @click="close">&times;</button>
      <h5 class="title">Add To Board</h5>
      <hr>
      <form @submit.prevent="addNewMember">
        <input type="text" placeholder="name" v-model="memberName" required/>
        <button class="btn-add-member">Add</button>
      </form>
  </section>
</template>

<script>
export default {
    name: 'project-new-member-modal',

    data() {
        return {
            memberName: ''
        }
    },

    methods: {
        close() {
            this.$emit('closeNewMemberModal');
      },
        addNewMember() {
          this.$emit('addMemberToProject' , this.memberName);
          this.close();
      }
    }

}
</script>

<style>

</style>