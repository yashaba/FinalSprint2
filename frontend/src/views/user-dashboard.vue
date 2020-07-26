<template>
  <section   >
    <div class="user-dashboard  ">
    <div class="main-wrapper">
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
         <div>
         <div @click="isCreating=true" class="card create-button">Create New Board</div>
         <div @click="isCreating=false" class="effect flex justify-center align-center" v-if="isCreating" > 
              

              <div @click.stop="" class="board-creation-modal flex">

              <div class="imgs-container flex ">
              <img class="bg-option"  src="https://i.pinimg.com/originals/ae/36/13/ae3613e021f920efb6006c01392b3697.jpg" alt="">
              <img class="bg-option" src="https://i.pinimg.com/originals/ae/36/13/ae3613e021f920efb6006c01392b3697.jpg" alt="">
              <img class="bg-option" src="https://i.pinimg.com/originals/ae/36/13/ae3613e021f920efb6006c01392b3697.jpg" alt="">
              <img class="bg-option" src="https://i.pinimg.com/originals/ae/36/13/ae3613e021f920efb6006c01392b3697.jpg" alt="">
              <img class="bg-option" src="https://i.pinimg.com/originals/ae/36/13/ae3613e021f920efb6006c01392b3697.jpg" alt="">
              <img class="bg-option" src="https://i.pinimg.com/originals/ae/36/13/ae3613e021f920efb6006c01392b3697.jpg" alt="">
              </div>

              <div class="relative">
              <img width="300" src="https://i.pinimg.com/originals/ae/36/13/ae3613e021f920efb6006c01392b3697.jpg" alt="">
               <el-input class="title-input" placeholder="Board Title" v-model="newBoardTitle"></el-input>
               <el-button @click.prevent="createBoard" class="submit-button" type="primary">Create</el-button>
               </div>

              <div class="imgs-container flex ">
              <img class="bg-option" src="https://i.pinimg.com/originals/ae/36/13/ae3613e021f920efb6006c01392b3697.jpg" alt="">
              <img class="bg-option" src="https://i.pinimg.com/originals/ae/36/13/ae3613e021f920efb6006c01392b3697.jpg" alt="">
              <img class="bg-option" src="https://i.pinimg.com/originals/ae/36/13/ae3613e021f920efb6006c01392b3697.jpg" alt="">
              <img class="bg-option" src="https://i.pinimg.com/originals/ae/36/13/ae3613e021f920efb6006c01392b3697.jpg" alt="">
              <img class="bg-option" src="https://i.pinimg.com/originals/ae/36/13/ae3613e021f920efb6006c01392b3697.jpg" alt="">
              <img class="bg-option" src="https://i.pinimg.com/originals/ae/36/13/ae3613e021f920efb6006c01392b3697.jpg" alt="">

              </div>
              </div>
           
            </div>
         </div>
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
    </div>
    </div>
  </section>
</template>

<script>
import { boardStore } from "../store/board.store.js";
import { userStore } from "../store/UserStore.js";
import {boardService} from "../services/board-service.js"
export default {
  data() {
    return {
      userBoards: null,
      publicBoards: null,
      isCreating: false,
      bgSrc: null,
      newBoardTitle: "",
      loggedinUser: null

    };
  },

  created() {
    this.loggedinUser = this.$store.getters.loggedinUser;
    this.$store
      .dispatch({ type: "getUserBoards", userId: this.loggedinUser._id })
      .then(boards => {
        this.userBoards = boards
        this.publicBoards = boards.filter(board => board._id === "5f19d0dc61fc800a7cb9e96c");
      });
  },
  methods: {
    createBoard(){
      let img = "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?ixlib=rb-1.2.1&w=1000&q=80"
    boardService.createBoard(this.loggedinUser, img, this.newBoardTitle)
    this.newBoardTitle = ""
    }
  }
};
</script>

<style lang='scss'>

.bg-option {
  width: 90px;
  height: 90px;
}
.submit-button {
  position: absolute;
  left: 100px;
  bottom: 9px
}

.relative {
  position: relative;
}
.board-creation-modal {
  .title-input {
    position: absolute;
    width: 200px;
    left: 50px;
    bottom: 50px;
  }
}
.imgs-container {
  flex-wrap: wrap;
  width: 300px;
  margin-left: 10px ;
  // padding: 10px; 
  img {
    margin: 3px;
  }
}
.personal-boards-container {
  // margin-top: 150px;
  //     h1 {
  //       margin: 0 0 50px 0;
  //     }
}
.main-wrapper {
  padding: 200px 50px 0 50px;
      h1 {
        //  font-family: euro;
        margin: 50px 0 50px 0;
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
  background-color: rgb(236, 233, 233);
}
</style>