<template>
  <!-- <div> -->
    <div @mousedown.stop="taskGroupClickedEv" ref="taskgroup"  :style="{ transform: transformString }" class="task-group flex column closer">
      <div class="closer relative flex space-between align-center">
        <p class="group-title">{{taskGroup.title}}</p> 
        <button class="btn-edit closer" @click="openTaskGroupModal">...</button>
        <div v-if="taskModalShown" class="title-modal column ">
           <div @click="isAdding = true , taskModalShown = false"> <i class="fas fa-plus"></i> Add new task </div>
           <div @click="duplicateTaskGroup"><i class="fas fa-copy"></i> Duplicate List</div>
           <div  @click="removeTaskGroup"> <i class="far fa-trash-alt"></i> Remove list</div>
            </div>
      </div>
      <div class="tasks1 closer">
    <!-- <h1> {{this.columns.columnTitle}}</h1> -->
        <div class="tasks-container">
          <draggable   class="list-group closer"
          tag="div"   
          v-bind="dragOptions" v-model="taskGroup.tasks" group="people" @start="drag=true, isDragging= true" @end="drag=false;updateBoardEv();isDragging=false;dragEndEv()">
          <div v-for="task in taskGroup.tasks" :key="task.id">
            <task-preview @logClickEv='logClick' @previewClickedEv="previewClickedEv" :id="task._id" :task="task"></task-preview>
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
                    ref="myTextarea"
                    v-model="taskToSave.title"
                    :min-height="30"
                    :max-height="350"
                />
                    <!-- @focus.native="onFocusTextarea" -->
                <button class="btn-save-task" type="submit">Add</button>
              </form>
              <button class="btn-close" @click="close">&times;</button>
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
   
    console.log(this.$refs);
    eventBus.$on('closer-clicked', () => {
             
             this.isAdding = false
             this.taskModalShown = false
           })
  }
  ,
  computed: {
    dragOptions() {
      return {
        animation: 400,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
        chosenClass: "chosen-class",
        dragClass: "drag-class",
      

      };
    },
    transformString() {
     const { x, y } = this.interactPosition
     return `translate3D(${x}px, ${y}px, 0)`
   }
  },

  methods: {
      taskGroupClickedEv(event){
      console.log('emited');
    this.$emit('taskGroupClickedEv', {ev: event, id: this.taskGroup._id} )
    },
    myFunc() {
      console.log('clicked');
    },
   
    previewClickedEv(res){
      this.$emit('previewClickedEv', res)
      
      
    },
    logClick(ev){
      // this.elementToClone = id
      console.log('tete',ev)
    },
    clone(ev){
      let clone = null
      console.log('is dragging' , this.isDragging);
      console.log('clone start',this.elementToClone);
      let elem = document.querySelector(`#${this.elementToClone}`);
      console.log(elem);
      clone = elem.cloneNode(true);
      clone.id = taskGroupService.makeId()
       clone.style.position = 'absolute';
       clone.style.width = '252px'
       clone.style.display = 'none'
       clone.classList.add('rotate')
      //  clone.style.transform = 'rotate(10deg)'
       clone.classList.add('elem2')
       var elContainer = document.querySelector('.list-group')
       this.elClone = clone


      // window.addEventListener('dragstart',function(e){
  
      //   }

// );
          //  window.addEventListener('dragend', function(e){
          //    let cloneEl = document.getElementById(`${clone.id}`)
          //    console.log('drag end' , cloneEl );
          //   // elContainer.removeChild(cloneEl)
          //   // console.log('body', body);
          //   //  clone.parentNode.removeChild(clone);
          //    clone.style.display = 'none'
          //    clone = null

            //  window.removeEventListener('drag',true)
            //  }
    //  );
        //  window.addEventListener('drag', function(e){
       
        //  var left = e.pageX - ev.offsetX +"px";
        //  var top = e.pageY-ev.offsetY+"px";
        //  clone.style.left = left;
        //  clone.style.top = top;
        //           }
        //   );

    },
    openTaskGroupModal() {
      setTimeout(()=> {
        
          this.taskModalShown = true

        }, 0.2) 
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
     setTimeout(()=> {this.isAdding = true;}, 0.3)
      
    },
    close() {
      this.isAdding = !this.isAdding;
      this.taskToSave.title = ''
     
    },
    saveNewTask() {
      let taskToSaveCopy = JSON.parse(JSON.stringify(this.taskToSave))
      this.$store.dispatch({ type: 'saveTask', task: taskToSaveCopy, taskGroup: this.taskGroup });
      this.isAdding = !this.isAdding;
      this.taskToSave.title = ''    
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
