<template>
  <div> 
    <div v-for="(activity, idx) in RelevantActivities" :key="idx">
        <div>
        <activity-preview :activity='activity'> </activity-preview>

       
        
         </div>
  </div>

</div>

</template>

<script>
import activityPreview from './activityPreview.vue'
import {eventBus} from '../services/event-bus.service.js'
export default {
props: ['task'],
data(){ 
    return{
        activities: this.$store.getters.currBoard.activites ,
        RelevantActivities : null


    }
},
computed: {
    },
created(){
    console.log('board', this.$store.getters.currBoard);
    console.log('user', this.$store.getters.loggedinUser);
    console.log(this.activities);
    this.RelevantActivities =  this.getRelevantActivities()
    console.log('relevant', this.RelevantActivities);
        eventBus.$on("force-update", () => {
      this.RelevantActivities =  this.getRelevantActivities()
    });

},
methods: {
    middleMessage(type){
    if (type === "DELETE_TASK") return 'deleted'
    if (type === 'MOVED') return 'moved'
    if (type === 'ADDED') return 'added'
    if (type === 'COMPLETED') return 'completed'
    if (type === 'SET') return 'set'
                },
 getRelevantActivities(){
    return this.activities.filter(activity => activity.task._id === this.task._id)
 }
},
components: {
    activityPreview
}

}
</script>

<style>

</style>