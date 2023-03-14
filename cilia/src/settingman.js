
const a = (a) => (a[0] ? a.replace(a[0], a[0].toUpperCase()) : a);
var b = {
        li: `<li>
							<a class="item-content tab-link" href="#settings-tab-{{n}}-{{wid}}">
								<span class="l"></span>
								<div class="item-media">
									<i class="icon mio">{{icon}}</i>
								</div>
								<div class="item-inner">
									<div class="item-title">
										{{title}}
									</div>
								</div>
							</a>
						</li>`,
        tab: `<div class="block tab" id="settings-tab-{{n}}-{{wid}}">
	{{@if title}}
		<div class="block-title block-title-medium">{{title}}</div>
	{{/if}}

	{{@if text}}
		<div class="block block-strong block-inset">{{text}}</div>
	{{/if}}

</div>`,
        select: `<li>
		  <a href="#" class="item-link smart-select" data-open-in="popover">
		    <select name="{{id}}" id="{{id}}">
		    	{{@each options}}
		      	<option value="{{value}}" {{@if selected}}selected{{/if}}>{{title}}</option>
		    	{{/each}}
		    </select>
		    <div class="item-content">
		      <div class="item-inner">
		        <div class="item-title">{{title}}</div>
		      </div>
		    </div>
		  </a>
		</li>`,
        input: `
		<li class="item-content item-input">
      <div class="item-inner">
        <div class="item-title item-label">{{title}}</div>
        <div class="item-input-wrap">
          <input id="{{id}}" type="text" name="{{id}}" value="{{value}}"/>
        </div>
        <div class="item-input-info"></div>
      </div>
    </li>
	`,
    },
    c = {
        setStyle(a) {
            var b;
            (b = "compact" == a ? "nope" : "yep"), d.style.set(b);
        },
        setTheme(a) {
            var b;
            (b = "user-based" == a ? "light" : "dark"), d.theme.set(b);
        },
        setColor(a) {
            Dom7(".theme-changer[to=" + a + "]").click();
        },
        setAbout(a, b) {
            var c = a.trim();
            !c ||
                150 < c.length ||
                c.match("<script") ||
                ((c = c.replace(/</gi, "&lt;")),
                $.post("/api/setabout?about=" + c).done((a) => {
                    "done" == a && (b.about = c);
                }));
        },
        empty() {},
    },
    d = window.settings,
    e = {
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
    };
var generateHTMLForSettings = (d, f, g) => {
    var h = $('<div class="margin-4 row" />'),
        j = $('<div class="col-60 medium-80 large-80 small-60 tabs me-tabs" />'),
        k = $('<div class="col-40 medium-20 large-20 small-40"><div class="list nav-list links-list searchbar-found"><ul></ul></div></div>'),
        l = k.find("ul"),
        m = $(`<div class="searchbar searchbar-inline">
      <div class="searchbar-input-wrap">
        <input type="text" placeholder="Search" />
        <i class="searchbar-icon"></i>
        <div class="input-clear-button"></div>
      </div>
    </div>`);
    for (var n in (k.prepend(m), e)) {
        var o = e[n];
        (o.wid = g), (o.n = n), l.append(at.template(b.li, o));
        var p = $(at.template(b.tab, o)),
            q = $('<div class="list"><ul></ul></div>'),
            r = q.find("ul");
        p.append(q),
            j.append(p),
            o.settings.forEach((g) => {
                (g.s = o), "select" == g.type && "string" == typeof g.options[0] && (g.options = g.options.map((b) => ({ title: a(b), value: b, selected: b == g.value })));
                var h = $(at.template(b[g.type], g));
                r.append(h);
                var e = h.find(g.type);
                e.on("change", () => {
                    c[g.callback](e.val(), d, f);
                });
            });
    }
    return h.append(k), h.append(j), h;
};

export default generateHTMLForSettings;
