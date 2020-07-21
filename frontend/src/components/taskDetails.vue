
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
          <div class="details-labels">
            Labels:
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
          <i class="fas fa-paperclip"></i>Attachments:
          <div class="attachments" v-for="(attachment, idx) in task.attachments" :key="idx">
            <div :attachment="attachment">
              <img :src="`${attachment}`" />
              <button @click="deleteAttachment(idx)">Delete</button>
            </div>
            <br />
          </div>
          <button v-if="task.attachments">
            Add an attachment
            <input type="file" @change="onUploadImg" />
          </button>

          <br />
        </div>
        <div class="details-checkList">
          <i class="far fa-check-square"></i>
          CheckList:
          <br />
          <div v-for="(checkList , idx) in task.checkLists " :key="idx">
            <h4>{{checkList.title}}</h4>

            <check-list @updateChecklistEv="updateCheckLists" :idx="idx" :checkList="checkList"></check-list>
          </div>
          <!-- {{task.checkList}} -->
        </div>
      </div>
      <div class="details-actions">
        <h3>ADD TO CARD</h3>
        <button class="btn-details-actions">
          <i class="far fa-user"></i>Members
        </button>
        <button class="btn-details-actions" @click="openLabels">
          <i class="fas fa-tag"></i>Labels
        </button>
        <labels-modal v-if="editLabels" :task="task" @closeLabelModal="closeLabelModal" />
        <button class="btn-details-actions" @click="openChecklistModal">
          <i class="far fa-check-square"></i>CheckList
        </button>
        <button class="btn-details-actions" @click="focusOnPicker">
          <i class="far fa-clock"></i>Due Date
        </button>
        <button class="btn-details-actions">
          <i class="fas fa-paperclip"></i>Attachment
          <input type="file" @change="onUploadImg" />
        </button>
        <color-picker v-if="isColorPickerOpen" v-model="task.bgColor" />
        <button class="btn-details-actions" @click="openColorPicker">
          <i class="far fa-window-maximize"></i>Cover
        </button>
        <button class="btn-details-actions" @click="onRemove">
          <i class="far fa-trash-alt"></i>Remove
        </button>
      </div>
    </div>

    <div class="checklist-modal" v-if="isChecklistModal">
      <div class="checklist-modal-container">
        <div class="flex align-center space-between">
          <h5>Add CheckList</h5>
          <button class="btn-close" @click="close">&times;</button>
        </div>
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
import datePicker from "./datePicker";
import labelsModal from "./labelsModal.vue";
import colorPicker from "./color-picker.cmp.vue";
import taskPreviewLabelsList from "./taskPreviewLabelsList.vue";

export default {
  name: "task-details",
  data() {
    return {
      task: null,
      isChecklistModal: false,
      isColorPickerOpen: false,
      checklistTitle: "",
      value1: null,
      editLabels: false,
      checklistTitle: "",
      img: ""
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
    async onUploadImg(ev) {
      var res = await uploadImg(ev);
      this.img = res.url;
      this.task.attachments.unshift(this.img);
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
      this.updateTask();
    },
    updateTask() {
      this.$emit("updateTaskEv", this.task);
    },
    closeDetails() {
      this.task = null;
    },

    onRemove() {
      this.$emit("removeTaskEv", this.task);
      this.task = null;
    },
    deleteAttachment(idx) {
      this.task.attachments.splice(idx, 1);
      this.updateTask();
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
    openLabels() {
      this.editLabels = true;
    },
    closeLabelModal() {
      this.editLabels = false;
    }
  },
  computed: {},
  components: {
    taskGroup,
    Avatar,
    checkList,
    datePicker,
    labelsModal,
    taskPreviewLabelsList,
    colorPicker
  }
};
</script>

<style scoped>
textarea {
  resize: none;
}
</style>
