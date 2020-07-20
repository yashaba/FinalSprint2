<template>
  <div class="label" :style="{ 'background-color': label.bgColor }">
        {{ label.name }}
    </div>
</template>

<script>
export default {
    name: "task-preview-labels-list-item",

    props: ['labelId'],

    computed: {
        label() {
            return this.$store.getters.getLabels.find(label => label._id === this.labelId);
        }
    }
}
</script>

<style>

</style>