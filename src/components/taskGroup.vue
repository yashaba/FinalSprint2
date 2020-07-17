<template>
  <div>

<div class="tasks-wrapper"> 
  <div class="tasks1">
    <!-- <h1> {{this.columns.columnTitle}}</h1> -->
<draggable   class="list-group"
        tag="div"   
        v-bind="dragOptions" v-model="taskGroup.tasks" group="people" @start="drag=true" @end="drag=false, updateBoardEv()">
 <div v-for="task in taskGroup.tasks" :key="task.id">
   <task-preview :task='task'> </task-preview>
   </div>
          
    
     
</draggable>
<div v-if="isAdding">
<input  type="text" placeholder="enter task name"> <br>
<button @click="addTask">add</button>
<button @click="isAdding = !isAdding">X</button>
</div>
<button v-if="!isAdding" @click="isAdding = !isAdding">Add Card</button>
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
      isAdding : false
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
