<template>
  <div class="task-preview">
    <div :style="{ 'background-color': task.bgColor }" class="todo" @click="onDetails"> 
      {{task.title}} 
      <button @click.stop="editTask">Edit</button>
    </div>
  </div>
</template>

<script>
import { eventBus, SHOW_DETAILS, SHOW_EDIT_TASK } from '../services/event-bus.service.js'
export default {
  props: ['task'],
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

}
}
</script>

<style>

</style>
