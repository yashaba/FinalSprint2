<template>
  <section class="project-new-member-modal">
    <button class="btn-close" @click="close">&times;</button>
    <h5 class="title">Add To Board</h5>
    <hr />
    <form @submit.prevent="addNewMember" v-if="users.length">
      <input list="users" name="user" id="user" @change="change" required autocomplete="off" />

      <datalist id="users">
        <option v-for="user in users" :key="user._id" :value="user._id">{{ user.fullName }}</option>
      </datalist>

      <button class="btn-add-member">Add</button>
    </form>
    <p v-else>All users are members of this board</p>
  </section>
</template>

<script>
export default {
  name: "project-new-member-modal",

  data() {
    return {
      userId: "",
    };
  },
  created() {
  },
  computed: {
    users() {
      const users = this.$store.getters.users;
      const members = this.$store.getters.getCurrBoardMembers;

      return users.filter(user => !members.includes(user._id));
    }
  },

  methods: {
    close() {
      this.$emit("closeAddMemberModal");
    },

    change(event) {
      this.userId = event.target.value;
    },

    addNewMember() {
      this.$emit("addMemberToBoard", this.userId);
      this.close();
    }
  }
};
</script>

<style>
</style>