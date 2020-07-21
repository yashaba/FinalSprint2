<template>
    <div
        class="labelItem"
        :style="{ 'background-color': label.bgColor }"
        @click.stop="labelClicked"
    >
        <p v-if="showFullLabel">{{ label.name }}</p>
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