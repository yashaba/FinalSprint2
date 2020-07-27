<template>
    <div class="chart">
      <div class="container">
        <button @click="close">
          <i class="fas fa-times"></i>
        </button>
        <chartData class="chart-data" />
        <div class="charts-container">
          <chartBoardMembers class="chart-members"/>
          <chart class="chart-tasks-group"/>
          <chartBoardLabels class="chart-labels"/>
        </div>
      </div>
    </div>
</template>

<script>
import Chart from './Chart.vue';
import chartBoardLabels from './ChartBoardLabels.vue';
import chartBoardMembers from './ChartBoardMembers.vue';
import chartData from './ChartData.vue';

import { eventBus, OVERLAY_EFFECT, STOP_OVERLEY_EFFECT } from '../services/event-bus.service.js';

export default {
  name: 'charts-modal',

  components: {
    Chart,
    chartBoardLabels,
    chartBoardMembers,
    chartData,
  },

  methods: {
     close() {
      eventBus.$emit(STOP_OVERLEY_EFFECT, {});
      this.$emit("closeChartsModal");
    }
  },

  created() {
    eventBus.$emit(OVERLAY_EFFECT, {});

    eventBus.$on("closer-clicked", () => {
      this.close();
    })
  }

}
</script>

<style>

</style>