<template>
  <div :style="{ 'background-color': task.bgColor }" class="task-preview">
    <div class="preview-content flex space-between" @click="onDetails">
      {{task.title}}
      <div class="members">
        <avatar  class="flex" :users="task.assignedUsers" />
      </div>
      <div class="edit" @click.stop="editTask"></div>
    </div>
  </div>
</template>

<script>
import {
  eventBus,
  SHOW_DETAILS,
  SHOW_EDIT_TASK
} from "../services/event-bus.service.js";
import Avatar from "../components/avatar.vue";
export default {
  props: ["task"],
  methods: {
    onDetails() {
      eventBus.$emit(SHOW_DETAILS, this.task);
    },
    editTask() {
      console.log(this.task._id);
      eventBus.$emit(SHOW_EDIT_TASK, this.task);
    }
  },
  components: {
    Avatar
  }
};
</script>

<style>
</style>
