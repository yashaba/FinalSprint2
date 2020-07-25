<script>
import VueCharts from "vue-chartjs";
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  props: ["board"],
  data() {
    return {
      boardMembers: [],
      todos: [],
      done: []
    };
  },
  mounted() {
    // Overwriting base render method with actual data
    this.renderChart(
      {
        labels: this.boardMembers,
        datasets: [
          {
            label: "Todo",
            backgroundColor: "rgb(242, 214, 0)",
            data: this.todos,
            stack: "Stack 0"
          },
          {
            label: "Done",
            backgroundColor: "rgb(97, 189, 79)",
            stack: "Stack 0",
            data: this.done
          }
        ]
      },
      {
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true
          },
          responsive: true
        }
      }
    );
  },
  created() {
    let todosCount = {};
    let doneCount = {};
    let board = this.$store.getters.currBoard;
    let taskGroups = this.$store.getters.getCurrBoardTaskGroups;
    taskGroups.forEach(group => {
      let groupTitle = group.title.toLowerCase();

      let tasks = group.tasks;
      tasks.forEach(task => {
        task.assignedUsers.forEach(user => {
          let userId;
          if (typeof user === "object") {
            userId = user._id;
          } else {
            userId = user;
          }
          if (groupTitle === "complete" || groupTitle === "done") {
            if (doneCount[userId] === undefined) doneCount[userId] = 0;
            doneCount[userId]++;
          } else {
            if (todosCount[userId] === undefined) todosCount[userId] = 0;
            todosCount[userId]++;
          }
        });
      });
    });
    let newTodos = [];
    let newDone = [];
    let membersNames = [];
    let members = board.members;
    members.forEach(member => {
      if (typeof member !== 'object') {
          member = this.$store.getters.getUserById(member);
      }
      membersNames.push(member.fullName.toUpperCase());
      newTodos.push(todosCount[member._id]);
      newDone.push(doneCount[member._id]);
    });

    this.boardMembers = membersNames;
    this.todos = newTodos;
    this.done = newDone;
  }
};
</script>