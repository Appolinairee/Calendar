import m from "mithril";
import TopBarDate from "./TopBarDate";
import TopBarMode from "./TopBarMode";
import TopBarSearch from "./TopBarSearch";

const TopBar = {
    view: function (vnode) {
        const { calendar } = vnode.attrs;

        return m('.top-bar.flex', [
            m(TopBarDate, { calendar }),
            m(TopBarMode, { calendar }),
            m(TopBarSearch)
        ]);
    }
};

export default  TopBar;