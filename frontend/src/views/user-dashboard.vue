<template>
  <section>
  <div class="flex">
  <div  v-for="board in userBoards" :key="board._id">
      
      <div :style="{backgroundImage: 'url('+board.backgroundImg+')' }" class="card "> <a :href="'#/board/'+ board._id">{{board.boardName}} </a> </div>
     </div>
     </div>

  </section>
</template>

<script>
import {userService} from '../services/user.service.js'
export default {
    data(){ 
        return{
  userBoards: null
    }},

    created() {
     userService.getUserBoards()
     .then(boards => this.userBoards= boards)
    setTimeout(()=> {console.log(this.userBoards)},1000)
    
    }

}
</script>

<style lang='scss'>
.card {
    
    line-height: 140px;
    text-align: center;
    color: rgba($color: #ffffff, $alpha: 1.0);
    width: 225px;
    height: 140px;
}
</style>