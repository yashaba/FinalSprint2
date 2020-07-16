<template>
<section class="column">

    <h1>This is an about page</h1>
 <div  >


    <draggable   class="list-group flex space-between"
        tag="div"   
        v-bind="dragOptions" v-model="board.taskGroups" group="columns" @start="drag=true" @end="drag=false , log()">
       <div v-for="taskGroup in board.taskGroups" :key='taskGroup.id'>
       <columnCmp :taskGroup='taskGroup'> </columnCmp>
       </div>
    </draggable>
  </div>
  </section>
</template>



<script>
import draggable from 'vuedraggable'
import columnCmp from '../components/column.vue'
// import {boardService} from '../services/board-service.js'
var boardService = require('../services/board-service.js');


export default {
  data(){
    return {
      board :  this.$store.getters.currBoard
    }
  },
  computed: {
    board(){
    // this.$store.getters.currBoard
    }
  },

  created() {
      this.$store.dispatch({ type: 'loadBoard' })
 },
 methods: {
   log() {
     console.log('CHANGED' , this.columns )
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
  columnCmp,
  draggable
}
}
</script>

<style>

</style>
