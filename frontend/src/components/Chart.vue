<script>
import VueCharts from 'vue-chartjs'
import { Bar } from 'vue-chartjs'
 
export default {
  extends: Bar,
  props: ['board'],
  data() {
    return {
      boardLabels: [],
      data: []
    };
  },
  mounted () {
    // Overwriting base render method with actual data
    this.renderChart({
      labels: this.boardLabels,
      datasets: [
        {
          label: 'Tasks Groups',
          backgroundColor: '#f87979',
          data: this.data
        }
      ]
    }, {responsive: true})
  },
  created() {
    console.log(this.board);
    let taskGroups = this.$store.getters.getCurrBoardTaskGroups;
    taskGroups.forEach(group => {
    this.boardLabels.push(group.title);
    this.data.push(group.tasks.length);
    });
  }
}
</script>