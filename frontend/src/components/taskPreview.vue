<template>
  <div :style="{ 'background-color': task.bgColor }" @click="onDetails" class="task-preview">
    <task-preview-labels-list :labels="task.labels"/>
    <div class="edit" @click.stop="editTask"></div>
    <div class="preview-header">
      <div class="preview-content">
        <div class="attachments" v-for="attachment in task.attachments" :key="attachment.id">
            <img :src="`${attachment}`" />
        </div>
      </div>
    </div>
      <div class="task-title">{{task.title}}</div>
      <div class="flex align-end space-between">
        <div v-if="task.checkLists">
     <check-list-preview :task='task'></check-list-preview>
     </div> 
     <div v-if="!task.checkLists"></div>
    <div class="members">
      <avatar class="flex justify-end" :users="task.assignedUsers" />
    </div>
    </div>
  </div>
</template>

<script>
import {
  eventBus,
  SHOW_DETAILS,
  SHOW_EDIT_TASK,
  SCREEN_MODE
} from "../services/event-bus.service.js";
import Avatar from "../components/avatar.vue";
import checkListPreview from './checkListPreview.vue';
import taskPreviewLabelsList from './taskPreviewLabelsList.vue';

export default {
  props: ["task"],
  methods: {
    onDetails() {
      eventBus.$emit(SHOW_DETAILS, this.task);
    },
    editTask() {
   
      // eventBus.$emit(SHOW_EDIT_TASK, this.task);
      eventBus.$emit(SCREEN_MODE, {});
      eventBus.$emit(SHOW_EDIT_TASK, {
      task: this.task,
      position: { positionX: event.clientX, positionY: event.clientY }
    });
    }
  },
  // editTask() {
  //   eventBus.$emit(SHOW_EDIT_TASK, {
  //     task: this.task,
  //     position: { positionX: event.clientX, positionY: event.clientY }
  //   });
  // },
  components: {
    Avatar,
    checkListPreview,
    taskPreviewLabelsList
  }
};
</script>

<style>
</style>
