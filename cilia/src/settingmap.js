export default {
    layouts: {
        title: "Layouts",
        icon: "layers",
        settings: [
            { type: "select", icon: "dashboard", id: "style", title: "Style", callback: "setStyle", value: "nope" == null ? "compact" : "free", options: ["free", "compact"] },
            { type: "select", icon: "format_paint", id: "theme", title: "Theme", callback: "setTheme", value: "light" == null ? "user-based" : "app-based", options: ["user-based", "app-based"] },
            { type: "select", icon: "palette", id: "color", title: "Color", callback: "setColor", value: null, options: ["orange", "purple", "default", "green", "blue"] },
        ],
    },
    profile: {
        title: "Profile",
        icon: "person",
        settings: [{ type: "input", icon: "palette", id: "user-about", title: "About", callback: "setAbout", value: "" }],
    },
    Rayous: { title: "Rayous", icon: "article", text: "You can set the settings of Rayous in Rayous itself.", settings: [] },
    LRN: { title: "LRN", icon: "article", text: "You can set the settings of LRN in LRN itself.", settings: [] },
    Linque: { title: "Linque", icon: "article", settings: [{ type: "input", icon: "dashboard", id: "lin-mit", title: "Links per page", callback: "empty", value: 24 }] },
}