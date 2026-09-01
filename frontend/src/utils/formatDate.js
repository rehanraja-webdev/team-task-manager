const formatDate = (rawDate) => {
  const date = new Date(rawDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return date;
};

export default formatDate;
