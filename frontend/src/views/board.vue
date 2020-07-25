<template>
  <section class="flex column" style="height: 100vh" v-if="board" :class="{screen: screen.isScreen}">
    <div class="chart" v-if="isDashboards">
        <button @click="dashbordsToShow">
        <i class="fas fa-times"></i>
      </button>
  <chartData class="chart-data" />
  <div class="charts-container">
  <chartBoardMembers class="chart-members"/>
  <chart  class="chart-tasks-group"/>
  <chartBoardLabels class="chart-labels"/>
  </div>
  </div>
  <div class="board-vue">
    <!-- <div @click="log" class="overlay"> test</div> -->
    <task-edit @removeTaskEv="removeTask" />
    <task-details @updateActivityLogEv='updateActivityLog' @updateTaskEv="updateTask" @removeTaskEv="removeTask"></task-details>
    <div class="info flex align-center">
    <button :board="board" @click="dashbordsToShow">Dashboards</button>
        <avatar class="members flex" :users="board.members" context="board" />
      <button class="btn-add-member" @click="addMemberModal">Add member</button>
      <board-new-member-modal
        v-if="isAddMemberModal"
        @closeAddMemberModal="closeAddMemberModal"
        @addMemberToBoard="addMemberToBoard"
      ></board-new-member-modal>
    </div>
    <div class="board-page">
      <div class="flex closer">
        <draggable
        handle=".handle , .tasks-container"
          class="list-group closer flex flex-start"
          tag="div"
          v-bind="dragOptions"
          v-model="board.taskGroups"
          group="columns"
          @start="drag=true"
          @end="drag=false ; updateBoard(board) , cloneDragEnd()"
        >
          <div v-for="taskGroup in board.taskGroups" :key="taskGroup.id">
            <task-group 
            :id="taskGroup._id"
            @previewClickedEv="elDragableClicked"
            @taskGroupClickedEv='elDragableClicked'
            class="list-group-item"
              @dragEndEv= cloneDragEnd
             
              @duplicateTaskGroupEv="duplicateTaskGroup"
              @removeTaskGroupEv="removeTaskGroup"
              @updateBoardEv="updateBoard(board)"
              :taskGroup="taskGroup"
            ></task-group>
          </div>
        </draggable>
        <div @click="addingTask = true" class="task-add flex justify-center align-center closer">
          <div @click="addingTask = true" class="closer" v-if="!addingTask">Add task group</div>
          <div class="add-group-inputs flex column" v-if="addingTask">
            <input placeholder="Enter a title" type="text" v-model="newGroupTitle" />
            <div>
              <button
                class="btn-save-group"
                @click.stop="createTaskGroup(newGroupTitle),newGroupTitle = '' "
              >Add Group</button>
              <button class="btn-close" @click.stop="addingTask = !addingTask">
                <i class="fas fa-times fa-lg"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </section>
</template>



<script>
import draggable from "vuedraggable";
import interact from "interactjs";
import taskGroup from "../components/taskGroup.vue";
import taskDetails from "../components/taskDetails.vue";
import taskEdit from "../components/taskEdit.vue";
import { taskGroupService } from "../services/task-group-service.js";
// import {boardService} from '../services/board-service.js'
var boardService = require("../services/board-service.js");
import SocketService from "../services/SocketService";
import Avatar from "../components/avatar.vue";
import boardNewMemberModal from "../components/boardNewMemberModal.vue";
// import memberProfileModal from '../components/memberProfileModal.vue';
import Chart from '@/components/Chart.vue';
import chartBoardLabels from '@/components/ChartBoardLabels.vue';
import chartBoardMembers from '@/components/ChartBoardMembers.vue';
import chartData from '@/components/ChartData.vue';



import {
  eventBus,
  SCREEN_MODE,
  STOP_SCREEN_MODE
} from "../services/event-bus.service";

export default {
  data() {
    return {
      dragTargetEv: null,
      isDragging: false,
       elClone: null,
      elementToClone: null,
      board: null,
      newGroupTitle: "",
      addingTask: false,
      screen: {
        isScreen: false
      },
      isAddMemberModal: false,
      isDashboards: false
      // isMemberModal: false
    };
  },
  computed: {
    isAdding() {
      return this.addingTask;
      // this.$store.getters.currBoard
    },
    
  },

  created() {

     window.addEventListener('click', this.myFunc)
    window.addEventListener('dragstart', this.cloneDragStart)
    window.addEventListener('drag', this.cloneDrag)
    // window.addEventListener('mousemove', this.cloneDrag)
    window.addEventListener('dragend', this.cloneDragEnd)
    window.addEventListener('drop', this.cloneDragEnd)
    window.addEventListener('mouseup', this.cloneDragEnd)

this.$store.dispatch({ type: "loadUsers" })
    this.$store.dispatch({ type: 'loadBoard' , id: this.$route.params.id }).then(board => {
      this.board = board;
    
      SocketService.setup();
      SocketService.emit("boardJoined", this.board._id);
      SocketService.on("taskUpdate", this.onUpdateTask);
      SocketService.on("boardUpdate", this.onUpdateBoard);
     
    });
    window.onclick = function(ev) {
      if (ev.target.classList.contains("closer")) {
        this.addingTask = false;
        eventBus.$emit("closer-clicked");
      }
      // console.log('window clickied', ev.target.classList[0]);
    };

    eventBus.$on("closer-clicked", () => {
      this.addingTask = false;
    });

    eventBus.$on(SCREEN_MODE, () => {
      this.screen.isScreen = true;
    });

    eventBus.$on(STOP_SCREEN_MODE, () => {
      this.screen.isScreen = false;
    });
  },
  destroyed() {
    SocketService.off("taskUpdate", this.onUpdateTask);
    SocketService.off("boardUpdate", this.onUpdateBoard);
    SocketService.terminate();
    window.onclick = null;
  },


  methods: {

    dashbordsToShow(){
      this.isDashboards = !this.isDashboards
    },

      elDragableClicked(elDraggable){
      this.elementToClone = elDraggable.id
      this.clone(elDraggable.ev)
    },

     cloneDragStart(ev){
        document.body.append(this.elClone)
        this.isDragging = true
    },

    cloneDrag(ev){
        this.elClone.style.display = 'block'
        var left = ev.pageX - this.dragTargetEv.offsetX +"px"; // המיקומים כרגע לא 100% ן 
        var top = ev.pageY  - this.dragTargetEv.offsetY+"px";
         this.elClone.style.left = left;
         this.elClone.style.top = top;
    },

    cloneDragEnd(){
      if (!this.elClone) return
      this.elClone.style.display= "none"
      this.elClone = null
    },
        clone(ev){
      let clone = null
      let elem = document.querySelector(`#${this.elementToClone}`);
      clone = elem.cloneNode(true);
      clone.id = taskGroupService.makeId() //////   זה הכנה לאם נרצה למחוק אותו מהדום לגמריי אז שיהיה לו אידי שונה ממי שעשיתי לו קלון
       clone.style.position = 'absolute'; //  זה לא עובד משום מה אם אני מעביר את זה כקלאס
       clone.style.display = 'none'
       clone.classList.add('clone')
       this.elClone = clone
       this.dragTargetEv = ev
    },

    removeTask(task) {
      this.$store.dispatch({ type: "removeTask", task });
      // this.task = null;
    },
    updateBoard(board) {
      this.board.taskGroups.forEach(taskGroupItem => {
        taskGroupItem.tasks.forEach(
          task => (task.taskGroup = taskGroupItem._id)
        );
      });

      this.$store.dispatch({ type: "updateBoard", board });
    },
    onUpdateBoard(board) {
      // console.log("hii board", board);
      this.$store.commit({ type: "saveBoard", board });
      this.board = board;
    },
    updateTask(task) {
      this.$store.dispatch({ type: "updateTask", task: task });
    },
    createTaskGroup(title) {
      this.addingTask = false;
      this.$store.dispatch({ type: "addTaskGroup", title });
    },
    duplicateTaskGroup(taskGroup) {
      this.$store.dispatch({ type: "duplicateTaskGroup", taskGroup });
    },

    removeTaskGroup(taskGroup) {
      this.$store.dispatch({ type: "removeTaskGroup", taskGroup });
    },
    addMemberModal() {
      this.isAddMemberModal = true;
    },
    closeAddMemberModal() {
      this.isAddMemberModal = !this.isAddMemberModal;
    },
    addMemberToBoard(userId) {
      this.$store.dispatch({ type: "addMemberToBoard", userId });
    },
    updateActivityLog(activity){
      let user = this.$store.getters.loggedinUser
      console.log('activityyyy', activity);
      activity.user = user
     this.$store.dispatch({ type: "updateActivityLog", activity});
    }
    // openMemberModal() {
    //   this.isMemberModal = !this.isMemberModal;
    // }
  },
  computed: {
    dragOptions() {
      return {
        fallbackTolerance: 10000,
        animation: 400,
        group: "description",
        disabled: false,
        ghostClass: "tghost",
        chosenClass: "tchosen-class",
        dragClass: "tdrag-class"
      };
    }
  },
  components: {
    taskGroup,
    draggable,
    taskDetails,
    taskEdit,
    Avatar,
    boardNewMemberModal,
    Chart,
    chartBoardLabels,
    chartBoardMembers,
    chartData,
    // memberProfileModal
  }
};
</script>

<style lang="scss" >
.board-page {
  width: 100%;
  overflow-x: auto;
  flex: 1;
  overflow-x: auto;
  margin-bottom: 5px;
  // padding-bottom: 28px;
        // max-height: 60vh;
        &::-webkit-scrollbar-track {
            // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
            border-radius: 8px;
            background-color: #212623d9
        }
        &::-webkit-scrollbar {
            width: 8px;
            background-color: #212623d9;
        }
        &::-webkit-scrollbar-thumb {
            border-radius: 8px;
            // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
            background-color: #808b914d;
        }
    }
.btn-add-member {
  background-color: rgba($color: #e6dcdc, $alpha: 0.5);
  margin-left: 15px;
  border-radius: 4px;
  border: 0;
  outline: 0;
  width: 115px;
  height: 33px;
  // float: right;
  cursor: pointer;
  // transition: ease-in 0.9;
  &:hover {
    background-color: rgba($color: #c5bebe, $alpha: 0.5);
  }
}
.tghost {
  opacity: 0;
}
.tchosen-class {
  opacity: 0;
  // .tdrag-class {
  //   rotate: 10deg;
  //   background: rgba($color: #e71818, $alpha: 1);
  // }
}
.clone {
  // position: absolute;
  // transition: rotate 0.3;
 transform: rotate(10deg);
 
 width: 252px;
   pointer-events: none;
  //  display : none;
}
.pointer-events {
  pointer-events: none;
}

.btn-save-group {
  background-color: #5aac44;
  color: #fbfdfb;
  font-size: 0.9rem;
  padding: 10px;
  border-radius: 3px;
  float: left;
  margin-left: 10px;
  margin-bottom: 10px;
  border: 0;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #61bd4f;
  }
}
.add-group-inputs {
  margin-top: 10px;
  justify-content: center;
  align-items: center;
  .btn-close {
    float: left;
    margin-left: 10px;
    margin-top: 10px;
    font-size: 16px;
    border: 0;
    cursor: pointer;
    outline: none;
    width: 30px;
    background: rgba($color: #cfcdcd, $alpha: 0.1);

    &:hover {
      color: #172b4d;
      // background-color: #ebecf0;
    }
  }
  input {
    outline: 0px;
    border: 0px;
    background-color: #f6f6f6;
  }
  div {
    margin-top: 5px;
  }
}
</style>
