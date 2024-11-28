import m from "mithril";

const WeekDaysList = {
    getWeekDays: function () {
        const daysOfWeek = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
        const currentDate = new Date();
        const currentDay = currentDate.getDay();

        const startOfWeek = new Date(currentDate);
        const dayOffset = (currentDay === 0 ? -6 : 1) - currentDay;

        startOfWeek.setDate(currentDate.getDate() + dayOffset);

        return Array.from({ length: 7 }, (_, i) => {
            const weekDay = new Date(startOfWeek);
            weekDay.setDate(startOfWeek.getDate() + i);
            const dayName = daysOfWeek[weekDay.getDay() === 0 ? 6 : weekDay.getDay() - 1];
            const dayNumber = String(weekDay.getDate()).padStart(2, '0');

            return {dayName, dayNumber};
        });
    },

    view: function () {
        return m('.weekDaysList', this.getWeekDays().map(day => {
            return m(".day-item", [
                m('span', day.dayName),
                m('p', day.dayNumber),
            ]);
        }));
    }
}

export default  WeekDaysList;