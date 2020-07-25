<template>
  <section>
    <div><i class="fas fa-users"></i>Board Members: <h3>{{countBoardMembers}}</h3></div>
    <div><i class="fas fa-window-restore"></i>Tasks Groups: <h3>{{countTaskGroups}}</h3></div>
    <div><i class="fas fa-tasks"></i>Tasks: <h3>{{countTasks}}</h3></div>
    <div><i class="far fa-check-circle"></i>Done Tasks: <h3>{{countTasksDone}}</h3></div>
    <div><i class="fas fa-clipboard-list"></i>Todo Tasks: <h3>{{countTasksTodo}}</h3></div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      countTaskGroups: 0,
      countTasks: 0,
      countBoardMembers: 0,
      countTasksDone: 0,
      countTasksTodo: 0
    };
  },
  created() {
    let board = this.$store.getters.currBoard;
    let taskGroups = this.$store.getters.getCurrBoardTaskGroups;
    this.countTaskGroups = taskGroups.length;
    this.countBoardMembers = board.members.length;

    taskGroups.forEach(group => {
      let groupTitle = group.title.toLowerCase();
      let tasks = group.tasks;
      tasks.forEach(task => {
        this.countTasks++;
        if (groupTitle === "complete" || groupTitle === "done") {
          this.countTasksDone++;
        } else {
          this.countTasksTodo++;
        }
      });
    });
  }
};
</script>

<style>
</style>