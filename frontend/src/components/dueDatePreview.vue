<template>
  <div>
      <div :class="{completed: dueDate.isDone, due: checkDue }" class="date-wrapper">
         <i class="el-icon-time"></i>
          {{formatDate}}
      </div>
  </div>
</template>

<script>
export default {
    props: ['dueDate'],
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
},
checkDue: function() {
    let due = Date.parse(this.dueDate.date)
    let now = Date.now()
    
      

    return ( due < now && !this.dueDate.isDone)
}
    }


}
</script>

<style lang='scss'>
.date-wrapper{
    border-radius: 10%;
    padding: 3px;
    font-size: 14px;
    font-weight: 400;
}
 .completed {
     background: rgba($color: #f2d600, $alpha: 1.0);
     color: #fff;
 }

 .due {
        background: rgba($color: #eb5a46, $alpha: 0.7);
        color: #fff;
 }
</style>