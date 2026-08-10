import Notification from "../models/notification.model.js";

const createNotification = async ({
  user,
  title,
  message,
  type = "system",
  referenceId = null,
  project,
}) => {
  await Notification.create({
    user,
    title,
    message,
    type,
    referenceId,
    project,
  });
};

export default createNotification;
