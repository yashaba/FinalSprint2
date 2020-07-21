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
     height: 25px;
     width: 60px;
 }
 .alldone {
      background: rgba($color: #61bd4f, $alpha: 1);
      color: #fff;
 }
</style>

