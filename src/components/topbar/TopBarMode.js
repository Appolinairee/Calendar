import m from "mithril";
import SelectField from "./SelectField";

const TopBarMode = {
  isMobile: window.matchMedia("(max-width: 768px)").matches,

  oninit: function () {
    this.isMobile = window.matchMedia("(max-width: 768px)").matches;
    this.updateMobileStatus = () => {
      this.isMobile = window.matchMedia("(max-width: 768px)").matches;
      m.redraw();
    };
    window.addEventListener("resize", this.updateMobileStatus);
  },

  onremove: function () {
    window.removeEventListener("resize", this.updateMobileStatus);
  },

  view: function (vnode) {
    const { calendar } = vnode.attrs;

    const options = [
      { label: "Month", value: "month" },
      { label: "Year", value: "year" },
    ];

    if (!this.isMobile) {
      options.unshift({ label: "Day", value: "day" });
      options.unshift({ label: "Week", value: "week" });
    }

    return this.isMobile
      ? m(SelectField, {
          value: calendar.currentMode,
          onChange: (mode) => calendar.switchMode(mode),
          options: options,
          placeholder: "Select Mode",
          className: "top-bar-mode-select",
          inputClass: "custom-input-class",
        })
      : m(".top-bar-mode.flex", [
          m(
            "span",
            {
              class: calendar.currentMode === "day" ? "active" : "",
              onclick: () => calendar.switchMode("day"),
            },
            "Day"
          ),
          m(
            "span",
            {
              class: calendar.currentMode === "week" ? "active" : "",
              onclick: () => calendar.switchMode("week"),
            },
            "Week"
          ),
          m(
            "span",
            {
              class: calendar.currentMode === "month" ? "active" : "",
              onclick: () => calendar.switchMode("month"),
            },
            "Month"
          ),
          m(
            "span",
            {
              class: calendar.currentMode === "year" ? "active" : "",
              onclick: () => calendar.switchMode("year"),
            },
            "Year"
          ),
        ]);
  },
};

export default TopBarMode;
