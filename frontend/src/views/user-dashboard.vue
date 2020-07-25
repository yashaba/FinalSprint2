<template>
  <section class="column align-center justify-center ">
    <div class="personal-boards-container">
    <div class="column align-center justify-center">
      <h1> Personal Boards</h1> 
      <div class="flex">
      <div  v-for="board in userBoards" :key="board._id">
        <a
          :href="'#/board/'+ board._id"
          :style="{backgroundImage: 'url('+board.backgroundImg+')' }"
          class="card"
        >
          <div>{{board.boardName}}</div>
        </a>

      </div>
      <div class="card">Create New Board</div>
      </div>
    </div>
    </div>
    <div class="public-boards-container">
      <h1> Public Boards</h1> 
    <div class="flex">
      <div v-for="board in publicBoards" :key="board._id">
        <a
          :href="'#/board/'+ board._id"
          :style="{backgroundImage: 'url('+board.backgroundImg+')' }"
          class="card"
        >
          <div>{{board.boardName}}</div>
        </a>
      </div>
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
      userBoards: null,
      publicBoards: null
    };
  },

  created() {
    let user = this.$store.getters.loggedinUser;
    let userId = user._id;
    this.$store
      .dispatch({ type: "getUserBoards", userId: user._id })
      .then(boards => {
        this.userBoards = boards.filter(board => board._id !== "5f19d0dc61fc800a7cb9e96c");
        this.publicBoards = boards.filter(board => board._id === "5f19d0dc61fc800a7cb9e96c");
      });
  }
};
</script>

<style lang='scss'>
.personal-boards-container {
  margin-top: 150px;
      h1 {
        margin: 0 0 50px 0;
      }
}
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
.create-button{
  background-color: #fff;
}
</style>