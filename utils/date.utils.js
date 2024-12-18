function isValidISODate(dateString) {
  const timestamp = Date.parse(dateString);
  return !isNaN(timestamp);
}

function getUtcDate(date) {
  const utcDate = new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );

  return utcDate;
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString("fr-FR", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatHour(date) {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

function formatDateForDayNav(date) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("fr-FR", options);
}

function formatDateForDayEvent(dateString) {
  const date = getUtcDate(new Date(dateString));
  const options = { hour: "2-digit", minute: "2-digit" };

  return date.toLocaleTimeString("fr-FR", options);
}

export {
  isValidISODate,
  getUtcDate,
  formatDate,
  formatHour,
  formatDateForDayNav,
  formatDateForDayEvent,
};
