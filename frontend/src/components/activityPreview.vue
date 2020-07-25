<template>
  <div > 
     <div class="flex ">
        
            <avatar
            class="activity-avatar"
        :size="32"
        :username="activity.by.fullName"
        backgroundColor="#dfe1e6"
        color="#172b4d"
      /> <p> <span v-if="activity.by.fullName" class="span-name"> {{activity.by.fullName}}</span> &nbsp;  {{middleMessage(activity.type)}} <br> <span>{{ activity.at | moment("from") }}</span> </p>
      </div> 
</div>

</template>

<script>
import Avatar from "vue-avatar";


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
    if (type === "REMOVE") return `removed  ${this.activity.content}  this card` 
    if (type === 'MOVE') return this.activity.content
    if (type === 'ADD' ) return ` added ${this.activity.content} to this card`
    if (type === "ADD_CHECKLIST_ITEM") return `added ${this.activity.content}`
    if (type === 'COMPLETED') return 'completed "place holder" on this card'
    if (type === 'SET') return 'set this card to be due at:'
    if (type === 'CREATE') return 'created this card'
                },


},
components: {
Avatar
}

}
</script>

<style>
.span-bold{
    
}
.activity-avatar {
    margin: 13px 5px 0 0;
}
.span-name{
    text-transform: capitalize;
    font-weight: bold
}
</style>