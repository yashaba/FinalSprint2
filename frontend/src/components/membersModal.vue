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
                debugger
                return userId.fullName;
            }

            return this.$store.getters.getUserFullnameById(userId);
        },

        isUserAssignedToTask(memberId) {
            const assignedUsers = this.task.assignedUsers;

            if (!Array.isArray(this.task.assignedUsers)) return false;

            return assignedUsers.includes(memberId._id);
        },

        toggleMemberOnTask(memberId) {
            let memberName = this.$store.getters.getUserFullnameById(memberId._id);
            console.log('toggle member',memberName );
            if (this.isUserAssignedToTask(memberId)) {
                this.$store.dispatch('removeMemberFromTask', {userId: memberId._id, task: this.task});
                this.updateActivityLog( "added" + " " + memberName ,"ADD" )

            } else {
                this.$store.dispatch('addMemberToTask', {userId: memberId._id, task: this.task});
                this.updateActivityLog( " " + memberName + " " + "from" ,"REMOVE" )
            }
        },
            updateActivityLog(txt, type) {
          console.log("activity log in details",  type);

        let activity = {txt: txt, task: this.task}
        activity.type = type
      let user = this.$store.getters.loggedinUser
      activity.user = user
     this.$store.dispatch({ type: "updateActivityLog", activity});
      
    },

    }
}
</script>

<style>

</style>