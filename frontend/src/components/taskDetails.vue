
<template>
  <!-- גגםשדןגםןדשחג -->
  <section v-if="task" class="task-details">
    <div class="header">
      <div>
        <i class="fas fa-window-maximize"></i>
        {{task.title}}
      </div>
      <button @click="closeDetails">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="details-container">
      <div class="details-info">
        <div class="details-edit">
          <div class="details-members">
            Members:
            <br />
            <!-- <div class="members" v-for="assignedUser in task.assignedUsers" :key="assignedUser.id">
            <div :assignedUser="assignedUser"><avatar :users="task.assignedUsers"/></div>-->
            <div class="members flex">
              <div class="avatars flex">
                <avatar class="flex" :users="task.assignedUsers" />

                <div class="add">
                  <i class="fas fa-plus"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="details-labels">Labels:</div>
          <div  v-if="task.dueDate.date" class="details-labels">Due Date:
             <el-date-picker
             @input="updateTask"
             style="opacity: 0"
             ref="datepicker"
               v-model="task.dueDate.date"
               type="date"
               placeholder="Pick a day">
          </el-date-picker>
          <date-picker :dueDate='task.dueDate'></date-picker>
          
          </div>
        </div>
        <div class="details-desc">
          <div>
            <i class="fas fa-align-left"></i>
            <span>Description</span>
          </div>
          <textarea placeholder="Add a more details description..." rows="1">{{task.desc}}</textarea>
        </div>
        <div class="details-attachments">
          <i class="fas fa-paperclip"></i>Attachments:
          <div class="attachments" v-for="attachment in task.attachments" :key="attachment.id">
            <div :attachment="attachment">
              <img :src="`${attachment}`" />
            </div>
            <img :src="img" />
          </div>
          <br />
        </div>
        <div class="details-checkList">
          <i class="far fa-check-square"></i>
          CheckList:
          <br />
          <div v-for="(checkList , idx) in task.checkLists " :key="idx">
           <h4> {{checkList.title}} </h4>
           
          <check-list @updateChecklistEv='updateCheckLists' :idx="idx" :checkList="checkList"> </check-list>
          
          </div>
          <!-- {{task.checkList}} -->
        </div>
      </div>
      <div class="details-actions">
        <h3>ADD TO CARD</h3>
        <button>
          <i class="far fa-user"></i>Members
        </button>
        <button>
          <i class="fas fa-tag"></i>Labels
        </button>
        <button @click="openChecklistModal">
          <i class="far fa-check-square"></i>CheckList
        </button>
        <button @click="focusOnPicker">
          <i class="far fa-clock"></i>Due Date
        </button>
        <button>
          <i class="fas fa-paperclip"></i>Attachment
          <input type="file" @change="onUploadImg" />
        </button>
        <button>
          <i class="far fa-window-maximize"></i>Cover
        </button>
        <button @click="onRemove">
          <i class="far fa-trash-alt"></i>Remove
        </button>
      </div>
    </div>

    <div class="checklist-modal" v-if="isChecklistModal">
      <div class="checklist-modal-container">
        <button class="btn-close" @click="close">&times;</button>
        <h6>Add CheckList</h6>
        <hr />
        <label>Title</label>
        <input type="text" v-model="checklistTitle" placeholder="Checklist" />
        <button class="btn-add-checklist" @click="addChecklist(checklistTitle)">Add</button>
      </div>
    </div>
  </section>
</template>

<script>
import taskGroup from "../components/taskGroup.vue";
// import {boardService} from '../services/board-service.js'
var boardService = require("../services/board-service.js");
import { eventBus, SHOW_DETAILS } from "../services/event-bus.service.js";
import Avatar from "../components/avatar.vue";
import checkList from "./checkList.vue";
import { uploadImg } from "../services/imgUpload.service";
import datePicker from './datePicker'

export default {
  name: "task-details",
  data() {
    return {
      task: null,
      isChecklistModal: false,
      checklistTitle: '',
      value1: null,
      // positionX: null,
      // positionY: null,
      checklistTitle: "",
      img: '',
      taskToEdit: ''
    };
  },

  computed: {
    board() {
      // this.$store.getters.currBoard
    }
  },

  created() {
    eventBus.$on("closer-clicked", () => {
      this.task = null;
    });

    eventBus.$on(SHOW_DETAILS, task => {
      this.task = task;
      this.taskToEdit = task;
    });
  },
  destroyed() {
    eventBus.$off(SHOW_DETAILS);
  },

  methods: {
    async onUploadImg(ev) {
      var res = await uploadImg(ev);
      let img = res.url;
      this.img = res.url;
      this.taskToEdit.attachments.unshift(this.img)
      this.updateTask();
    },
    focusOnPicker(){
      this.task.dueDate.date = Date.now()
      setTimeout(()=> {this.$refs.datepicker.focus()}, 0.1)
     
    },
    updateCheckLists(updatedCheckList) {
      this.task.checkLists[updatedCheckList.idx].list = updatedCheckList.list;
      this.$emit("updateTaskEv", this.task);
    },
    updateTask(){
      this.$emit('updateTaskEv', this.task)
    },
    closeDetails() {
      this.task = null;
    },

    onRemove() {
      this.$emit("removeTaskEv", this.task);
      this.task = null;
    },
    openChecklistModal() {
     
      this.isChecklistModal = true;
      // this.positionX = `${event.clientX}px`;
      // this.positionY = `${event.clientY}px`;
    },
    close() {
      this.isChecklistModal = !this.isChecklistModal;
    },
    addChecklist(checklistTitle) {
      let checklistTitleCopy = JSON.parse(JSON.stringify(checklistTitle));
      this.checklistTitle = "";
      this.$store.dispatch({
        type: "addNewChecklist",
        checklistToSave: { title: checklistTitleCopy, list: [] },
        task: this.task
      });

      this.close();
      this.isChecklistModal = false;
    },
    //   uploadImg() {
    //   debugger
    //   task.attachments.unshift(this.img)
    //    this.$store
    //     .dispatch({ type: "saveTask", task: this.taskToEdit })
    //     console.log(task);
        
    // }
  },
  computed: {},
  components: {
    taskGroup,
     Avatar,
     checkList,
     datePicker
  }
};
</script>

<style scoped>
textarea {
  resize: none;
}
</style>
