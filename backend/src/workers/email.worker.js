import jobQueue from "../utils/jobQueue.js";
import sendEmail from "../services/email.service.js";

const startEmailWorker = () => {
  setInterval(async () => {
    //get the job from the jobs in FIFO order
    const job = jobQueue.getNextJob();

    if (!job) return; //jobs is empty

    try {
      await sendEmail(job);
      console.log("Job Completed");
    } catch (error) {
      job.attempts++;

      if (job.attempts <= 3) {
        jobQueue.addJob(job);
      }
      console.log("Job failed", error.message);
    }
  }, 5000);
};

export default startEmailWorker;
