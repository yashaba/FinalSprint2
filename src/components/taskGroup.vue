<template>
  <div>
    <div class="task-group flex column">
      <div class="flex space-between">
        {{taskGroup.title}}
        <button>edit</button>
      </div>
      <div class="tasks1">
    <!-- <h1> {{this.columns.columnTitle}}</h1> -->
        <draggable   class="list-group"
        tag="div"   
        v-bind="dragOptions" v-model="taskGroup.tasks" group="people" @start="drag=true" @end="drag=false,updateBoardEv()">
          <div v-for="task in taskGroup.tasks" :key="task.id">
            <task-preview :task="task"></task-preview>
          </div>
        </draggable>

        <button @click="addTask">Add Card</button>
        <div v-if="isAdding">
          <form @submit.prevent="saveNewTask">
            <input
              type="text"
              v-model="taskToSave.title"
              placeholder="Enter a title for this card..."
            />
            <button type="submit">Add</button>
          </form>
          <button @click="close">X</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import taskPreview from "./taskPreview.vue";
// import card from './card.vue'
export default {
  props: ["taskGroup"],
  data() {
    return {
      // taskGroup : this.taskGroup,
      isAdding: false,
      taskToSave: {
        title: '',
        bgColor: "green",
        taskGroup: this.taskGroup._id
      }
    };
  },
  created() {
    console.log("tasks group", this.taskGroup);
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },

  methods: {
    log() {
      console.log("triggerrr");
    },
   log() {
     console.log('triggerrr');
   },
   updateBoardEv() {
     console.log("group")
     console.log('emitted');
     this.$emit ('updateBoardEv')
   },

   addTask() {
      this.isAdding = true;
    },
    close() {
      this.isAdding = !this.isAdding;
    },
    saveNewTask() {
      // if (!this.taskToSave) return;
      this.$store.dispatch({ type: 'saveTask', task: this.taskToSave, taskGroup: this.taskGroup });
      this.isAdding = !this.isAdding;
    }
  },

 
components: {
  draggable,
  taskPreview
  // card
}
}
</script>

<style>

</style>
