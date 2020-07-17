<template>
<section class="column" v-if="board">

    
       <task-edit/>
       <task-details  @removeTaskEv='removeTask'> </task-details>
       
 <div>
    <draggable   class="list-group flex flex-start"
        tag="div"   
        v-bind="dragOptions" v-model="board.taskGroups" group="columns" @start="drag=true" @end="drag=false , updateBoard(board)">
       <div v-for="taskGroup in board.taskGroups" :key='taskGroup.id'>
       <task-group @duplicateTaskGroupEv='duplicateTaskGroup' @removeTaskGroupEv='removeTaskGroup' @updateBoardEv='updateBoard(board)' :taskGroup='taskGroup'> </task-group>
       </div>
    </draggable>
  </div>
  <div> <input type="text" v-model="newGroupTitle"> <button @click.prevent="createTaskGroup(newGroupTitle),newGroupTitle = ''">add</button> </div>
  </section>
</template>



<script>
import draggable from 'vuedraggable'
import taskGroup from '../components/taskGroup.vue'
import taskDetails from '../components/taskDetails.vue'
import taskEdit from '../components/taskEdit.vue';
import {taskGroupService} from '../services/task-group-service.js'
// import {boardService} from '../services/board-service.js'
var boardService = require('../services/board-service.js');



export default {
  data(){
    return {
      board :  null,
      newGroupTitle: ''
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
  //  updateBoard(){
  //    console.log('update trigger');
  //  },
   removeTask(task) {
     console.log(task);
     this.$store.dispatch({ type: 'removeTask', task })
   },
   updateBoard(board) {
     this.board.taskGroups.forEach( taskGroupItem => {
       taskGroupItem.tasks.forEach(task => task.taskGroup = taskGroupItem._id )
     } )
     console.log(board);
     this.$store.dispatch({ type: 'updateBoard', board })
   },
   createTaskGroup(title) {
     
     this.$store.dispatch({ type: 'addTaskGroup', title })
   },
   duplicateTaskGroup(taskGroup){
      this.$store.dispatch({ type: 'duplicateTaskGroup', taskGroup })
   },

   removeTaskGroup(taskGroup){
     this.$store.dispatch({ type: 'removeTaskGroup', taskGroup })
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
  taskDetails,
  taskEdit
}
}
</script>

<style>

</style>
