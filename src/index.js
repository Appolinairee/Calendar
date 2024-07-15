const m = require("mithril");
const CalendarDayView = require("./pages/Day");

const events = [
    { title: "Réunion", startDate: "2024-07-14T09:00:00Z", endDate: "2024-07-14T10:00:00Z" },
    { title: "Atelier", startDate: "2024-07-14T11:00:00Z", endDate: "2024-07-14T12:30:00Z" }
];

m.mount(document.body, {
    view: () => m(CalendarDayView, { events })
});
