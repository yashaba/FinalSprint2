<template>
  <section>
   <ul v-for="checkListItem in checkListItems" >
    <li :item='checkListItem'>
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
}}
}
</script>

<style>

</style>