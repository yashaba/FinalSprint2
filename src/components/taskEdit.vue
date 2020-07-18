<template>
  <section :style="{'top': positionY, 'left': positionX}" v-if="taskTitle" class="task-edit flex">
      <div>
        <input type="text" v-model="taskTitle.title"/>
        <button class="btn-save-task" @click="saveTask">Save</button>
        <button class="btn-close" @click="close({}, true)">x</button>
      </div>
      <div class="btns-edit-container flex column">
        <button class="btn-edit-modal">
          <i class="fas fa-tag"></i>
          Edit Labels
        </button>
        <button class="btn-edit-modal">
          <i class="far fa-user"></i>
          Change Members
        </button>
        <button class="btn-edit-modal">
          <i class="fas fa-arrow-right"></i>
          Move
        </button>
        <button class="btn-edit-modal">
          <i class="fas fa-copy"></i>
          Copy
        </button>
        <button class="btn-edit-modal">
          <i class="far fa-clock"></i>
          Change Due Date
        </button>
        <button class="btn-edit-modal">
          <i class="far fa-trash-alt"></i>
          Remove
        </button>
      </div>
  </section>
</template>

<script>
import { eventBus, SHOW_EDIT_TASK } from '../services/event-bus.service.js';

export default {
    name: 'task-edit',

    data() {
      return {
        taskTitle: null,
        positionX: null,
        positionY: null
      }
    },

    methods: {
      close(ev = {}, click = false) {
        if (ev.key == 'Escape' || click) {
          this.taskTitle = null
        }
      },
      saveTask() {
        this.$store.dispatch({ type: 'updateTask', task: this.taskTitle })
        this.taskTitle = null
        },
    },

    created() {
      eventBus.$on(SHOW_EDIT_TASK, task=>{
        debugger;
        this.taskTitle = task.task;
        this.positionX = `${task.position.positionX}px`;
        this.positionY = `${task.position.positionY}px`;
      })
      window.addEventListener('keydown', this.close);
  },

  destroyed(){
      eventBus.$off(SHOW_EDIT_TASK);
      window.removeEventListener('keydown', this.close);
  },
}

</script>

<style scoped>
  .task-edit {
    position: absolute;
  }
</style>