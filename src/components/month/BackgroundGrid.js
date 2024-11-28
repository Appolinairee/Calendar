import m from "mithril";

const BackgroundGrid = {
    getDayInfo: function (cellIndex, firstDay, lastDay, prevMonthDays) {
        let day = '';
        let styleClass = '';

        if (cellIndex < firstDay) {
            day = prevMonthDays - (firstDay - cellIndex - 1);
            styleClass = 'month-inactive-day';
        } else if (cellIndex >= firstDay && cellIndex < firstDay + lastDay) {
            day = cellIndex - firstDay + 1;
        } else {
            day = cellIndex - firstDay - lastDay + 1;
            styleClass = 'month-inactive-day';
        }

        return { day, styleClass };
    },

    renderCell: function (i, j, date, currentDay, firstDay, lastDay, prevMonthDays) {
        const baseClass = (i % 5 === 0) ? ' month-grid-border' : '';
        const cellIndex = Math.floor(i / 5) * 7 + j;

        if (i % 5 !== 0) {
            return m('.month-grid-cell', { class: baseClass });
        }

        const { day, styleClass } = this.getDayInfo(cellIndex, firstDay, lastDay, prevMonthDays);
        let finalClass = `${baseClass} ${styleClass}`;

        if (day === currentDay) {
            finalClass += ' current-day';
        }

        return m('.month-grid-cell', { class: finalClass }, m('span', day));
    },

    view: function (vnode) {
        const components = [];
        const currentDate = new Date(vnode.attrs.date);
        const { year, month, today, isCurrentMonth, currentDay, firstDay, lastDay, prevMonthDays } = this.getDateInfo(currentDate);

        vnode.attrs.month.cases.forEach((row, rowIndex) => {
            row.forEach((_, colIndex) => {
                components.push(this.renderCell(rowIndex, colIndex, currentDate, currentDay, firstDay, lastDay, prevMonthDays));
            });
        });

        return m('.month-grid', components);
    },

    getDateInfo: function (currentDate) {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const today = new Date();
        const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
        const currentDay = isCurrentMonth ? today.getDate() : null;
        const firstDay = new Date(year, month, 1).getDay();
        const lastDay = new Date(year, month + 1, 0).getDate();
        const prevMonthDays = new Date(year, month, 0).getDate();

        return { year, month, today, isCurrentMonth, currentDay, firstDay, lastDay, prevMonthDays };
    }
};

export default  BackgroundGrid;