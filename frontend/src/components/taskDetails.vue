<template>
  <section v-if="task" class="task-details">
    <div class="task-details-container">
      <div class="header-details">
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
              <span class="members-title">MEMBERS</span>
              <div class="members flex">
                <div class="avatars flex">
                  <avatar class="flex" :users="task.assignedUsers" :entity="task" context="task" />

                  <div class="add">
                    <i class="fas fa-plus" @click="toggleMembersModal"></i>
                    <members-modal v-if="isMembersModal" :task="task" @closeMemberModal="toggleMembersModal"/>
                  </div>
                </div>
              </div>
            </div>
            <div class="details-labels">
              <span class="labels-title">Labels</span>
              <task-preview-labels-list :labels="task.labels" />
            </div>
            <div v-if="task.dueDate.date" class="details-labels">
              Due Date:
              <el-date-picker
                @input="updateTask"
                style="opacity: 0"
                ref="datepicker"
                v-model="task.dueDate.date"
                type="date"
                placeholder="Pick a day"
              ></el-date-picker>
              <div class="flex">
                <date-picker :dueDate="task.dueDate"></date-picker>
                <el-checkbox class="el-checkbox" @input="updateTask" v-model="task.dueDate.isDone"></el-checkbox>
              </div>
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
            <i class="fas fa-paperclip"></i>
            <span class="title">Attachments</span>
            <div class="attachments" v-for="(attachment, idx) in task.attachments" :key="idx">
              <div :attachment="attachment">
                <img :src="`${attachment}`" />
                <button class="attacment-btn" @click="deleteAttachment(idx)">Delete</button>
              </div>
              <br />
            </div>
            <button
              class="add-attachment-btn"
              @click="$refs.fileBtn.click()"
              v-if="task.attachments"
            >Add an attachment</button>
            <input type="file" ref="fileBtn" style="display:none" @change="onUploadImg" />

            <br />
          </div>
          <div class="details-checkList">
            <div v-for="(checkList , idx) in task.checkLists " :key="idx">
              <!-- <h4>{{checkList.title}}</h4> -->
              <i class="far fa-check-square"></i>
              <span class="checkList-title">{{checkList.title}}</span>
              <br />

            <check-list @updateActivityLogEv='updateActivityLog' @updateChecklistEv="updateCheckLists" :idx="idx" :checkList="checkList"></check-list>
          </div>
        </div>

                    <div> 
          Activity log: <br />
          <activity-log :task="task"></activity-log>


        </div>
        </div>



        <div class="details-actions">
          <h3>ADD TO TASK</h3>
          <button class="btn-details-actions" @click="toggleMembersModal">
            <i class="far fa-user"></i>Members
          </button>
          <button class="btn-details-actions" @click="toggleLabelsModal">
            <i class="fas fa-tag"></i>Labels
          </button>
          <labels-modal v-if="isLabelsModal" :task="task" @closeLabelsModal="toggleLabelsModal" />
          <button class="btn-details-actions" @click="toggleChecklistModal">
            <i class="far fa-check-square"></i>CheckList
          </button>
          <button class="btn-details-actions" @click="focusOnPicker">
            <i class="far fa-clock"></i>Due Date
          </button>
          <button class="btn-details-actions" @click="$refs.fileBtn.click()">
            <i class="fas fa-paperclip"></i>Attachment
            <input type="file" ref="fileBtn" style="display:none" @change="onUploadImg" />
          </button>
          <color-picker v-if="isColorPickerOpen" v-model="task.bgColor" />
          <button class="btn-details-actions" @click="openColorPicker">
            <i class="far fa-window-maximize"></i>Cover
          </button>
          <button class="btn-details-actions" @click="onRemove">
            <i class="far fa-trash-alt"></i>Remove
          </button>
        </div>
                <!-- <div> 
          Activity log: <br />
          <activity-log :task="task"></activity-log>


        </div> -->
      <!-- </div> -->
      </div>

      <div class="checklist-modal" v-if="isChecklistModal">
        <div class="checklist-modal-container">
          <div class="flex align-center space-between">
            <h5>Add CheckList</h5>
            <button class="btn-close" @click="toggleChecklistModal">&times;</button>
          </div>
          <hr />
          <label>Title</label>
          <input type="text" v-model="checklistTitle" placeholder="Checklist" />
          <button class="btn-add-checklist" @click="addChecklist(checklistTitle)">Add</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import taskGroup from "../components/taskGroup.vue";
// import {boardService} from '../services/board-service.js'
var boardService = require("../services/board-service.js");
import { eventBus, SHOW_DETAILS, STOP_OVERLEY_EFFECT } from "../services/event-bus.service.js";
import Avatar from "../components/avatar.vue";
import checkList from "./checkList.vue";
import { uploadImg } from "../services/imgUpload.service";
import datePicker from "./datePicker";
import labelsModal from "./labelsModal.vue";
import colorPicker from "./color-picker.cmp.vue";
import taskPreviewLabelsList from "./taskPreviewLabelsList.vue";
import membersModal from './membersModal.vue'
import activityLog from "./activityLog.vue"

export default {
  name: "task-details",
  data() {
    return {
      task: null,
      isChecklistModal: false,
      isColorPickerOpen: false,
      checklistTitle: "",
      value1: null,
      isLabelsModal: false,
      checklistTitle: "",
      img: "",
      isMembersModal: false
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
      this.task = JSON.parse(JSON.stringify(task));
    });
  },
  destroyed() {
    eventBus.$off(SHOW_DETAILS);
  },

  methods: {
    toggleMembersModal() {
      this.isMembersModal = !this.isMembersModal;
    },
    async onUploadImg(ev) {
      var res = await uploadImg(ev);
      this.img = res.url;
      this.task.attachments.unshift(this.img);
      this.updateActivityLog(this.img, "ADD")
      this.updateTask();
    },
    focusOnPicker() {
      this.task.dueDate.date = Date.now();
      setTimeout(() => {
        this.$refs.datepicker.focus();
      }, 0.1);
    },
    openColorPicker() {
      this.isColorPickerOpen = !this.isColorPickerOpen;
      if (!this.isColorPickerOpen) {
        this.updateTask();
      }
    },
    updateCheckLists(updatedCheckList) {
      this.task.checkLists[updatedCheckList.idx].list = updatedCheckList.list;
      console.log('updated checklist' , this.task.checkLists[updatedCheckList.idx] );
      this.updateTask();
    },
    updateTask() {
      this.$emit("updateTaskEv", this.task);
    },
    closeDetails() {
      eventBus.$emit(STOP_OVERLEY_EFFECT, {});
      this.task = null;
    },

    onRemove() {
      this.$emit("removeTaskEv", this.task);
      eventBus.$emit(STOP_OVERLEY_EFFECT, {});
      this.task = null;
    },
    deleteAttachment(idx) {
      this.updateActivityLog(this.task.attachments[idx], "DELETE_TYPE")
      this.task.attachments.splice(idx, 1);
      this.updateTask();
    },
    toggleChecklistModal() {
      this.isChecklistModal = !this.isChecklistModal;
    },
    addChecklist(checklistTitle) {
      this.updateActivityLog(checklistTitle, "ADD")
      let checklistTitleCopy = JSON.parse(JSON.stringify(checklistTitle));
      this.checklistTitle = "";
      this.$store.dispatch({
        type: "addNewChecklist",
        checklistToSave: { title: checklistTitleCopy, list: [] },
        task: this.task
      });

      this.isChecklistModal = false;
    },
    toggleLabelsModal() {
      this.isLabelsModal = !this.isLabelsModal;
    },
        updateActivityLog(txt, type) {
          console.log("activity log in details",  type);

        let activity = {txt: txt, task: this.task}
        activity.type = type
        this.$emit('updateActivityLogEv' , activity )
    },
  },
  computed: {},
  components: {
    taskGroup,
    Avatar,
    checkList,
    datePicker,
    labelsModal,
    taskPreviewLabelsList,
    colorPicker,
    membersModal,
    activityLog
  }
};
</script>

<style scoped>
textarea {
  resize: none;
}
</style>
