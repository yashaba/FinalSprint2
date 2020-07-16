<template>
<section>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  <div v-for="column in columns" :key='column' :column='column'>
  <column> </column>
  </div>
  </section>
</template>



<script>
import column from '../components/column.vue'
import {boardService} from '../services/board-service.js'
export default {
  data(){
    return {
      columns : boardService.getColumns()
    }
  },

components: {
  column
}
}
</script>

<style>

</style>
