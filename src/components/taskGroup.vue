<template>
  <div>
    <div class="tasks-wrapper"> 
      <div class="tasks1">
    <!-- <h1> {{this.columns.columnTitle}}</h1> -->
        <draggable   class="list-group"
        tag="div"   
        v-bind="dragOptions" v-model="taskGroup.tasks" group="people" @start="drag=true" @end="drag=false">
          <div v-for="task in taskGroup.tasks" :key="task.id">
            <task-preview :task='task'> </task-preview>
          </div>
        </draggable>

        <button @click="addTask">Add Card</button>
        <div v-if="isAdding">
          <form @submit.prevent="saveNewTask">
            <input type="text" v-model="taskToSave.title" placeholder="Enter a title for this card..." /> 
            <button type="submit"> Add Card </button>
          </form>
          <button @click="close"> X </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import taskPreview from './taskPreview.vue'
  // import card from './card.vue'
export default {
  props: ['taskGroup'],
  data() { 
    return{
      // taskGroup : this.taskGroup,
      isAdding : false,
      taskToSave: {
        title: '',
        _id: null
      }
    }
  },
  created() {
    console.log('tasks group', this.taskGroup);
  },
   computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      }
    }
  },

  methods: {
   log() {
     console.log('triggerrr');
   },
   updateBoardEv() {
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
      this.$store.dispatch({ type: 'saveTaskGroup', taskGroup: this.taskToSave })
        .then(() => {
          this.close;
        })
    },
  },

 
components: {
  draggable,
  taskPreview
  // card
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
