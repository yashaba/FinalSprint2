
<template>
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
          <div class="details-labels">Due Date:</div>
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
            <div :attachment ="attachment"><img :src="`${attachment}`"></div>
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
        <button>
          <i class="far fa-clock"></i>Due Date
        </button>
        <button>
          <i class="fas fa-paperclip"></i>Attachment
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
        <hr>
        <label>Title</label>
        <input type="text" v-model="checklistTitle" placeholder="Checklist"/>
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
import Avatar from '../components/avatar.vue'
import checkList from './checkList.vue'

export default {
  name: "task-details",
  data() {
    return {
      task: null,
      isChecklistModal: false,
      positionX: null,
      positionY: null,
      checklistTitle: ''
    };
  },

  computed: {
    board() {
      // this.$store.getters.currBoard
    }
  },

  created() {
    console.log("tft");
    eventBus.$on("closer-clicked", () => {
      console.log("event bus working");
      this.task = null;
    });

    eventBus.$on(SHOW_DETAILS, task => {
      this.task = task;
      console.log(task);
    });
  },
  destroyed() {
    eventBus.$off(SHOW_DETAILS);
  },

  methods: {
    updateCheckLists(updatedCheckList) {
     console.log( updatedCheckList);
      this.task.checkLists[updatedCheckList.idx].list = updatedCheckList.list
      this.$emit('updateTaskEv', this.task)
    },
    closeDetails() {
      this.task = null;
    },

    onRemove() {
      console.log("remove", this.task);
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
      console.log(checklistTitle);
      let checklistTitleCopy = JSON.parse(JSON.stringify(checklistTitle))
      this.$store.dispatch({ type: 'addNewChecklist', checklistToSave: checklistTitleCopy, task: this.task})
    }
  },
  computed: {},
  components: {
    taskGroup,
     Avatar,
     checkList
  }
};
</script>

<style scoped>
  textarea {
    resize: none;
  }
</style>
