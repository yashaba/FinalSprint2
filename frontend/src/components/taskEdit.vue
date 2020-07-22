<template>
  <section :style="{'top': positionY, 'left': positionX}" class="task-edit flex" v-if="task">
      <div>
        <textarea-autosize
          class="edit-textarea"
          placeholder="Type something here..."
          ref="myTextarea"
          v-model="task.title"
          :min-height="30"
          :max-height="350"
        />
          <!-- @focus.native="onFocusTextarea" -->
        <button class="btn-save-task" @click="saveTask">Save</button>
        <button class="btn-close" @click="close({}, true)">&times;</button>
      </div>
      <div class="btns-edit-container">
        <button class="btn-edit-modal" @click="toggleLabelsModal">
          <i class="fas fa-tag"></i>
          Edit Labels
        </button>
        <labels-modal v-if="isLabelsModal" :task="task" @closeLabelsModal="toggleLabelsModal"/>
        <button class="btn-edit-modal">
          <i class="far fa-user"></i>
          Change Members
        </button>
        <button class="btn-edit-modal">
          <i class="fas fa-arrow-right"></i>
          Move
        </button>
        <button class="btn-edit-modal">
          <i class="fas fa-copy"></i>
          Copy
        </button>
        <button class="btn-edit-modal">
          <i class="far fa-clock"></i>
          Change Due Date
        </button>
        <button class="btn-edit-modal" @click="onRemove">
          <i class="far fa-trash-alt"></i>
          Remove
        </button>
      </div>
  </section>
</template>

<script>
import { eventBus, SHOW_EDIT_TASK, STOP_SCREEN_MODE } from '../services/event-bus.service.js';
import labelsModal from "./labelsModal.vue";

export default {
    name: 'task-edit',

    components: {
      labelsModal
    },

    data() {
      return {
        task: null,
        positionX: null,
        positionY: null,
        isLabelsModal: false
      }
    },

    methods: {
      close(ev = {}, click = false) {
        if (ev.key == 'Escape' || click) {
          eventBus.$emit(STOP_SCREEN_MODE, {});
          this.task = null;
          this.isLabelsModal = false;
        }
      },
      saveTask() {
        this.$store.dispatch({ type: 'updateTask', task: this.task });
        eventBus.$emit(STOP_SCREEN_MODE, {});
        this.task = null;
        this.isLabelsModal = false;
        },
      onRemove() {
        this.$emit("removeTaskEv", this.task);
        this.task = null;
      },
      toggleLabelsModal() {
        this.isLabelsModal = !this.isLabelsModal;
      }
      // onFocusTextarea() {
      //   this.$nextTick(() => {
      //   this.$refs.myTextarea.focus()
      // })
        // this.$refs.myTextarea.$el.select()
      //   this.$refs.myTextarea.focus();
      // }
    },

    created() {
      eventBus.$on("closer-clicked", () => {
      eventBus.$emit(STOP_SCREEN_MODE, {});
      this.task = null;
      this.isLabelsModal = false;
      })

      eventBus.$on(SHOW_EDIT_TASK, task=>{
        this.task = task.task;
        this.positionX = `${task.position.positionX}px`;
        this.positionY = `${task.position.positionY}px`;
      })
      window.addEventListener('keydown', this.close);
  },

  destroyed(){
      eventBus.$off(SHOW_EDIT_TASK);
      window.removeEventListener('keydown', this.close);
  },
}

</script>

<style scoped>
  .task-edit {
    position: absolute;
  }

</style>