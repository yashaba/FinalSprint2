<template>
  <section class="labels-list">
    <div v-for="labelId in sortedLabels" :key="labelId">
      <task-preview-labels-list-item :labelId="labelId" />
    </div>
  </section>
</template>

<script>
import taskPreviewLabelsListItem from './taskPreviewLabelsListItem.vue';

export default {
  components: {
    taskPreviewLabelsListItem
  },
  
  name: 'task-preview-labels-list',
  
  props: ['labels'],

  computed: {
    sortedLabels() {
      if (!this.labels) return;
      return this.labels.sort((a, b) => a > b ? 1 : -1);
    }
  },
}
</script>

<style>
  .labels-list {
    position: relative;
    top: 10px;
    margin-left: 10px;
  }

  .label {
    border-radius: 10px;
    padding: 2px 10px;
    display: inline;
  }

</style>