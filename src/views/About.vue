<template>
<section>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
 <div>


    <draggable   class="list-group"
        tag="div"   
        v-bind="dragOptions" v-model="this.columns" group="people" @start="drag=true" @end="drag=false">
  <div v-for="column in columns" :key='column.id'>
  <columnCmp :key='column.id' :column='column'> </columnCmp>
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
   console.log(this.columns);

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
