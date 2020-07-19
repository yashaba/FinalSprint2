<template>
  <section>
      
   <ul  >
    <li  v-for="(checkListItem , idx) in checkListItems" :key="idx">
        <div v-if="!checkListItem.isBeingEdited" @click=" log(checkListItem)">
            
             <span @click="updateTask(),checkListItem.isDone = !checkListItem.isDone " :class="{done: checkListItem.isDone}">{{checkListItem.txt}} </span> 
              <button @click.stop="checkListItem.isBeingEdited = true">edit</button>
               <button @click="removeItem(checkListItem.id)">X</button></div>
        <form v-if="checkListItem.isBeingEdited" action="">
        <input  v-model="checkListItem.txt" type="text">
        <button @click.prevent="checkListItem.isBeingEdited = false,updateTask()" type="submit"> Change </button>
        </form>
     

    </li>
    <form action="">
        <input v-if="addingItem" v-model="itemToAdd" type="text">
    <button v-if="addingItem" @click.prevent="addItem" type="submit"> Add an item </button>
    </form>
    <button @click.prevent="addingItem = true" v-if="!addingItem" >Add an Item</button>

   </ul>

  </section>
</template>

<script>
import {utilsService} from '../services/utils-service.js'
export default {
props: ['checkList', 'idx'],
data() {return {
    checkListItems: this.checkList.list,
    isEditing: false,
    addingItem: false,
    itemToAdd: null
}},
methods: {
    log(checkListItem){
  
    },
    removeItem(id) {
       let idx = this.checkListItems.findIndex( item => item.id === id)
        this.checkListItems.splice(idx , 1)
        this.updateTask()
    },
    updateTask() {
        
        this.$emit('updateChecklistEv' , {list: this.checkListItems, idx: this.idx})
    },
    addItem() {
        let newItem = {
            id: utilsService.makeId(),
          txt: this.itemToAdd,
                    isDone: false,
                    isBeingEdited: false}
      this.checkListItems.push(JSON.parse(JSON.stringify(newItem)))
        this.itemToAdd = ''
        this.addingItem = false

        this.updateTask()

    }
}
}
</script>

<style>
 .done {
     color: aqua;
     text-decoration: line-through;
 }
</style>