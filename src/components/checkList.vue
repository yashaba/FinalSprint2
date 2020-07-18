<template>
  <section>
   <ul v-for="checkListItem in checkListItems" >
    <li @click="checkListItem.isDone = !checkListItem.isDone ,log(checkListItem.isDone)" :item='checkListItem'>
      {{checkListItem.txt}}

    </li>

   </ul>

  </section>
</template>

<script>
export default {
// props: ['task'],
data() {return {
    checkListItems: [ {txt: 'first task' , isDone: false},{txt: 'second task' , isDone: false} ]
}},
methods: {
    log(isDone){
    console.log(isDone.isDone);
    }
}
}
</script>

<style>

</style>