<template>
  <section   >
    <div class="user-dashboard  ">
    <div class="main-wrapper">
    <div class="personal-boards-container">
       <div class="column align-center justify-center">
         <h1> Personal Boards</h1> 
         <div class="cards-wrapper flex wrap">
            <div  v-for="board in userBoards" :key="board._id">
           <a
          :href="'#/board/'+ board._id"
          :style="{backgroundImage: 'url('+ require(`../assets/imgs/board-img-${board.backgroundImg}.jpg`)+')' }"
          class="card"
           >
            <div>{{board.boardName}}</div>
            </a>

         </div>
         <div>
         <div @click="isCreating=true" class="card create-button">Create New Board</div>
         <div @click="isCreating=false" class="effect flex justify-center align-center" v-if="isCreating" > 
              

              <div @click.stop="" class="board-creation-modal">

              <div  class="imgs-container flex relative">
               <div class="relative" @click="bgToDisplay = bgOption" v-for="(bgOption , idx) in bgOptions" :key="idx">
              <img  class="bg-option"  :src=" require(`../assets/imgs/board-img-${bgOption}.jpg`)" alt="">
              <i v-if="bgToDisplay === bgOption " class="el-icon-check"></i>
              </div> 
              
              </div>

              <div class="relative">
              <img width="300" height="200" :src=" require(`../assets/imgs/board-img-${bgToDisplay}.jpg`)" alt="">
               <el-input class="title-input" placeholder="Board Title" v-model="newBoardTitle"></el-input>
               <el-button @click.prevent="createBoard" class="submit-button" type="primary">Create</el-button>
               </div>

              <!-- <div class="imgs-container flex ">
              <img class="bg-option" src="https://i.pinimg.com/originals/ae/36/13/ae3613e021f920efb6006c01392b3697.jpg" alt="">
              <img class="bg-option" src="https://i.pinimg.com/originals/ae/36/13/ae3613e021f920efb6006c01392b3697.jpg" alt="">
              <img class="bg-option" src="https://i.pinimg.com/originals/ae/36/13/ae3613e021f920efb6006c01392b3697.jpg" alt="">
              <img class="bg-option" src="https://i.pinimg.com/originals/ae/36/13/ae3613e021f920efb6006c01392b3697.jpg" alt="">
              <img class="bg-option" src="https://i.pinimg.com/originals/ae/36/13/ae3613e021f920efb6006c01392b3697.jpg" alt="">
              <img class="bg-option" src="https://i.pinimg.com/originals/ae/36/13/ae3613e021f920efb6006c01392b3697.jpg" alt="">

              </div> -->
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
      loggedinUser: null,
      bgOptions: [2,3,4,5,6,7],
      bgToDisplay: 2

    };
  },

  created() {
    this.loggedinUser = this.$store.getters.loggedinUser;
    this.loadBoards()
  },
  methods: {
    async createBoard(){
    const res = await boardService.createBoard(this.loggedinUser, this.bgToDisplay, this.newBoardTitle)
    this.newBoardTitle = ""
    this.isCreating = false
    this.loadBoards()


    },
    loadBoards(){
 this.$store
      .dispatch({ type: "getUserBoards", userId: this.loggedinUser._id })
      .then(boards => {
        this.userBoards = boards
      });
    }
  }
};
</script>

<style lang='scss'>
 .el-icon-check {
   position: absolute;
   left: 35px;
   bottom: 35px;
   color: #00fc22;
   font-size: 30px;
 }
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
  display: flex;
  // flex-direction: column-reverse;
}
.imgs-container {
  flex-wrap: wrap;
  width: 300px;
  margin-left: 10px ;
  // padding: 10px; 
  img {
    margin: 3px;
    cursor: pointer;
  }
  div {
    position: relative;
  }
}
.personal-boards-container {
  // margin-top: 150px;
  //     h1 {
  //       margin: 0 0 50px 0;
  //     }
}
.main-wrapper {
  padding: 59px 50px 0 50px;
      h1 {
        //  font-family: euro;
        margin: 50px 0 50px 0;
      }
}
.cards-wrapper {
  
}
.card {
  display: block;
  line-height: 140px;
  text-align: center;
  color: rgba($color: #ffffff, $alpha: 1);
  width: 225px;
  height: 140px;
  margin: 0px 30px 20px 0;
  text-decoration: none;
  border-radius: 5%;
  background-repeat: no-repeat;
  background-size: 225px;
  box-shadow: 0px 0px 20px 1px rgba(139, 139, 139, 0.49);
  text-shadow: 2px 2px 4px #000000;
  font-size: x-large;
}
.create-button{
  background-color: #c5c5c5a1;;
  cursor: pointer;
}
</style>