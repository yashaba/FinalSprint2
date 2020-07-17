<template>
  <section v-if="taskTitle" class="task-edit">
    <!-- <div class="edit-modal"> -->
      <input type="text" v-model="taskTitle.title"/>
      <button class="btn-save-task" @click="saveTask">Save</button>
      <button class="btn-close" @click="close({}, true)">x</button>
    <!-- </div> -->
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
        // if (!this.taskToSave) return;
        console.log(this.taskTitle._id);
        this.$store.dispatch({ type: 'updateTask', task: this.taskTitle })
        this.taskTitle = null
        },
      // makeId(length = 6) {
      //   var txt = '';
      //   var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      //   for (var i = 0; i < length; i++) {
      //     txt += possible.charAt(Math.floor(Math.random() * possible.length));
      //   }

      //   return txt;
      // }
    },

    created() {
      eventBus.$on(SHOW_EDIT_TASK, task=>{
        // if (!task._id) {
        //   var id = this.makeId;
        //   console.log(id);
        // }
        this.taskTitle = task;
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