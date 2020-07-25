<template>
  <section class="board-new-member-modal">
    <div class="board-new-member-modal-container">
      <div class="flex align-center space-between">
        <button class="btn-close" @click="close">&times;</button>
        <div class="flex align-center">
          <i class="fas fa-user-plus"></i>
          <h5 class="title">Add To Board</h5>
        </div>
      </div>
      <hr />
        <input type="text" v-model="userNameSearch" placeholder="Search users" />
        <div class="member-list">
          <div class="user" v-for="user in users" :key="user._id" @click="addNewMember(user)">
            <span>{{ user.fullName }}</span>
          </div>
        </div>
    </div>
  </section>
</template>

<script>
import { eventBus, OVERLAY_EFFECT, STOP_OVERLEY_EFFECT } from '../services/event-bus.service.js';

export default {
  name: "board-new-member-modal",

  data() {
    return {
      userId: "",
      userNameSearch: "",
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
      eventBus.$emit(STOP_OVERLEY_EFFECT, {});
      this.$emit("closeAddMemberModal");
    },

    addNewMember(user) {
      this.$emit("addMemberToBoard", user);
      this.close();
      eventBus.$emit(STOP_OVERLEY_EFFECT, {});
    }
  },

  created() {
    eventBus.$emit(OVERLAY_EFFECT, {});

    eventBus.$on("closer-clicked", () => {
      this.close();
    })
  }
};
</script>

<style>
</style>