<template>
  <div > 
     <div class="flex ">
        
            <avatar
            class="activity-avatar"
        :size="32"
        :username="activity.by.fullName"
        backgroundColor="#dfe1e6"
        color="#172b4d"
      /> <p> <span  class="span-name"> {{activity.by.fullName}}</span> &nbsp;  {{formatActivity(activity.type)}} <br> <span>{{ activity.at | moment("from") }}</span> </p>
      </div> 
</div>

</template>

<script>
import Avatar from "vue-avatar";


export default {
props: ['activity'],
methods: {
    // middleMessage(type){
    // if (type === "DELETE_TASK") return 'deleted'
    // if (type === "DELETE_TYPE") return 'deleted'
    // if (type === "REMOVE") return `removed  ${this.activity.content}  this task` 
    // if (type === 'MOVE') return this.activity.content
    // if (type === 'ADD' ) return ` added ${this.activity.content} to this task`
    // if (type === "ADD_CHECKLIST_ITEM") return `added ${this.activity.content}`
    // if (type === 'COMPLETED') return `completed ${this.activity.content} on this card`
    // if (type === 'SET') return `set this task to be due at: ${this.activity.content}`
    // if (type === 'CREATE') return 'created this task'
    //             },
    
        formatActivity(type){
   switch (type) {
  case "REMOVE":
    return `removed  ${this.activity.content} from this task`
    break;
  case "ADD":
   return ` added ${this.activity.content} to this task`
    break;
  case "MOVE":
     return this.activity.content
    break;
  case "CREATE":
    return 'created this task'
    break;
  case "ADD_CHECKLIST_ITEM":
    return `added ${this.activity.content}`
    break;
  case "REMOVE":
    return `removed  ${this.activity.content}  this task` 
    break;
  case "SET":
    return `set this task to be due at: ${this.activity.content}`
}
}

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