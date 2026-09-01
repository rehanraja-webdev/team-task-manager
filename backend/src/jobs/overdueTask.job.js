import cron from "node-cron";
import Task from "../models/task.model.js";
import Activity from "../models/activity.model.js";

const startOverdueTaskJob = () => {
  //crons syntax "* * * * *"
  //minute hour Day month weekday(Monday)
  cron.schedule("* * * * *", async () => {
    console.log("Checking overdue tasks...");

    const overdueTasks = await Task.find({
      status: { $ne: "done" },
      dueDate: { $lt: new Date() },
    });

    for (const task of overdueTasks) {
      const alreadyLogged = await Activity.findOne({
        task: task._id,
        action: "Task Marked Overdue",
      });

      if (alreadyLogged) continue;

      await Activity.create({
        task: task._id,
        user: task.assignedTo,
        action: "Task Marked Overdue",
      });

      console.log(`Overdue: ${task.title}`);
    }
  });
};

export default startOverdueTaskJob;
