<template>
  <!-- <section class="project-new-member-modal">
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
  <p v-else>All users are members of this board</p>-->
  <section class="board-new-member-modal">
    <button class="btn-close" @click="close">&times;</button>
    <h5 class="title">Add To Board</h5>
    <hr />
    <!-- <h6>BOARD MEMBERS</h6> -->
    <div class="members-list flex column">
      <input type="text" v-model="userNameSearch" placeholder="Search users" />
      <hr />
      <div class="user" v-for="user in users" :key="user._id" @click="addNewMember(user._id)">
        <span>{{ user.fullName }}</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  // name: "project-new-member-modal",

  // data() {
  //   return {
  //     userId: "",
  //   };
  // },
  // created() {
  // },
  // computed: {
  //   users() {
  //     const users = this.$store.getters.users;
  //     const members = this.$store.getters.getCurrBoardMembers;

  //     return users.filter(user => !members.includes(user._id));
  //   }
  // },

  // methods: {
  //   close() {
  //     this.$emit("closeAddMemberModal");
  //   },

  //   change(event) {
  //     this.userId = event.target.value;
  //   },

  //   addNewMember() {
  //     this.$emit("addMemberToBoard", this.userId);
  //     this.close();
  name: "board-new-member-modal",

  data() {
    return {
      userId: "",
      userNameSearch: ""
    };
  },

  computed: {
    users() {
      const users = this.$store.getters.users;
      const members = this.$store.getters.getCurrBoardMembers;
      return users.filter(user => {
        return (
          !members.includes(user._id) &&
          user.fullName
            .toLowerCase()
            .includes(this.userNameSearch.toLowerCase())
        );
      });
    }
  },

  methods: {
    close() {
      this.$emit("closeAddMemberModal");
    },

    addNewMember(userId) {
      this.$emit("addMemberToBoard", userId);
      this.close();
    }
  }
};
</script>

<style>
</style>