import m from "mithril";

const Label = () => {
  return {
    view: ({ attrs, children }) => {
      if (!attrs.htmlFor && (!children || !children.length)) return;

      return m(
        "label",
        {
          for: attrs.htmlFor,
          class: `label ${attrs.className || ""}`,
          style: attrs.style,
          ...attrs,
        },
        [
          children,
          attrs.isRequired
            ? m("p", { class: "label-required" }, "*")
            : null,
        ]
      );
    },
  };
};

export default Label;
