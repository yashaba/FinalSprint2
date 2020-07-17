<template>
  <section v-if="taskTitle" class="task-edit">
    <div>
      <button @click="close({}, true)">x</button>
      <input type="text" :placeholder="taskTitle"/>
      <button @click="saveTask">Save</button>
    </div>
  </section>
</template>

<script>
import { eventBus, SHOW_EDIT_TASK } from '../services/event-bus.service.js';

export default {
    name: 'task-edit',

    data() {
      return {
        taskTitle: null
      }
    },

    methods: {
      close(ev = {}, click = false) {
        if (ev.key == 'Escape' || click) {
          this.taskTitle = null
        }
      },
      saveTask() {
        console.log('Done');
        // if (!this.taskToSave) return;
        // this.$store.dispatch({ type: 'saveTask', task: this.taskToSave })
        this.taskTitle = null
        }
    },

    created() {
      eventBus.$on(SHOW_EDIT_TASK, task=>{
        this.taskTitle = task.title;
      })
      window.addEventListener('keydown', this.close);
  },

  destroyed(){
      eventBus.$off(SHOW_EDIT_TASK);
      window.removeEventListener('keydown', this.close);
  },
}

</script>

<style>
</style>