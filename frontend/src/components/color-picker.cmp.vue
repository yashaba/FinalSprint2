<template>
  <div class="color-picker flex column">
      <h4>Cover Colors</h4>
      <div class="colors-container flex wrap justify-center">
        <span :class="{picked : color === pickedColor}" v-for="(color, idx) in colors" :key="idx" @click.stop="setColor(color)" :style="{backgroundColor : color}"> </span>
        <span @click.stop="showMore" title="More colors..." class="show-more"> <i class="fas fa-plus"></i> </span>
      </div>
  </div>
</template>

<script>

var colors = require('nice-color-palettes/1000');
const _ = require('lodash')

export default {
    data() {
        return {
            startFrom: 0,
            colors: _.flatten(colors).slice(this.startFrom, 19),
            pickedColor: '69d2e7'
        }
    },
    methods: {
        setColor(color) {
            this.pickedColor = color
            this.$emit('input', color)
        },
        showMore() {
            if (this.startFrom > 981) this.startFrom = 0;
            else this.startFrom += 19;
            this.colors = _.flatten(colors).slice(this.startFrom, this.startFrom + 19)
        }
    },
}
</script>

<style scoped>
    .color-picker h4 {
        text-transform: capitalize;
        margin-bottom: .5rem;
    }
    .color-picker {
        background-color: #fff;
        border-radius: .33rem;
        border: 1px solid #717171;
        padding: 1rem;
        width: 15rem;
    }
    .color-picker span {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.25rem;
        color: white;
        font-weight: bold;
        margin: 0.1rem;
        cursor: pointer;
        border-radius: 15%;
        width: 3rem;
        height: 2rem;
    }
    .color-picker span.show-more {
        color: #717171;
        border: 1px solid #717171;
        font-size: 1.25rem;
    }
    .picked::after {
        content: '✔';
    }
</style>