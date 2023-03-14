import { el, $app, _app } from "lib/cilia/el.js";
import { getSync, getFrom, postSync, postTo } from "./req.js";

function newMenuListItem(icon, text, url, id, classe, cls){
    var a = $(`<a href="${url && typeof url != "function" ? url : "#"}" ${id ? 'id="'+id+'"' : ''} class="item-content ${classe || "item-link"}">
    ${cls ? '<div class="'+cls+'">' : ""}
          <div class="item-media">
            <i class="icon material-icons">${icon}</i>
          </div>
          <div class="item-inner">
            <div class="item-title-wrap">
              <div class="item-title">${text}</div>
            </div>
          </div>
          ${cls ? '</div>' : ''}
        </a>`);
    if(typeof url == "function") a.click(url).attr('href', '#');
    return a;
}

const menuItems = [
  {
    title: 'Home',
    icon: 'home',
    func: '/'
  },
];

function initMenu(app, viewEl){
  var _panel = el('panel panel-left panel-main main-panel');
  var panel = app.panel.create({
		el: _panel[0],
		visibleBreakpoint: 700,
		collapsedBreakpoint: 600,
    swipe: true,
    swipeOnlyClose: true,
		backdrop: false
	});

  var pfp = $(`<div class="avatar-image static-avatar" style="background-image: url('/avatar/${USER.username}')" data-name="${USER.name}" />`);

  var page = _panel.add('page page-bar')
  page.add(pfp);

  page.add($(`<div class="toolbar toolbar-bottom">
  <div class="toolbar-inner row">
    <div class="col-20 center-stuff">
      <a href="/settings" class="link">
        <i class="icon material-icons">settings</i>
      </a>
    </div>
    <div class="col-40 center-stuff">
      <b a>${USER.name}</b>
    </div>
    <div class="col-40 center-stuff">
      <a href="#popover--profile" class="link">
        <div class="avatar-image" style="background-image: url('/avatar/${USER.username}')"></div>
      </a>
    </div>
  </div>
</div>`));
  var menu = page.add('list menu-list').add('','ul');

  pfp.click(() => {
    if(window.innerWidth < 700){
      panel.toggle();
    }
  });

  $(window).on('resize', () => {
    if(window.innerWidth < 700) pfp.addClass('wide').appendTo(viewEl);
    else pfp.removeClass('wide').appendTo(page);
  });

  menuItems.forEach(item => {
    menu.add(newMenuListItem(item.icon, item.title, item.func));
  });

}

export default initMenu;