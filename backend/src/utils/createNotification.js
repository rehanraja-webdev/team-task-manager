import Notification from "../models/notification.model.js";

const createNotification = async ({
  user,
  title,
  message,
  type = "system",
  referenceId = null,
}) => {
  await Notification.create({
    user,
    title,
    message,
    type,
    referenceId,
  });
};

export default createNotification;
