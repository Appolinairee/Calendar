const m = require("mithril");

const TopBarDate = {
    formatDate: function (date, mode) {
        let options;
        switch (mode) {
            case 'month':
                options = { year: 'numeric', month: 'short' };
                break;
            case 'year':
                options = { year: 'numeric' };
                break;
            default:
                options = { year: 'numeric', month: 'short', day: 'numeric' };
        }
        return date.toLocaleDateString('fr-FR', options);
    },

    adjustDate: function (currentDate, days, mode) {
        const newDate = new Date(currentDate);
        switch (mode) {
            case 'month':
                newDate.setMonth(newDate.getMonth() + days);
                break;
            case 'year':
                newDate.setFullYear(newDate.getFullYear() + days);
                break;
            default:
                newDate.setDate(newDate.getDate() + days);
        }
        return newDate;
    },

    setToday: function (mode) {
        const today = new Date();
        switch (mode) {
            case 'month':
                today.setDate(1);
                break;
            case 'year':
                today.setMonth(0, 1);
                break;
            default:
                // For 'day' mode, keep today's date as it is
                break;
        }
        return today;
    },

    view: function (vnode) {
        const { calendar } = vnode.attrs;
        const mode = calendar.currentMode;

        return m('.top-bar-date.flex', [
            m('span', {
                onclick: () => {
                    calendar.setCurrentDate(this.setToday(mode));
                }
            }, 'Today'),
            m('.chevrons.flex', [
                m('i.fas.fa-chevron-left', {
                    onclick: () => {
                        calendar.setCurrentDate(this.adjustDate(calendar.date, -1, mode));
                    }
                }),
                m('i.fas.fa-chevron-right', {
                    onclick: () => {
                        calendar.setCurrentDate(this.adjustDate(calendar.date, 1, mode));
                    }
                })
            ]),
            m('p', this.formatDate(calendar.date, mode)),
        ]);
    }
};

module.exports = TopBarDate;