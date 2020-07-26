<template>
  <section class="members-modal">
    <div class="members-modal-container">
        <div class="flex align-center space-between">
            <div class="flex align-center">
                <i class="fas fa-user"></i>
                <h5>Members</h5>
            </div>
            <button class="btn-close-modal" @click="close">&times;</button>
        </div>
        <hr>
            <!-- <input type="text" v-model="memberNameSearch" placeholder="Search members" /> -->
        <div class="members-list flex column" v-if="boardMembers.length">
            <div class="member flex space-between align-center" v-for="memberId in boardMembers" :key="getUsername(memberId)" @click="toggleMemberOnTask(memberId)">
                <span>{{ getUsername(memberId) }}</span>
                <i class="check fa fa-check" v-if="isUserAssignedToTask(memberId)"></i>
            </div>
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

    // data() {
    //     return {
    //         memberNameSearch: ''
    //     }
    // },

    computed: {
        boardMembers() {
            return this.$store.getters.getCurrBoardMembers;
        }
    },

    methods: {
        close() {
            this.$emit("closeMemberModal");
        },
        getUsername(userId) {
            if (typeof userId === 'object') {
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
                this.updateActivityLog( memberName ,"REMOVE" )

            

            } else {
                this.$store.dispatch('addMemberToTask', {userId: memberId._id, task: this.task});
                this.updateActivityLog( memberName ,"ADD" )
            }
        },
            updateActivityLog(txt, type) {
       let activity = {
            txt: txt,
             task: this.task,
             type: type,
             user: this.$store.getters.loggedinUser
             }
     this.$store.dispatch({ type: "updateActivityLog", activity});
      
    },

    }
}
</script>

<style>

</style>