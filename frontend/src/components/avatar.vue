<template>
  <div>
    <!-- TODO - Change :key to userId only --> 
    <div
      v-for="userId in users"
      :key="getUsername(userId)"
      class="avatar-container"
    >
      <avatar
        :size="32"
        :username="getUsername(userId)"
        backgroundColor="#dfe1e6"
        color="#172b4d"
      />
      <div
        class="remove-member"
        @click.stop="removeMember(userId)"
        v-if="userId !== currentUserId"
      >
        <!-- The v-if Prevent delete of loggedin user. -->
        <i class="fa fa-times"></i>
      </div>
    </div>
  </div> 
</template>
    
<script>
import Avatar from "vue-avatar";
export default {
  components: {
    Avatar
 },

  props: [
    'users',
    'context',
    'entity'
  ],

  computed: {
    currentUserId() {
      return this.$store.getters.getCurrUserId;
    }
  },

  methods: {
    getUsername(userId) {
      // debugger
      if (typeof userId === 'object') return userId.fullName;
      
      const user = this.$store.getters.getUserById(userId);
      return user.fullName;
    },

    removeMember(userId) {
      if (this.context === 'board') {
        this.$store.dispatch('removeMemberFromBoard', {userId})
      }

      if (this.context === 'task') {
        this.$store.dispatch('removeMemberFromTask', {userId, task: this.entity})
      }
    }
  }
};
</script>

<style>
.avatar-container {
  position: relative;
  margin-right: 4px;
}

.avatar-container .remove-member {
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  background-color: #ffffff;
  border-radius: 100%;
  font-size: 10px;
  width: 12px;
  height: 10px;
  line-height: 10px;
  text-align: center;
}

.avatar-container:hover .remove-member {
  display: inline;
}
</style> 