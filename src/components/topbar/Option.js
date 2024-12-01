import m from "mithril";

const Option = () => {
  return {
    view: ({ attrs }) => {
      return m(
        "div",
        {
          class: `option ${attrs.isSelected ? "selected" : ""}`,
          onclick: () => attrs.onClick(attrs.option.value),
        },
        [
          m(
            "span",
            attrs.isSelected
              ? m("i", { class: "icon-selected" })
              : m("i", { class: "icon-unselected" })
          ),
          m("p", { class: "option-label" }, attrs.option.label)
        ]
      );
    },
  };
};

export default Option;