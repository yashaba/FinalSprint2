<template>
  <section>
      <el-progress v-show="checkListItems.length" :percentage="calcPrecentDone" style="margin-bottom: 10px" :status=calcSucsess></el-progress>
   
    <div  v-for="(checkListItem , idx) in checkListItems" :key="idx">
        <check-list-item @removeItemEv='removeItem' @updateTaskEv='updateTask' :checkListItem='checkListItem'> </check-list-item>
    </div>
    <form action="">
        
        <el-input  style="width: 88%; margin-right: 5px; margin-top: 15px" v-if="addingItem" placeholder="New task name" v-model="checkListItemTxt"></el-input>
        <el-button v-if="addingItem" @click.prevent="addCheckListItem"  type="success" icon="el-icon-check" circle></el-button>
    <!-- <button v-if="addingItem" @click.prevent="addItem" type="submit"> <i class="fas fa-check"></i></button> -->
    
    </form>
    <el-button @click.prevent="addingItem = true" v-if="!addingItem" type="primary">Add an item</el-button>

  

  </section>
</template>

<script>
import {utilsService} from '../services/utils-service.js'
import checkListItem from './checkListItem.vue'
import {activityLogService} from '../services/activity-log-service.js'
export default {
props: ['checkList', 'idx'],
data() {return {
    checkListItems: this.checkList.list,
    isEditing: false,
    addingItem: false,
    checkListItemTxt: null
}},
computed: {
 calcDone: function() {
     return this.checkListItems.filter( item => item.isDone ).length
 },
 calcAllDone: function() {
     return  this.task.checkLists[0].list.length === this.calcDone
 },
 calcPrecentDone: function() {
      if (this.checkListItems.length) return Math.trunc(this.calcDone / this.checkListItems.length  * 100)
 },
 calcSucsess() {
     if ( this.calcPrecentDone === 100) {
         return "success"
     }
 }
},
created(){
},
methods: {
 
    removeItem(id) {
       let idx = this.checkListItems.findIndex( item => item.id === id)
        this.checkListItems.splice(idx , 1)
        this.updateTask()
    },
    updateTask() {
        
        this.$emit('updateChecklistEv' , {list: this.checkListItems, idx: this.idx})
    },
    addCheckListItem() {
        let newCheckListItem = {
         id: utilsService.makeId(),
         txt: this.checkListItemTxt,
         isDone: false,
         isBeingEdited: false
         }
        this.checkListItems.push(JSON.parse(JSON.stringify(newCheckListItem)))
        this.checkListItemTxt = ''
        this.addingItem = false

        this.updateTask()
        newCheckListItem.txt += " " + "to"+" " +this.checkList.title

       this.$emit('updateActivityLogEv' , newCheckListItem.txt , "ADD_CHECKLIST_ITEM" )

    },

},
components: {
    checkListItem
}
}
</script>

<style lang='scss' >
 .done {
     /* color: rgb(9, 255, 0); */
     
     
 }
 .listItem {
     cursor: pointer;
     margin-left: 10px;
     height: 30px;
 }
 .list-item-container{
             &:hover {
                 
                 background-color: rgba(9, 30, 66, .08);
             }
             }
 
</style>