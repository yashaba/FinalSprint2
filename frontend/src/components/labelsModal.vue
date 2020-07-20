<template>
  <div class="labels-modal">
      <div class="labels flex column">
          <div
            class="label flex"
            v-for="label in labels"
            :key="label._id"
            :style="{ 'background-color': label.bgColor }"
            @click="labelClicked(label._id)"
        >
            <div class="label-name">
                <input
                    type="text"
                    v-model="editedLabelName"
                    v-if="editingLabelId == label._id"
                />
                <span v-else>{{ label.name }}</span>
            </div>
            <div class="label-actions flex">
                <i class="edit fas fa-pencil-alt" @click="setLabelUnderEditing(label._id)"></i>
                <i class="fa fa-check" v-if="isInSelectedLabels(label._id)"></i>
            </div>
        </div>
      </div>
      <button class="btn-save" @click.prevent="saveLabelChanges()">Save</button>
  </div>
</template>

<script>
export default {
    name: 'labels-modal',

    props: ['task'],

    data() {
        return {
            editingLabelId: null,
            editedLabelName: null
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
            return this.labels.find(label => label._id === labelId)
        },

        setLabelUnderEditing(labelId) {
            this.editingLabelId = labelId;
            this.editedLabelName = this.getLabel(labelId).name;
        },

        saveLabelChanges() {
            const label = {
                id: this.editingLabelId,
                name: this.editedLabelName
            };

            this.$store.dispatch('updateLabel', {label});
        },

        labelClicked(labelId) {
            this.$store.dispatch('toggleLabelInTask', {labelId, task: this.task});
        }
    }
}
</script>

<style>
    .labels-modal {
        background-color: #ffffff;
        padding: 10px;
        position: absolute;
    }

    .labels-modal .labels .label {
        margin-bottom: 7px;
    }

    .labels-modal .labels .label input {
        border: 0;
        background-color: transparent;
    }

    .labels-modal .labels .label input:focus {
        outline: none;
    }

    .label-name {
        width: 100%;
    }

    .label .edit {
        display: none;
    }

    .label:hover .edit {
        display: inline-block;
    }



</style>