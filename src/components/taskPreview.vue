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
    eventBus.$emit(SHOW_EDIT_TASK, this.task);
  }
},
components: {

}
}
</script>

<style>
.tasks1 {
  background-color: rgb(168, 164, 164);
  padding: 10px;
  overflow:auto;
  display: block;
  height:1%
}
.tasks-wrapper {
  display: flex;
  justify-content: space-evenly;
}
.tasks-wrapper .todo-drag {
 background-color: red;
 opacity: 1;
}
.todo {
  width: 150px;
  height: 100px;
  margin: 10px;
}

.flip-list-move {
opacity: 0.2;
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</style>
