<template>
  <div>
    <div class="task-group flex column">
      <div class="flex space-between">
        {{taskGroup.title}}
        <button>edit</button>
      </div>
      <div class="tasks1">
        <!-- <h1> {{this.columns.columnTitle}}</h1> -->
        <draggable
          class="list-group"
          tag="div"
          v-bind="dragOptions"
          v-model="taskGroup.tasks"
          group="people"
          @start="drag=true"
          @end="drag=false"
        >
          <div v-for="task in taskGroup.tasks" :key="task.id">
            <task-preview :task="task"></task-preview>
          </div>
        </draggable>

        <button @click="addTask">Add Card</button>
        <div v-if="isAdding">
          <form @submit.prevent="saveNewTask">
            <input
              type="text"
              v-model="taskToSave.title"
              placeholder="Enter a title for this card..."
            />
            <button type="submit">Add Card</button>
          </form>
          <button @click="close">X</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import taskPreview from "./taskPreview.vue";
// import card from './card.vue'
export default {
  props: ["taskGroup"],
  data() {
    return {
      // taskGroup : this.taskGroup,
      isAdding: false,
      taskToSave: {
        title: "",
        _id: null
      }
    };
  },
  created() {
    console.log("tasks group", this.taskGroup);
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },

  methods: {
    log() {
      console.log("triggerrr");
    },
    addTask() {
      this.isAdding = true;
    },
    close() {
      this.isAdding = !this.isAdding;
    },
    saveNewTask() {
      // if (!this.taskToSave) return;
      this.$store
        .dispatch({ type: "saveTaskGroup", taskGroup: this.taskToSave })
        .then(() => {
          this.close;
        });
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
    draggable,
    taskPreview
    // card
  }
};
</script>

<style>
.tasks1 {
  background-color: rgb(168, 164, 164);
  padding: 10px;
  overflow: auto;
  display: block;
  height: 1%;
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
