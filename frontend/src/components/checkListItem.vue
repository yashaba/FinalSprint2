<template>
  <div @mouseenter="isControlsShown = true" @mouseleave="isControlsShown = false">
  <div class="flex align-center space-between list-item-container" v-if="!checkListItem.isBeingEdited" @click=" log(checkListItem)">
            <div class="flex align-center">
              <el-checkbox class="el-checkbox" v-model="checkListItem.isDone"></el-checkbox>
             <div class="listItem" @click="updateTaskEv(),checkListItem.isDone = !checkListItem.isDone " :class="{done: checkListItem.isDone}">{{checkListItem.txt}} </div>
             </div> 
             <div class="crud" v-if="isControlsShown">
              <button @click.stop="checkListItem.isBeingEdited = true"><i class="far fa-edit"></i></button>
               <button @click="removeItemEv(checkListItem.id)"><i class="far fa-trash-alt"></i></button></div>
               </div>
        <form v-if="checkListItem.isBeingEdited" action="">
                <el-input  style="width: 300px" placeholder="New task name" v-model="checkListItem.txt"></el-input>

           <el-button @click.prevent="checkListItem.isBeingEdited = false,updateTaskEv()"  type="success" icon="el-icon-check" circle></el-button>

        </form>
  </div>

</template>

<script>
export default {
    props: ['checkListItem'],
    data() {return {
    isControlsShown: false,
    isEditing: false
    
}},
methods: {
    updateTaskEv() {
        this.$emit( 'updateTaskEv' , this.checkListItem)
    },
removeItemEv(id) {
    this.$emit('removeItemEv', id )
    //    let idx = this.checkListItems.findIndex( item => item.id === id)
    //     this.checkListItems.splice(idx , 1)
    //     this.updateTask()
    }

}
}
</script>

<style lang='scss'>
.listItem {
    line-height: 30px ;
}
.crud{
    button {
        cursor: pointer;
        border: 0px;
        border-radius: 2px ;
        background-color: rgba(19, 44, 88, 0.08);
        margin-right: 3px;
        
    }
}
form {
    // button {
    //      cursor: pointer;
    //     border: 0px;
    //     border-radius: 2px ;
    //     height: 22px;
    //     background-color: rgba(19, 44, 88, 0.08);
    // }
}
</style>