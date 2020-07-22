<template>
  <section class="member-profile-modal">
    {{member.fullName}}
  </section>
</template>

<script>
export default {
    name: 'member-profile-modal',

    props: ['member'],

    // computed: {
    //   member() {
    //     return this.members.map(member => member.fullName);
    //   }
    // },
}
</script>

<style>

</style>