<template>
  <section class="labels-list flex">
      <task-preview-labels-list-item
        v-for="labelId in sortedLabels"
        :key="labelId"
        :labelId="labelId"
        @labelClicked="labelClicked"
        :showFullLabel="showFullLabel"
      />
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
    },

    showFullLabel() {
      return this.$store.getters.showFullLabel;
    }
  },

  methods: {
    labelClicked() {
      this.$store.dispatch('toggleShowFullLabel');
    }
  }
}
</script>

<style>
</style>