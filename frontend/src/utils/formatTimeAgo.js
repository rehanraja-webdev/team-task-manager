const formatTimeAgo = (createdAt) => {
  const createdDate = new Date(createdAt);
  const now = new Date();

  const diffInSeconds = Math.floor((now - createdDate) / 1000);

  if (diffInSeconds < 0 || isNaN(diffInSeconds)) return "just now";

  const minute = 60;
  const hour = 3600; // 60 * 60
  const day = 86400; // 60 * 60 * 24
  const month = 2592000; // 30 * 86400
  const year = 31536000; // 365 * 86400

  if (diffInSeconds < minute) {
    return `${diffInSeconds} sec ago`;
  } else if (diffInSeconds < hour) {
    const mins = Math.floor(diffInSeconds / minute);
    return `${mins} min ago`;
  } else if (diffInSeconds < day) {
    const hours = Math.floor(diffInSeconds / hour);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < month) {
    const days = Math.floor(diffInSeconds / day);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < year) {
    const months = Math.floor(diffInSeconds / month);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else {
    const years = Math.floor(diffInSeconds / year);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }
};
export default formatTimeAgo;
