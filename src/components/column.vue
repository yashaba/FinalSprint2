<template>
  <div>
  <!-- <div class="about">
    
    <h1> {{task.taskContent}}</h1>
  </div>
<div class="tasks-wrapper"> 
  <div class="tasks1">
<draggable   class="list-group"
        tag="div"   
        v-bind="dragOptions" v-model="this.tasks" group="people" @start="drag=true, log()" @end="drag=false , log()">
   <div :style="{ 'background-color': task.color }" class="todo" v-for="task in column.cards" :key="task.id">
          {{task.taskTitle}} <br>
    
     </div>
</draggable>
</div>

</div> -->
</div>
</template>

<script>
  import draggable from 'vuedraggable'
export default {
  props: ['column'],
  data() { 
    return{
      tasks : this.column
    }
  },
  created() {
    console.log('tasks', this.tasks);
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

  methods: {
   log() {
     console.log('triggerrr');
   }
  },

  // data() {
  //   return {
  //     myArray: [
        
  //       { color: 'blue', id: 1 , taskTitle: 'Test' , taskContent: 'This is a test'} ,
  //       { color: 'yellow', id: 2 , taskTitle: 'Test2' , taskContent: 'This is a test2'} ,
  //       { color: 'red', id: 3 , taskTitle: 'Test3' , taskContent: 'This is a test3'} ,
  //       { color: 'purple', id: 4 , taskTitle: 'Test4' , taskContent: 'This is a test4'} ,
  //       { color: 'green', id: 5 , taskTitle: 'Test5' , taskContent: 'This is a test5'} ,
    
   
      
  //     ],
  //     myArray2: [
        
  //       { color: 'blue', id: 6 , taskTitle: 'Test' , taskContent: 'This is a test'} ,
  //       { color: 'yellow', id: 7 , taskTitle: 'Test7' , taskContent: 'This is a test2'} ,
  //       { color: 'red', id: 8 , taskTitle: 'Test8' , taskContent: 'This is a test3'} ,
  //       { color: 'purple', id: 9 , taskTitle: 'Test9' , taskContent: 'This is a test4'} ,
  //       { color: 'green', id: 10 , taskTitle: 'Test10' , taskContent: 'This is a test5'} ,
    
   
      
  //     ],
  //     myArray3: [
        
  //       { color: 'blue', id: 11 , taskTitle: 'Test11' , taskContent: 'This is a test11'} ,
  //       { color: 'yellow', id: 12 , taskTitle: 'Test12' , taskContent: 'This is a test12'} ,
  //       { color: 'red', id: 13 , taskTitle: 'Test13' , taskContent: 'This is a test13'} ,
  //       { color: 'purple', id: 14 , taskTitle: 'Test14' , taskContent: 'This is a test14'} ,
  //       { color: 'green', id: 15 , taskTitle: 'Test15' , taskContent: 'This is a test15'} ,
    
   
      
  //     ],
  //   }
  // },


components: {
  draggable
}
}
</script>

<style>
.tasks1 {
  background-color: rgb(168, 164, 164);
  padding: 10px;
  overflow:auto;
  display: block;
  height:1%
}
.tasks-wrapper {
  display: flex;
  justify-content: space-evenly;
}
.tasks-wrapper .todo-drag {
 background-color: red;
 opacity: 1;
}
.todo {
  width: 150px;
  height: 100px;
  margin: 10px;
}

.flip-list-move {
opacity: 0.2;
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</style>
