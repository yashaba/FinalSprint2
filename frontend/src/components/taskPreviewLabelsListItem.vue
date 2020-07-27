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
    data(){
        return {
            clickedLabel: null
        }
    },
    props: [
        'labelId',
        'showFullLabel'
    ],

    computed: {
        label() {
            this.clickedLabel = this.$store.getters.getLabels.find(label => label._id === this.labelId)
            return this.clickedLabel;
        }
    },

    methods: {
        labelClicked() {
            this.$emit('labelClicked');
        // labelClicked(){
        //     this.$emit('labelClicked', this.clickedLabel);
        // }
    }
}
</script>

<style>
</style>