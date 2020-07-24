<template>
  <div  @mousedown.stop="previewClickedEv" :style="{ 'background-color': task.bgColor }" @click="onDetails" class="task-preview">

      <div class="edit" @click.stop="editTask"></div>
      <div class="preview-header">
        <div class="preview-content">
          <div class="attachments" v-for="attachment in task.attachments" :key="attachment.id">
              <img :src="`${attachment}`" />
          </div>
        </div>
      </div>
      <task-preview-labels-list :labels="task.labels"/>
        <div class="task-title">{{task.title}}</div>
        <div class="task-more-content flex space-between align-center">
          <div class="flex align-end">
          <div v-if="task.checkLists">
      <check-list-preview :task='task'></check-list-preview>
      </div> 
      <div class="duedate">
      <due-date-preview  v-if="task.dueDate.date" :dueDate="task.dueDate"></due-date-preview>
      </div>
      </div>
      <div v-if="!task.checkLists"></div>
      <div class="members">
        <avatar class="flex" :users="task.assignedUsers" :entity="task" context="task" />
      </div>
      </div>
  </div>
</template>

<script>
import {
  eventBus,
  SHOW_DETAILS,
  SHOW_EDIT_TASK,
  OVERLAY_EFFECT
} from "../services/event-bus.service.js";
import Avatar from "../components/avatar.vue";
import checkListPreview from './checkListPreview.vue';
import taskPreviewLabelsList from './taskPreviewLabelsList.vue';
import dueDatePreview from './dueDatePreview.vue'

export default {
  props: ["task"],
  methods: {
    previewClickedEv(event){
      console.log('emited');
    this.$emit('previewClickedEv', {ev: event, id: this.task._id} )
    },
    logClickEv(ev){
      console.log('emited');
    this.$emit('testLog', ev)
    },
    onDetails() {
      eventBus.$emit(OVERLAY_EFFECT, {});
      eventBus.$emit(SHOW_DETAILS, this.task);
    },
    editTask() {
   
      // eventBus.$emit(SHOW_EDIT_TASK, this.task);
      eventBus.$emit(OVERLAY_EFFECT, {});
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
    taskPreviewLabelsList,
    dueDatePreview
  }
};
</script>

<style lang='scss' >
 .duedate {
   margin-left: 10px;
 }
</style>
