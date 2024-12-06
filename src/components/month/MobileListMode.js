import m from "mithril";

const MobileListMode = () => {
    return {
        view: (vnode) => {
            return m('div', { class: "list-mode-container" }, [
                m("div", { class: "list-mode" }, "Hello"),
                m("div", {
                    class: "overlay",
                    onclick: () => vnode.attrs.calendar.desactiveMobileListMode(),
                }),
            ])
        }
    }
}

export default MobileListMode;