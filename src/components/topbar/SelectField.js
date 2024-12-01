import m from "mithril";
import Label from "./Label";
import Option from "./Option";

const SelectField = () => {
  return {
    oninit: (vnode) => {
      vnode.state.inputId = `select_${Math.random().toString(36).substr(2, 9)}`;
      vnode.state.selected = vnode.attrs.value || "";
      vnode.state.isOpen = false;
      vnode.state.selectRef = null;
      vnode.state.searchValue = "";

      vnode.state.handleClickOutside = (event) => {
        if (
          vnode.state.selectRef &&
          !vnode.state.selectRef.contains(event.target)
        ) {
          vnode.state.isOpen = false;
        }
      };
    },

    oncreate: (vnode) => {
      document.addEventListener("click", vnode.state.handleClickOutside);
    },

    onremove: (vnode) => {
      document.removeEventListener("click", vnode.state.handleClickOutside);
    },

    view: (vnode) => {
      const {
        className,
        value,
        onChange,
        label,
        icon,
        options,
        inputClass,
        placeholder,
        isRequired,
        enableSearch = false,
      } = vnode.attrs;

      const { selected, isOpen, inputId, searchValue } = vnode.state;

      const handleButtonClick = () => {
        vnode.state.isOpen = !vnode.state.isOpen;
      };

      const handleOptionClick = (optionValue) => {
        vnode.state.selected = optionValue;
        vnode.state.isOpen = false;
        if (onChange) onChange(optionValue);
      };

      const handleSearchChange = (e) => {
        vnode.state.searchValue = e.target.value;
      };

      const filteredOptions = enableSearch
        ? options.filter((option) =>
          option.label.toLowerCase().includes(searchValue.toLowerCase())
        )
        : options;

      return m("div", [
        label && m(Label, { id: inputId, icon, required: isRequired }, label),

        m(
          "div",
          {
            ref: (node) => {
              vnode.state.selectRef = node;
            },
            class: `select-container ${className || ""}`,
          },
          [
            m(
              "button",
              {
                type: "button",
                class: `select-button ${inputClass || ""}`,
                onclick: handleButtonClick,
              },
              [
                m(
                  "span",
                  options.find((option) => option.value == selected)?.label ||
                  value ||
                  placeholder ||
                  label
                ),
                m("i", {
                  class: `fa-solid fa-chevron-up  select-icon ${isOpen ? "open" : "closed"}`,
                }),
              ]
            ),

            isOpen &&
            m("div", {
              class: "overlay",
              onclick: handleButtonClick,
            }),

            isOpen &&
            options.length > 0 &&
            m(
              "div",
              { class: "select-options" },
              [
                enableSearch &&
                m("input", {
                  type: "text",
                  placeholder: "Recherche...",
                  class: "search-input",
                  value: searchValue,
                  oninput: handleSearchChange,
                }),

                m(
                  "p",
                  { class: "options-placeholder" },
                  filteredOptions.length > 0 ? placeholder : "Aucun résultat"
                ),

                filteredOptions.map((option) =>
                  m(Option, {
                    key: option.value,
                    option,
                    isSelected: option.value === selected,
                    onClick: () => handleOptionClick(option.value),
                  })
                ),
              ]
            ),
          ]
        ),
      ]);
    },
  };
};

export default SelectField;