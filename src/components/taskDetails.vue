
<template>
  <section v-if="task" class="column">
    <h1>{{task}}</h1>
    <button @click="closeDetails">close</button>
    <div></div>
  </section>
</template>

<script>
import taskGroup from "../components/taskGroup.vue";
// import {boardService} from '../services/board-service.js'
var boardService = require("../services/board-service.js");
import { eventBus, SHOW_DETAILS } from "../services/event-bus.service.js";

export default {
  data() {
    return {
      task: null
    };
  },
  computed: {
    board() {
      // this.$store.getters.currBoard
    }
  },

  created() {
      console.log('tft');
      
        eventBus.$on(SHOW_DETAILS, task=>{
            this.task = task;
            console.log(task);
    })
  },
  destroyed(){
      eventBus.$off(SHOW_DETAILS);
  },


  methods: {
    closeDetails() {
        this.task = null
    }
    },
  computed: {},
  components: {
    taskGroup
  }
}
</script>

<style>
</style>
