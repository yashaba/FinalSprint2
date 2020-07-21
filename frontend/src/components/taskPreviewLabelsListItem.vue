<template>
    <div
        class="labelItem"
        :class="{bigger: showFullLabel}"
        :style="{ 'background-color': label.bgColor }"
        @click.stop="labelClicked"
    >
        <div class="full-label" v-if="showFullLabel">{{ label.name }}</div>
    </div>
</template>


<script>
// :class="{close: !showFullLabel}"
export default {
    name: "task-preview-labels-list-item",

    props: [
        'labelId',
        'showFullLabel'
    ],

    computed: {
        label() {
            return this.$store.getters.getLabels.find(label => label._id === this.labelId);
        }
    },

    methods: {
        labelClicked() {
            this.$emit('labelClicked');
        }
    }
}
</script>

<style>
</style>