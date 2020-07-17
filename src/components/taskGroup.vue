<template>
  <!-- <div> -->
    <div class="task-group flex column">
      <div class="relative flex space-between align-center">
        <p class="group-title">{{taskGroup.title}}</p> 
        <button class="btn-edit" @click="openTaskGroupModal">...</button>
        <div v-if="taskModalShown" class="title-modal column ">
           <div @click="isAdding = true , taskModalShown = false"> <i class="fas fa-plus"></i> Add new task </div>
           <div @click="duplicateTaskGroup"><i class="fas fa-copy"></i> Duplicate List</div>
           <div  @click="removeTaskGroup"> <i class="far fa-trash-alt"></i> Remove list</div>
            </div>
      </div>
      <div class="tasks1">
    <!-- <h1> {{this.columns.columnTitle}}</h1> -->
        <draggable   class="list-group"
        tag="div"   
        v-bind="dragOptions" v-model="taskGroup.tasks" group="people" @start="drag=true" @end="drag=false,updateBoardEv()">
          <div v-for="task in taskGroup.tasks" :key="task.id">
            <task-preview :task="task"></task-preview>
          </div>
        </draggable>

        <button v-if="!isAdding" class="btn-add-task" @click="addTask">
          <i class="fas fa-plus fa-xs"></i> 
          Add another card
        </button>
        <div class="add-new-task" v-if="isAdding">
            <form @submit.prevent="saveNewTask">
              <input
                type="text"
                v-model="taskToSave.title"
                placeholder="Enter a title for this card..."
              />
              <button class="btn-save-task" type="submit">Add Card</button>
            </form>
            <button class="btn-close" @click="close"><i class="fas fa-times fa-lg"></i></button>
        </div>
      </div>
    </div>
  <!-- </div> -->
</template>

<script>
import draggable from "vuedraggable";
import taskPreview from "./taskPreview.vue";
import {taskGroupService} from '../services/task-group-service.js'
// import card from './card.vue'
export default {
  props: ["taskGroup"],
  data() {
    return {
      // taskGroup : this.taskGroup,
      isAdding: false,
      taskModalShown: false ,
      taskToSave: {
        _id : taskGroupService.makeId(),
        title: '',
        bgColor: "green",
        taskGroup: this.taskGroup
        
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
    openTaskGroupModal() {
      this.taskModalShown = !this.taskModalShown
      console.log("triggerrr");
    },
   log() {
     console.log('triggerrr');
   },
   updateBoardEv() {
     console.log("group")
     console.log('emitted');
     this.$emit ('updateBoardEv')
   },
   removeTaskGroup(){
    this.taskModalShown = false
     this.$emit ('removeTaskGroupEv' , this.taskGroup)
     console.log('button trigger', this.taskGroup);
   },
   duplicateTaskGroup() {
     this.taskModalShown = false
     this.$emit ('duplicateTaskGroupEv' , this.taskGroup)
   },

   addTask() {
      this.isAdding = true;
    },
    close() {
      this.isAdding = !this.isAdding;
    },
    saveNewTask() {
      // if (!this.taskToSave) return;
      this.$store.dispatch({ type: 'saveTask', task: this.taskToSave, taskGroup: this.taskGroup });
      this.isAdding = !this.isAdding;
    }
  },

 
components: {
  draggable,
  taskPreview
  // card
}
}
</script>

<style lang="scss" scoped>


.title-modal{
  width: 120px;
  height: 85px;
  position: absolute;
  background-color: rgb(252, 250, 247);
  justify-content: center;
  right: 1%;
  top: 95%;
  div {
    // margin-top: 7px;
    height: 30px;
    cursor: pointer;
  }
      div:hover {
        background-color: rgb(187, 185, 183)
      }
    
}
.fa-trash-alt {
  margin-left: 2px;
  float: left;
}
</style>
