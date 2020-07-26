<template>
  <!-- <div> -->
    <div  ref="taskgroup"   class="task-group flex column closer sortable-fallback">
      <div class="closer relative flex space-between align-center handle">
        <p class="group-title">{{taskGroup.title}}</p> 
        <button v-if="!taskModalShown" class="btn-edit closer ignore-elements" @click="openTaskGroupModal">...</button>
        <button v-else class="btn-close-title-modal ignore-elements" @click="closeTaskModal">&times;</button>
        <div v-if="taskModalShown" class="title-modal column ">
           <div class="ignore-elements" @click="isAdding = true , taskModalShown = false"> 
             <i class="fas fa-plus"></i> 
             Add new task
            </div>
           <div class="ignore-elements" @click="duplicateTaskGroup">
             <i class="fas fa-copy"></i> 
             Duplicate List
            </div>
           <div class="ignore-elements" @click="removeTaskGroup">
            <i class="far fa-trash-alt"></i> 
            Remove list
          </div>
        </div>
      </div>
      <div class="tasks1 closer">
    <!-- <h1> {{this.columns.columnTitle}}</h1> -->
        <div class="tasks-container">
          <draggable   class="list-group closer"
          tag="div"   
          v-bind="dragOptions" v-model="taskGroup.tasks" group="people" @start="drag=true, isDragging= true" @end="drag=false;updateBoardEv();isDragging=false;dragEndEv()">
          <div v-for="task in taskGroup.tasks" :key="task.id">
            <task-preview  :id="task._id" :task="task"></task-preview>
          </div>
          </draggable>
        </div>
        <div>
          <button v-if="!isAdding" class="btn-add-task closer" @click="addTask">
            <i class="fas fa-plus fa-xs"></i> 
            Add task
          </button>
          <div class="add-new-task " v-if="isAdding">
              <form @submit.prevent="saveNewTask">
                <textarea-autosize
                    class="add-textarea"
                    placeholder="Enter a title for this task..."
                    ref="taskDescription"
                    v-model="taskToSave.title"
                    :min-height="30"
                    :max-height="350"
                />
                <button class="btn-save-task" type="submit">Add</button>
              </form>
              <button class="btn-close" @click="closeAdd">&times;</button>
          </div>
        </div>
      </div>
    </div>
  <!-- </div> -->
</template>

<script>
import draggable from "vuedraggable";
import taskPreview from "./taskPreview.vue";
import {taskGroupService} from '../services/task-group-service.js'
import {eventBus} from '../services/event-bus.service'
import interact from 'interactjs'


// import card from './card.vue'
export default {
  props: ["taskGroup"],
  data() {
    return {
      // taskGroup : this.taskGroup,
     
      isAdding: false,
      isDragging: false,
      taskModalShown: false ,
      taskToSave: {
        _id : taskGroupService.makeId(),
        title: '',
        bgColor: "",
        taskGroup: this.taskGroup._id,
        labels: [],
        attachments: [],
        activites: [],
        assignedUsers: [],
        checkList: [],
        at: Date.now(),
        by: {
        fullName: "Brian Cernd",
        imgUrl: "http://some-img",
        _id: "u102"
        },
        desc: "",
        dueDate: {
          date: "",
          isDone: false
        },
      },
          interactPosition: {
         x: 0,
         y: 0
       },
    };
  },
  created() {
   
    eventBus.$on('closer-clicked', () => {
             
             this.isAdding = false
             this.taskModalShown = false
           })
  }
  ,
  computed: {
    dragOptions() {
      return {
        filter: ".ignore-elements",
        forceFallback: true,  // ignore the HTML5 DnD behaviour and force the fallback to kick in
       	fallbackClass: "sortable-fallback",  // Class name for the cloned DOM Element when using forceFallback
	      fallbackOnBody: true,  // Appends the cloned DOM Element into the Document's Body
      	fallbackTolerance: 5, // Specify in pixels how far the mouse should move before it's considered as a drag.
        touchStartThreshold: 5,
        // fallbackTolerance: 5,
        animation: 400,
        group: "description",
        disabled: false,
        ghostClass: "tghost",
        chosenClass: "tchosen-class",
        dragClass: "tdrag-class"
      

      };
    },

  },

  methods: {

    openTaskGroupModal() {
      setTimeout(()=> {
        
          this.taskModalShown = true;

        }, 0.2) 
    },
    closeTaskModal() {
      this.taskModalShown = false;
    },
    dragEndEv(){
    this.$emit('dragEndEv')
    },
 
   updateBoardEv() {
     
     this.$emit ('updateBoardEv')
   },
   removeTaskGroup(){
    this.taskModalShown = false
     this.$emit ('removeTaskGroupEv' , this.taskGroup)
    
   },
   duplicateTaskGroup() {
     this.taskModalShown = false
     this.$emit ('duplicateTaskGroupEv' , this.taskGroup)
   },

    addTask() {
      setTimeout(()=> {
       this.isAdding = true;
      }, 0.3)
      
    },
    closeAdd() {
      this.isAdding = !this.isAdding;
      this.taskToSave.title = ''
     
    },
    saveNewTask() {
      let taskToSaveCopy = JSON.parse(JSON.stringify(this.taskToSave))
      this.$store.dispatch({ type: 'saveTask', task: taskToSaveCopy, taskGroup: this.taskGroup });
      this.isAdding = !this.isAdding;
      this.taskToSave.title = ''  
      this.updateActivityLog("" ,taskToSaveCopy, "CREATE")  
    },
     updateActivityLog(txt , task,type) {
         let activity = { txt: txt ,task: task, type: type  }
        this.$emit('updateActivityLogEv' , activity )
    }
  },

  updated() {
    if (this.isAdding) {
       this.$refs.taskDescription.$el.focus();
    }
  },

  components: {
    draggable,
    taskPreview
  }
}
</script>

<style lang="scss" scoped>



.ghost{
  
  rotate: 10deg;
}
.chosen-class{ 
  // opacity: 1;
  opacity: 0.3;
   
}
 .drag-class{
   opacity: 0;
  
 }
.elem2 {
  // position: absolute;
  // z-index: 999;
  
    pointer-events: none;

}

.rotate {
  transition: rotate 0.3;
 transform: rotate(10deg)
}
.task-preview {
 
  
    // pointer-events: none;

}

.title-modal{
  z-index: 1;
  width: 125px;
  height: 87px;
  position: absolute;
  background-color: #ffffff;
  border-radius: 4px;
  // background-color: rgb(252, 250, 247);
  justify-content: center;
  right: 1%;
  top: 95%;
  box-shadow: 1px 1px 1px 1px #c3cbdc;
  color: #172b4d;
  font-size: 0.9rem;
  font-weight: lighter;
  div {
    // height: 30px;
    cursor: pointer;
    width: 100%;
    padding: 5px;
  }
      div:hover {
        background-color: #dadbe2;
        // background-color: rgb(187, 185, 183)
      }
  i {
    margin-right: 2px;
  }
    
}
// .fa-trash-alt {
//   margin-left: 2px;
//   float: left;
// }
</style>
