<template>
  <section>
    <div class="flex">
      <div v-for="board in userBoards" :key="board._id">
        <a
          :href="'#/board/'+ board._id"
          :style="{backgroundImage: 'url('+board.backgroundImg+')' }"
          class="card"
        >
          <div>{{board.boardName}}</div>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import { boardStore } from "../store/board.store.js";
import { userStore } from "../store/UserStore.js";
export default {
  data() {
    return {
      userBoards: null
    };
  },

  created() {
    let user = this.$store.getters.loggedinUser;
    let userId = user._id;
    this.$store
      .dispatch({ type: "getUserBoards", userId: user._id })
      .then(boards => {
        this.userBoards = boards;
      });
  }
};
</script>

<style lang='scss'>
.card {
  display: block;
  line-height: 140px;
  text-align: center;
  color: rgba($color: #ffffff, $alpha: 1);
  width: 225px;
  height: 140px;
  margin-right: 30px;
  text-decoration: none;
  border-radius: 5%;
}
</style>