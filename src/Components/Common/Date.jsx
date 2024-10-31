export const publishedDateFunc = (timestamp) => {
  const date = new Date(timestamp);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};

export const publishedTimeFunc = (timestamp) => {
  const date = new Date(timestamp);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Determine AM or PM
  const period = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hours = hours % 12 || 12; // Convert 0 to 12 for midnight

  const time = `${hours.toString().padStart(2, "0")}:${minutes} ${period}`;
  return time;
};
