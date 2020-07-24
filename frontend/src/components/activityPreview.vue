<template>
  <div > 
     <div v-if="activity.type === 'ADD'">
        
      {{activity.by.fullName}} {{middleMessage(activity.type)}} {{activity.content}} to this card <br> {{activity.at}} 
      </div> 

     <div v-if="activity.type === 'ADD_CHECKLIST_ITEM'">
         
      {{activity.by.fullName}} {{middleMessage(activity.type)}} {{activity.content}} <br> {{activity.at}} 
       
      </div>  
     <div v-if="activity.type === 'COMPLETED'">
         
      {{activity.by.fullName}} {{middleMessage(activity.type)}} "place holder" on this card <br> {{activity.at}} 
        
     </div>
     <div v-if="activity.type === 'MOVED'">
      {{activity.by.fullName}} {{middleMessage(activity.type)}} this card to target group <br> {{activity.at}}    
     </div>
     <div v-if="activity.type === 'DELETE_TYPE'">
      {{activity.by.fullName}} {{middleMessage(activity.type)}} removed an attachment from this card<br> {{activity.at}}    
     </div>
     <div v-if="activity.type === 'SET'">
      {{activity.by.fullName}} {{middleMessage(activity.type)}} set this card to be due at:<br> {{activity.at}}    
     </div>
 
  


</div>

</template>

<script>

export default {
props: ['activity'],
data(){ 
    return{
      


    }
},
computed: {
    },
created(){
    console.log(this.activity.type);
    
},
methods: {
    middleMessage(type){
    if (type === "DELETE_TASK") return 'deleted'
    if (type === "DELETE_TYPE") return 'deleted'
    if (type === 'MOVED') return 'moved'
    if (type === 'ADDED' || type === "ADD_CHECKLIST_ITEM") return 'added'
    if (type === 'COMPLETED') return 'completed'
    if (type === 'SET') return 'set'
                }

},
components: {

}

}
</script>

<style>

</style>