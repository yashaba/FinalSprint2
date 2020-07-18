<template>
  <div :style="{ 'background-color': task.bgColor }" class="task-preview">
        <div class="edit" @click.stop="editTask"></div>
    <div class="preview-header">
      <div class="preview-content" @click="onDetails">
        <div class="attachments" v-for="attachment in task.attachments" :key="attachment.id">
            <img :src="`${attachment}`" />
        </div>
      </div>
    </div>
    <div class="members">
      {{task.title}}
      <avatar class="flex" :users="task.assignedUsers" />
    </div >
    <div v-if="task.checkLists">
     <check-list-preview :task='task'></check-list-preview>
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
import checkListPreview from './checkListPreview.vue'
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
  editTask() {
    eventBus.$emit(SHOW_EDIT_TASK, {
      task: this.task,
      position: { positionX: event.clientX, positionY: event.clientY }
    });
  },
  components: {
    Avatar,
    checkListPreview
  }
};
</script>

<style>
</style>
