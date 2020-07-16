<template>
<section class="column">

    <h1>This is an about page</h1>
 <div  >


    <draggable   class="list-group flex space-between"
        tag="div"   
        v-bind="dragOptions" v-model="columns" group="columns" @start="drag=true" @end="drag=false , log()">
       <div v-for="column in columns" :key='column.id'>
       <columnCmp :column='column'> </columnCmp>
       </div>
    </draggable>
  </div>
  </section>
</template>



<script>
import draggable from 'vuedraggable'
import columnCmp from '../components/column.vue'
import {boardService} from '../services/board-service.js'

export default {
  data(){
    return {
      columns : boardService.getColumns()
    }
  },
 created() {
   console.log( 'COLUMNSS',this.columns);

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
