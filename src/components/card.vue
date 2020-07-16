<template>
  <div>
  <div class="about">
    
    <h1>This is a test</h1>
  </div>
<div class="tasks-wrapper"> 
  

<div class="tasks1">
<draggable   class="list-group"
        tag="div"   
        v-bind="dragOptions" v-model="this.card" group="people" @start="drag=true, log()" @end="drag=false , log()">
   <div :style="{ 'background-color': task.color }" class="todo" v-for="task in myArray3" :key="task.id">
     {{task.taskTitle}} <br>
     {{task.taskContent}}
     
     
     </div>
</draggable>
</div>
</div>
</div>
</template>

<script>
  import draggable from 'vuedraggable'
export default {
  props: ['cardProp'],
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
  data() {
    return {
      card: this.cardProp
    }
  },


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
