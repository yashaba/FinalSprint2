<script>
import VueCharts from "vue-chartjs";
import { Pie } from "vue-chartjs";

export default {
  extends: Pie,
  props: ["board"],
  data() {
    return {
      boardLabels: [],
      data: [],
      bgColor: []
    };
  },
  mounted() {
    // Overwriting base render method with actual data
    this.renderChart(
      {
        labels: this.boardLabels,
        datasets: [
          {
            label: "Labels",
            backgroundColor: this.bgColor,
            data: this.data
          }
        ]
      },
      { responsive: true }
    );
  },
  created() {
    let labelCount = {};
    let board = this.$store.getters.currBoard;
    let taskGroups = this.$store.getters.getCurrBoardTaskGroups;
    taskGroups.forEach(group => {
      let tasks = group.tasks;
      tasks.forEach(task => {
        if (task.labels === undefined) {
          return;
        }
        task.labels.forEach(labelId => {
          if (labelCount[labelId] === undefined) labelCount[labelId] = 0;
          labelCount[labelId]++;
        });
      });
    });
    let newData = [];
    let labelColors = [];
    let labels = [];
    for (const labelId in labelCount) {
      newData.push(labelCount[labelId]);
      let result = board.labels.find(label => label._id === labelId);
      labelColors.push(result.bgColor);
      labels.push(result.name);
    }
    this.boardLabels = labels;
    this.bgColor = labelColors;
    this.data = newData;
  }
};
</script>