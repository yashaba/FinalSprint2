<template>
  <section class="labels-list">
      <task-preview-labels-list-item
        v-for="labelId in labels"
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
    // sortedLabels() {
    //   if (!this.labels) return;
    //   return this.labels.sort((a, b) => a > b ? 1 : -1);
    // },

    showFullLabel() {
      return this.$store.getters.showFullLabel;
    }
  },

  methods: {
    labelClicked(label) {
      this.$store.dispatch('toggleShowFullLabel');
      // this.$emit('labelClicked', label);
    }
  },
}
</script>

<style>
</style>