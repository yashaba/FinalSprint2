<template>
  <section>
      <div>
          <i class="fas fa-tasks"></i> <span> {{calcDone}} / {{task.checkLists[0].list.length}} </span>
      </div>
  </section>
</template>

<script>

export default {
props: ['task'],
data() {return {
    // numOfDone: calcDone()
}},
computed: {
 calcDone: function() {
     return this.task.checkLists[0].list.filter( item => item.isDone ).length
 }
},

created() {
    console.log( 'dsadsadas',this.task.checkLists[0].list.filter( item => item.isDone ).length)
}
}

</script>

<style>

</style>