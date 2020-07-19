<template>
  
      <div :class="{alldone: calcAllDone}" class="checklist-preview ">
          <i class="fas fa-tasks"></i> <span> {{calcDone}} / {{task.checkLists[0].list.length}} </span>
      </div>
  
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
 },
 calcAllDone: function() {
     return  this.task.checkLists[0].list.length === this.calcDone
 }
},

created() {
    console.log( this.calcAllDone)
}
}

</script>

<style lang="scss" scoped>
 .checklist-preview {
     display: flex;
     justify-content: space-evenly;
     align-items: center;
     border-radius: 10%;
     margin-left: 10px ;

    //  background-color: aqua;
     height: 30px;
     width: 60px;
 }
 .alldone {
  background-color: rgba($color: #7af143, $alpha: 1.0);
 }
</style>

