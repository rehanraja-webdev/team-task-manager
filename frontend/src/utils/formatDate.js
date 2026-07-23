const formatDate = (rawDate) => {
  const date = new Date(rawDate).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return date;
};

export default formatDate;
