<template>
  <div class="labels-modal">
      <!-- <div class="labels-container"> -->
        <div class="flex align-center space-between">
            <h5>Labels</h5>
            <button class="btn-close" @click="close">&times;</button>
        </div>
        <hr>
        <div class="labels flex column">
            <div
                class="label flex"
                v-for="label in labels"
                :key="label._id"
                @click="labelClicked(label._id)"
            >
                <div class="label-name" :style="{ 'background-color': label.bgColor }">
                    <input
                        ref="taskLabel"
                        type="text"
                        v-model="editedLabelName"
                        v-if="editingLabelId == label._id"
                    />
                    <p v-else>{{ label.name }}</p>
                    <i class="check fa fa-check" v-if="isInSelectedLabels(label._id)"></i>
                </div>
                <div class="label-actions flex">
                    <i class="edit fas fa-pencil-alt" @click.stop="setLabelUnderEditing(label._id)"></i>
                </div>
            </div>
        </div>
        <button class="btn-save" @click.prevent="saveLabelChanges()">Save</button>
      <!-- </div> -->
  </div>
</template>

<script>
export default {
    name: 'labels-modal',

    props: ['task'],

    data() {
        return {
            editingLabelId: null,
            editedLabelName: null,
            clickedLabel: null,
            isUnderEditing: false,
            fisrtFocus: false
        }
    },

    computed: {
        labels() {
            return this.$store.getters.getLabels.sort((a, b) => a._id > b._id ? 1 : -1)
        },

        activeLabels() {
            if (this.task) return this.task.labels;
            return [];
        }
    },

    methods: {
        isInSelectedLabels(labelId) {
            if (this.task.labels) return this.activeLabels.includes(labelId);
        },

        getLabel(labelId) {
            this.clickedLabel = this.$store.getters.getLabels.find(label => label._id === labelId)
            return this.clickedLabel;
        },

        setLabelUnderEditing(labelId) {
            this.editingLabelId = labelId;
            this.editedLabelName = this.getLabel(labelId).name;
            this.isUnderEditing = true;
        },

        saveLabelChanges() {
            if (!this.editedLabelName) {
                this.close();
            } else {
                const label = {
                    id: this.editingLabelId,
                    name: this.editedLabelName
                };  
                this.$store.dispatch('updateLabel', {label});
                this.close();
            }    
        },

        labelClicked(labelId) {
            this.$store.dispatch('toggleLabelInTask', {labelId, task: this.task});
            this.$emit('labelClicked', labelId);

        },
        close() {
            this.$emit('closeLabelsModal');
        }
      },

    updated() {
        if (this.isUnderEditing && !this.fisrtFocus) {
            this.$refs.taskLabel[0].select();
            this.fisrtFocus = true;
        }
    }
}
</script>

<style>
</style>


