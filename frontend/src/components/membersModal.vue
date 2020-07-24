<template>
  <section class="members-modal">
      <button class="btn-close-modal">&times;</button>
      <h5>Members</h5>
      <hr>
      <h6>BOARD MEMBERS</h6>
      <div class="members-list flex column" v-if="boardMembers.length">
          <input type="text" v-model="memberNameSearch" placeholder="Search members" />
          <hr>
          <div class="member" v-for="memberId in boardMembers" :key="getUsername(memberId)" @click="toggleMemberOnTask(memberId)">
              <span>{{ getUsername(memberId) }}</span>
              <span v-if="isUserAssignedToTask(memberId)">V</span>
          </div>
      </div>
  </section>
</template>

<script>
export default {
    name: 'members-modal',

    props: [
        'task'
    ],

    data() {
        return {
            memberNameSearch: ''
        }
    },

    computed: {
        boardMembers() {
            return this.$store.getters.getCurrBoardMembers;
        }
    },

    methods: {
        getUsername(userId) {
            if (typeof userId === 'object') {
                return userId.fullName;
            }

            return this.$store.getters.getUserFullnameById(userId);
        },

        isUserAssignedToTask(memberId) {
            const assignedUsers = this.task.assignedUsers;

            if (!Array.isArray(this.task.assignedUsers)) return false;

            return assignedUsers.includes(memberId);
        },

        toggleMemberOnTask(memberId) {
            if (this.isUserAssignedToTask(memberId)) {
                this.$store.dispatch('removeMemberFromTask', {userId: memberId, task: this.task});
            } else {
                this.$store.dispatch('addMemberToTask', {userId: memberId, task: this.task});
            }
        }
    }
}
</script>

<style>

</style>