const jobs = [];

//push jobs one by one
const addJob = (job) => {
  jobs.push(job);
};

const getNextJob = () => {
  //remove job in FIFO order
  return jobs.shift();
};

const getQueueSize = () => {
  return jobs.length;
};

export default { addJob, getNextJob, getQueueSize };
