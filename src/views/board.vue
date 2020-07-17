<template>
<section class="column" v-if="board">

    
       <task-details @removeTaskEv='removeTask'> </task-details>
       
 <div>
    <draggable   class="list-group flex flex-start"
        tag="div"   
        v-bind="dragOptions" v-model="board.taskGroups" group="columns" @start="drag=true" @end="drag=false , log()">
       <div v-for="taskGroup in board.taskGroups" :key='taskGroup.id'>
       <task-group :taskGroup='taskGroup'> </task-group>
       </div>
    </draggable>
  </div>
  </section>
</template>



<script>
import draggable from 'vuedraggable'
import taskGroup from '../components/taskGroup.vue'
import taskDetails from '../components/taskDetails.vue'
// import {boardService} from '../services/board-service.js'
var boardService = require('../services/board-service.js');


export default {
  data(){
    return {
      board :  null
    }
  },
  computed: {
    board(){
    // this.$store.getters.currBoard
    }
  },

  created() {
      this.$store.dispatch({ type: 'loadBoard' })
        .then(board => this.board = board);
 },
 methods: {
   log() {
     console.log('CHANGED' , this.columns )
   },
   updateBoard(){
     console.log('update trigger');
   },
   removeTask(task) {
     console.log(task);
     this.$store.dispatch({ type: 'removeTask', task })
   }

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
components: {
  taskGroup,
  draggable,
  taskDetails
}
}
</script>

<style>

</style>
