<template>
  <div>
      <div class="date-picker"> 
          <i class="el-icon-time"></i>
          {{formatDate}}
           </div>
  </div>
</template>

<script>
export default {
    props: ['dueDate'],
    data(){return{
        // date: this.dueDate
    }},
    created() {
    },
    computed: {
        formatDate: function() {
    var d = new Date(this.dueDate.date)
        // month = '' + (d.getMonth() + 1),
      var month = d.toLocaleString('default', { month: 'short' })
        var day = '' + d.getDate()
        var year = d.getFullYear()

    // if (month.length < 2) 
    //     month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [  month , day ].join(' ');
}
    }


}
</script>

<style>

</style>