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

    this.RelevantActivities =  this.getRelevantActivities()
        eventBus.$on("force-update", () => {
      this.RelevantActivities =  this.getRelevantActivities()
    });

},
methods: {

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