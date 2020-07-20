<template>
<section class="column" v-if="board" :class="{screen: screen.isScreen}">
  <!-- :class="{screen: screen.isScreen}" -->
  <!-- <div @click="log" class="overlay"> test</div> -->
       <task-edit @removeTaskEv='removeTask'/>
       <task-details  @updateTaskEv='updateTask' @removeTaskEv='removeTask'> </task-details>
      <div >
 <div class="flex closer">
    <draggable   class="list-group closer flex flex-start"
        tag="div"   
        v-bind="dragOptions" v-model="board.taskGroups" group="columns" @start="drag=true" @end="drag=false , updateBoard(board)">
       <div v-for="taskGroup in board.taskGroups" :key='taskGroup.id'>
       <task-group @duplicateTaskGroupEv='duplicateTaskGroup' @removeTaskGroupEv='removeTaskGroup' @updateBoardEv='updateBoard(board)' :taskGroup='taskGroup'> </task-group>
       </div>
    </draggable>
  <div @click="addingTask = true" class="task-add flex justify-center align-center closer"> 
    <div @click="addingTask = true" class="closer" v-if="!addingTask">
    Add task group
    </div>
    <div class="add-group-inputs flex column " v-if="addingTask">

    <input  placeholder="Enter a title" type="text" v-model="newGroupTitle"> 
    <div>
    <button class="btn-save-group" @click.stop="createTaskGroup(newGroupTitle),newGroupTitle = '' ">Add Group</button>
    <button class="btn-close" @click.stop="addingTask = !addingTask"><i class="fas fa-times fa-lg"></i></button>
    </div>

    </div>
     </div>
  </div>
  </div> 
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
import {eventBus, SCREEN_MODE, STOP_SCREEN_MODE} from '../services/event-bus.service'



export default {
  data(){
    return {
      board :  null,
      newGroupTitle: '',
      addingTask: false,
      screen: {
        isScreen: false
      }
    }
  },
  computed: {
    closeAddMenu(){
      return this.addingTask = false
    // this.$store.getters.currBoard
    }
  },

  created() {
      this.$store.dispatch({ type: 'loadBoard' , id: this.$route.params.id })
        .then(board => this.board = board);
        window.onclick = function(ev) {
          if ( ev.target.classList.contains("closer")){
           
           this.addingTask = false
           eventBus.$emit('closer-clicked')
          }
          // console.log('window clickied', ev.target.classList[0]);
           }

           eventBus.$on('closer-clicked', () => {
            
             this.addingTask = false
           })

      eventBus.$on(SCREEN_MODE, () => {
          this.screen.isScreen = true;
      })

       eventBus.$on(STOP_SCREEN_MODE, () => {
          this.screen.isScreen = false;
      })
 },

  // $watch() {
  //      eventBus.$on(SCREEN_MODE, () => {
  //        console.log('hello');
  //         this.screen.isScreen = true;
  //     })
  // },
 methods: {
   log() {
   
   },
  //  updateBoard(){
  //    console.log('update trigger');
  //  },
   removeTask(task) {
     this.$store.dispatch({ type: 'removeTask', task })
     this.task = null
   },
   updateBoard(board) {
     this.board.taskGroups.forEach( taskGroupItem => {
       taskGroupItem.tasks.forEach(task => task.taskGroup = taskGroupItem._id )
     } )
     
     this.$store.dispatch({ type: 'updateBoard', board })
   },
   updateTask(task){
         this.$store.dispatch({ type: 'updateTask', task: task })
   },
   createTaskGroup(title) {
     this.addingTask = false
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
        ghostClass: "tghost",
        chosenClass: "tchosen-class",
        dragClass: "tdrag-class"
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

<style lang="scss" >
      .tghost{
        }
    .tchosen-class{
      
      .tdrag-class{ 
        
        rotate: 10deg;
         background: rgba($color: #e71818, $alpha: 1.0);
      }
     }


 .btn-save-group {
      background-color: #5aac44;
      color: #fbfdfb;
      font-size: 0.9rem;
      padding: 10px;
      border-radius: 3px;
      float: left;
      margin-left: 10px;
      margin-bottom: 10px;
      border: 0;
      cursor: pointer;
      outline: none;

      &:hover {
        background-color: #61bd4f;
      }
      }
        .add-group-inputs {

          margin-top: 10px ;
          justify-content: center;
          align-items: center;
          .btn-close {
        float: left;
        margin-left: 10px;
        margin-top: 10px;
        font-size: 16px;
        border: 0;
        cursor: pointer;
        outline: none;
        width: 30px;
        background: rgba($color: #cfcdcd, $alpha: 0.1);
  
        &:hover {
          color: #172b4d;
          // background-color: #ebecf0;
        }
      }
           input {
                   outline: 0px;
              border: 0px;
              background-color: #f6f6f6;
        }
        div {
          margin-top: 5px;
        }
      
    }
</style>
