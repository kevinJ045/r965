/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./alia/lib/cilia/el.js":
/*!******************************!*\
  !*** ./alia/lib/cilia/el.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"$app\": () => (/* binding */ $app),\n/* harmony export */   \"_app\": () => (/* binding */ _app),\n/* harmony export */   \"el\": () => (/* binding */ el)\n/* harmony export */ });\nvar $app = $(\"#app-root\");\nvar _app = $app[0];\n\nfunction el(classe, name, container){\n    if(!name) name = 'div';\n    if(!container) container = $app; \n    var el = $('<'+name+' />');\n    el.addClass(classe);\n    el.appendTo(container);\n    return el;\n}\n\n\n\n//# sourceURL=webpack://r965/./alia/lib/cilia/el.js?");

/***/ }),

/***/ "./alia/lib/colors.js":
/*!****************************!*\
  !*** ./alia/lib/colors.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n\t\"aqua\": [0, 80, 255, 255],\n\t\"blue\": [0, 80, 255, 255],\n\t\"default\": [133, 59, 206, 255],\n\t\"green\": [19, 170, 94, 255],\n\t\"orange\": [255, 128, 0, 255]\n});\n\n//# sourceURL=webpack://r965/./alia/lib/colors.js?");

/***/ }),

/***/ "./alia/misc/rand.js":
/*!***************************!*\
  !*** ./alia/misc/rand.js ***!
  \***************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"pickRandom\": () => (/* binding */ pickRandom),\n/* harmony export */   \"randFrom\": () => (/* binding */ randFrom)\n/* harmony export */ });\nvar pickRandom = function(){\n  var words = arguments;\n  if(words.length <= 1) return arguments[0];\n  if(arguments[0] instanceof Array) words = arguments[0];\n  var randomWord = Array.from(words);\n  var rand = Math.floor(Math.random() * randomWord.length);\n  return randomWord[rand];\n}\n\nvar randFrom = function(min,max) {\n  return Math.floor(Math.random()*(max-min+1)+min);\n}\n\n\n\n//# sourceURL=webpack://r965/./alia/misc/rand.js?");

/***/ }),

/***/ "./cilia/src/components.js":
/*!*********************************!*\
  !*** ./cilia/src/components.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var misc_rand_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! misc/rand.js */ \"./alia/misc/rand.js\");\n/* harmony import */ var _components_home_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/home.js */ \"./cilia/src/components/home.js\");\n/* harmony import */ var _components_settings_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/settings.js */ \"./cilia/src/components/settings.js\");\n\n\n\n\n\n\nconst components = {};\ncomponents.sub = {};\n\ncomponents.sub.login = (uname, pwd, logbtn) => {\n\tif(uname.match(/([\\s\\W]+)/g)) toastAs(\"No special characters allowed!!\");\n\tif(!uname.length) return toastAs(\"No username entered\");\n\tif(uname.length < 5) return toastAs(\"Username too short\");\n\tif(uname.length > 32) return toastAs(\"Max of 32 characters for username\");\n\tif(!pwd.length) return toastAs(\"No password entered\");\n\tif(logbtn) logbtn.addClass('button-loading');\n\tvar confirmLogin = () => {\n\t\tpostTo('/login/'+uname+'?pwd='+pwd, {}, function(e){\n\t\t\tif(logbtn) logbtn.removeClass('button-loading');\n\t\t\tif(e.failed){\n\t\t\t\ttoastAs(\"Wrong username or password\");\n\t\t\t} else {\n\t\t\t\tlocation.reload();\n\t\t\t}\n\t\t});\n\t};\n\tgetFrom('/usernameavail/'+uname, d => {\n\t\tif(d == \"false\"){\n\t\t\tconfirmLogin();\n\t\t} else {\n\t\t\tapp.dialog.confirm('Create account?', () => {\n\t\t\t\tpostTo('/register/'+uname+'?pwd='+pwd, {}, function(e){\n\t\t\t\t\tconfirmLogin();\n\t\t\t\t});\n\t\t\t});\n\t\t}\n\t});\n}\n\ncomponents.login = (props, { $f7, $on, $el, $update, $h }) => {\n\n\t$on('pageInit', () => {\n\n\t\tvar logbtn = $el.value.find('#login-btn');\n\n\t\tlogbtn.click(() => {\n\t\t\tvar uname = $el.value.find(\"#username\").val().trim();\n\t\t\tvar pass = $el.value.find(\"#password\").val().trim();\n\t\t\tcomponents.sub.login(uname, pass, logbtn);\n\t\t});\n\n\t});\n\n\treturn () => $h `\n\t\t\t<div class=\"page no-navbar no-toolbar no-swipeback\">\n\t\t\t    <div class=\"page-content login-screen-content display-center\">\n\t\t\t    \t<div class=\"block\">\n\t\t\t      <div class=\"login-screen-title\">Cilia login</div>\n\t\t\t      <form autocomplete=\"false\">\n\t\t\t        <div class=\"list\">\n\t\t\t          <ul>\n\t\t\t            <li class=\"item-content item-input\">\n\t\t\t              <div class=\"item-inner\">\n\t\t\t                <div class=\"item-title item-label\">Username</div>\n\t\t\t                <div class=\"item-input-wrap\">\n\t\t\t                  <input type=\"text\" id=\"username\" placeholder=\"Your username\" />\n\t\t\t                </div>\n\t\t\t              </div>\n\t\t\t            </li>\n\t\t\t            <li class=\"item-content item-input\">\n\t\t\t              <div class=\"item-inner\">\n\t\t\t                <div class=\"item-title item-label\">Password</div>\n\t\t\t                <div class=\"item-input-wrap\">\n\t\t\t                  <input type=\"password\" id=\"password\" placeholder=\"Your password\" />\n\t\t\t                </div>\n\t\t\t              </div>\n\t\t\t            </li>\n\t\t\t          </ul>\n\t\t\t        </div>\n\t\t\t        <div class=\"list\">\n\t\t\t          <ul>\n\t\t\t            <li><a href=\"#\" class=\"list-button button-preloader\" id=\"login-btn\"><span class=\"preloader\"></span>Login</a></li>\n\t\t\t          </ul>\n\t\t\t          <div class=\"block-footer\">\n\t\t\t            <p>If you don't already have one a new account will be opened automatically for you.</p>\n\t\t\t            <p>Got any problems? <a href=\"#ask\" id=\"got-problems\">Click here</a></p>\n\t\t\t          </div>\n\t\t\t        </div>\n\t\t\t      </form>\n\t\t\t    </div>\n\t\t    </div>\n\t\t  </div>\n\t\t`;\n}\n\ncomponents.home = _components_home_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\ncomponents.settings = _components_settings_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"];\n\nwindow.components = components;\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (components);\n\n\n//# sourceURL=webpack://r965/./cilia/src/components.js?");

/***/ }),

/***/ "./cilia/src/components/home.js":
/*!**************************************!*\
  !*** ./cilia/src/components/home.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((props, { $f7, $on, $el, $update, $h }) => {\n\treturn () => $h `<div class=\"page\">\n\t\t<div class=\"page-content\">\n\t\t\t<div class=\"block\">\n\n\t\t\t\t<div class=\"block-title-medium magic-title ml6\">\n\t\t\t\t\t<span class=\"text-wrapper\">\n\t\t\t\t\t    <span class=\"letters\">\n\t\t\t\t\t    \tHello %1${USER.name}%\n\t\t\t\t\t    </span>\n\t\t\t\t\t</span>\n\t\t\t\t</div>\n\n\t\t\t</div>\n\t\t</div>\n\t</div>`;\n});\n\n//# sourceURL=webpack://r965/./cilia/src/components/home.js?");

/***/ }),

/***/ "./cilia/src/components/settings.js":
/*!******************************************!*\
  !*** ./cilia/src/components/settings.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _settingman_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../settingman.js */ \"./cilia/src/settingman.js\");\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((props, { $f7, $on, $el, $update, $h }) => {\n\n\t$on('pageInit', (e, page) => {\n\t\tvar html = (0,_settingman_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n\t\tvar block = elementor('block');\n\t\t$el.value.find('.page-content').append(block[0]);\n\t\tblock.append(html[0]);\n\t});\n\n\treturn () => $h `<div class=\"page\">\n\t\t<div class=\"page-content\">\n\n\t\t</div>\n\t</div>`;\n});\n\n//# sourceURL=webpack://r965/./cilia/src/components/settings.js?");

/***/ }),

/***/ "./cilia/src/main.js":
/*!***************************!*\
  !*** ./cilia/src/main.js ***!
  \***************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _routes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./routes.js */ \"./cilia/src/routes.js\");\n/* harmony import */ var _menu_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menu.js */ \"./cilia/src/menu.js\");\n/* harmony import */ var lib_cilia_el_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lib/cilia/el.js */ \"./alia/lib/cilia/el.js\");\n/* harmony import */ var lib_colors_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lib/colors.js */ \"./alia/lib/colors.js\");\n/* harmony import */ var _req_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./req.js */ \"./cilia/src/req.js\");\n/* harmony import */ var _settings_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./settings.js */ \"./cilia/src/settings.js\");\n\n\n\n\n\n\n\n\n\nwindow.settings = {\n    color: new _settings_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"]('preferredColor', Object.keys(lib_colors_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]))\n};\n\nif(USER.loggedin) $('body').removeClass('blue-sky').addClass('theme-'+settings.color.get());\n\nfunction initApp(){\n\tvar menu, mainView;\n\tvar viewEl = (0,lib_cilia_el_js__WEBPACK_IMPORTED_MODULE_2__.el)('view view-main main-viewel');\n\n\tfunction toastAs(text){\n\t    app.toast.create({text, closeTimeout: 2000}).open();\n\t}\n\twindow.toastAs = toastAs;\n\twindow.elementor = lib_cilia_el_js__WEBPACK_IMPORTED_MODULE_2__.el;\n\twindow.getSync = _req_js__WEBPACK_IMPORTED_MODULE_4__.getSync;\n\twindow.getFrom = _req_js__WEBPACK_IMPORTED_MODULE_4__.getFrom;\n\twindow.postSync = _req_js__WEBPACK_IMPORTED_MODULE_4__.postSync;\n\twindow.postTo = _req_js__WEBPACK_IMPORTED_MODULE_4__.postTo;\n\n\n\t/*\n\t    Initialize Framework7 App\n\t    https://framework7.io/docs\n\t*/\n\n\tconsole.log(_routes_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\n\n\tvar app = new Framework7({\n\t    el: '#app-root',\n\t    name: 'Cilia',\n\t    theme: 'md',\n\t    id: 'com.esvigd.cilia',\n\t    routes: _routes_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n\t    view: {\n\t    \tbrowserHistory: true,\n\t        browserHistorySeparator: '',\n\t        browserHistoryRoot: location.origin\n\t    },\n\t    on: {\n\t    \tpageAfterIn(e){\n\t    \t\tvar el = $(e.pageEl);\n\t    \t\tvar $title = el.find('.ml6 .letters');\n\t\t\t\t$title.each(function(){\n\t\t\t\t\tvar $ths = $(this);\n\t\t\t\t\t$ths.html($ths.text()\n\t\t\t\t\t\t.replace(/\\S/g, '<span class=\"letter\">$&</span>')\n\t\t\t\t\t\t.replace(/<span class=\"letter\">%<\\/span><span class=\"letter\">([0-9])<\\/span>([\\s\\S]+)<span class=\"letter\">%<\\/span>/g, \"<b b$1>$2</b>\"));\n\t\t\t\t});\n\t\t\t\tanime.timeline()\n\t\t\t\t  .add({\n\t\t\t\t    targets: '.ml6 .letter',\n\t\t\t\t    translateY: [\"1.1em\", 0],\n\t\t\t\t    translateZ: 0,\n\t\t\t\t    duration: 750,\n\t\t\t\t    delay: (el, i) => 20 * i\n\t\t\t\t  });\n\t    \t}\n\t    }\n\t});\n\n\twindow.app = app;\n\twindow.viewEl = viewEl;\n\n\n\tmainView = app.views.create(viewEl[0]);\n\twindow.mainView = mainView;\n\n\tconsole.log(mainView)\n\n\tif(USER.loggedin) (0,_menu_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(app, viewEl);\n\n\tfunction reloadPage(){\n\t\tmainView.router.refreshPage();\n\t}\n\n\tfunction navTo(path){\n\t\tmainView.router.navigate(path);\n\t}\n\n\twindow.reloadPage = reloadPage;\n\twindow.navTo = navTo;\n}\n\nfunction reinitApp(){\n\tdelete Framework7.instance;\n\t$(\"#app-root\").empty();\n\tinitApp();\n}\nwindow.reinitApp = reinitApp;\nwindow.initApp = initApp;\n\n$(window).on('settings:preferredColor', reinitApp);\n\ninitApp();\n\n//# sourceURL=webpack://r965/./cilia/src/main.js?");

/***/ }),

/***/ "./cilia/src/menu.js":
/*!***************************!*\
  !*** ./cilia/src/menu.js ***!
  \***************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var lib_cilia_el_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lib/cilia/el.js */ \"./alia/lib/cilia/el.js\");\n/* harmony import */ var _req_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./req.js */ \"./cilia/src/req.js\");\n\n\n\nfunction newMenuListItem(icon, text, url, id, classe, cls){\n    var a = $(`<a href=\"${url && typeof url != \"function\" ? url : \"#\"}\" ${id ? 'id=\"'+id+'\"' : ''} class=\"item-content ${classe || \"item-link\"}\">\n    ${cls ? '<div class=\"'+cls+'\">' : \"\"}\n          <div class=\"item-media\">\n            <i class=\"icon material-icons\">${icon}</i>\n          </div>\n          <div class=\"item-inner\">\n            <div class=\"item-title-wrap\">\n              <div class=\"item-title\">${text}</div>\n            </div>\n          </div>\n          ${cls ? '</div>' : ''}\n        </a>`);\n    if(typeof url == \"function\") a.click(url).attr('href', '#');\n    return a;\n}\n\nconst menuItems = [\n  {\n    title: 'Home',\n    icon: 'home',\n    func: '/'\n  },\n];\n\nfunction initMenu(app, viewEl){\n  var _panel = (0,lib_cilia_el_js__WEBPACK_IMPORTED_MODULE_0__.el)('panel panel-left panel-main main-panel');\n  var panel = app.panel.create({\n\t\tel: _panel[0],\n\t\tvisibleBreakpoint: 700,\n\t\tcollapsedBreakpoint: 600,\n    swipe: true,\n    swipeOnlyClose: true,\n\t\tbackdrop: false\n\t});\n\n  var pfp = $(`<div class=\"avatar-image static-avatar\" style=\"background-image: url('/avatar/${USER.username}')\" data-name=\"${USER.name}\" />`);\n\n  var page = _panel.add('page page-bar')\n  page.add(pfp);\n\n  page.add($(`<div class=\"toolbar toolbar-bottom\">\n  <div class=\"toolbar-inner row\">\n    <div class=\"col-20 center-stuff\">\n      <a href=\"/settings\" class=\"link\">\n        <i class=\"icon material-icons\">settings</i>\n      </a>\n    </div>\n    <div class=\"col-40 center-stuff\">\n      <b a>${USER.name}</b>\n    </div>\n    <div class=\"col-40 center-stuff\">\n      <a href=\"#popover--profile\" class=\"link\">\n        <div class=\"avatar-image\" style=\"background-image: url('/avatar/${USER.username}')\"></div>\n      </a>\n    </div>\n  </div>\n</div>`));\n  var menu = page.add('list menu-list').add('','ul');\n\n  pfp.click(() => {\n    if(window.innerWidth < 700){\n      panel.toggle();\n    }\n  });\n\n  $(window).on('resize', () => {\n    if(window.innerWidth < 700) pfp.addClass('wide').appendTo(viewEl);\n    else pfp.removeClass('wide').appendTo(page);\n  });\n\n  menuItems.forEach(item => {\n    menu.add(newMenuListItem(item.icon, item.title, item.func));\n  });\n\n  app._mainpanel = panel;\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (initMenu);\n\n//# sourceURL=webpack://r965/./cilia/src/menu.js?");

/***/ }),

/***/ "./cilia/src/req.js":
/*!**************************!*\
  !*** ./cilia/src/req.js ***!
  \**************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getFrom\": () => (/* binding */ getFrom),\n/* harmony export */   \"getSync\": () => (/* binding */ getSync),\n/* harmony export */   \"postSync\": () => (/* binding */ postSync),\n/* harmony export */   \"postTo\": () => (/* binding */ postTo)\n/* harmony export */ });\nconst baseUrl = \"/api/\";\n\nfunction fix(baseUrl, url){\n\tif(url.startsWith('/')) return url;\n\treturn baseUrl+url;\n}\n\nfunction getSync(url){\n    return $.ajax({url: fix(baseUrl,url), async: false}).responseJSON;\n}\n\nfunction getFrom(url, callback = () => {}){\n    return $.ajax({url: fix(baseUrl,url)}).done(callback);\n}\n\nfunction postSync(url, data){\n    return $.ajax({url: fix(baseUrl,url), data, async: false, method: \"POST\"}).responseJSON;\n}\n\nfunction postTo(url, data, callback = () => {}){\n    return $.ajax({url: fix(baseUrl,url), data, method: \"POST\"}).done(callback);\n}\n\n\n\n//# sourceURL=webpack://r965/./cilia/src/req.js?");

/***/ }),

/***/ "./cilia/src/routes.js":
/*!*****************************!*\
  !*** ./cilia/src/routes.js ***!
  \*****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _components_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components.js */ \"./cilia/src/components.js\");\n\n\nconst ROUTES = [];\n\nif(!USER.loggedin) {\n\tif(location.pathname != \"/\") location.href = \"/\";\n\tROUTES.push({\n\t\tpath: '/',\n\t\tcomponent: _components_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].login\n\t});\n} else {\n\tROUTES.push(\n\t\t{\n\t\t\tpath: '/',\n\t\t\tcomponent: _components_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].home\n\t\t}, {\n\t\t\tpath: '/settings',\n\t\t\tcomponent: _components_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].settings\n\t\t}\n\t);\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ROUTES);\n\n//# sourceURL=webpack://r965/./cilia/src/routes.js?");

/***/ }),

/***/ "./cilia/src/settingman.js":
/*!*********************************!*\
  !*** ./cilia/src/settingman.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _settingmap_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settingmap.js */ \"./cilia/src/settingmap.js\");\n\n\n\nconst a = (a) => (a[0] ? a.replace(a[0], a[0].toUpperCase()) : a);\nvar b = {\n        li: `<li>\n\t\t\t\t\t\t\t<a class=\"item-content tab-link\" href=\"#settings-tab-{{n}}-{{wid}}\">\n\t\t\t\t\t\t\t\t<span class=\"l\"></span>\n\t\t\t\t\t\t\t\t<div class=\"item-media\">\n\t\t\t\t\t\t\t\t\t<i class=\"icon mio\">{{icon}}</i>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"item-inner\">\n\t\t\t\t\t\t\t\t\t<div class=\"item-title\">\n\t\t\t\t\t\t\t\t\t\t{{title}}\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</li>`,\n        tab: `<div class=\"block tab\" id=\"settings-tab-{{n}}-{{wid}}\">\n\t{{@if title}}\n\t\t<div class=\"block-title block-title-medium\">{{title}}</div>\n\t{{/if}}\n\n\t{{@if text}}\n\t\t<div class=\"block block-strong block-inset\">{{text}}</div>\n\t{{/if}}\n\n</div>`,\n        select: `<li>\n\t\t  <a href=\"#\" class=\"item-link smart-select\" data-open-in=\"popover\">\n\t\t    <select name=\"{{id}}\" id=\"{{id}}\">\n\t\t    \t{{@each options}}\n\t\t      \t<option value=\"{{value}}\" {{@if selected}}selected{{/if}}>{{title}}</option>\n\t\t    \t{{/each}}\n\t\t    </select>\n\t\t    <div class=\"item-content\">\n\t\t      <div class=\"item-inner\">\n\t\t        <div class=\"item-title\">{{title}}</div>\n\t\t      </div>\n\t\t    </div>\n\t\t  </a>\n\t\t</li>`,\n        input: `\n\t\t<li class=\"item-content item-input\">\n      <div class=\"item-inner\">\n        <div class=\"item-title item-label\">{{title}}</div>\n        <div class=\"item-input-wrap\">\n          <input id=\"{{id}}\" type=\"text\" name=\"{{id}}\" value=\"{{value}}\"/>\n        </div>\n        <div class=\"item-input-info\"></div>\n      </div>\n    </li>\n\t`,\n    },\n    c = {\n        setStyle(a) {\n            var b;\n            (b = \"compact\" == a ? \"nope\" : \"yep\"), d.style.set(b);\n        },\n        setTheme(a) {\n            var b;\n            (b = \"user-based\" == a ? \"light\" : \"dark\"), d.theme.set(b);\n        },\n        setColor(a) {\n            Dom7(\".theme-changer[to=\" + a + \"]\").click();\n        },\n        setAbout(a, b) {\n            var c = a.trim();\n            !c ||\n                150 < c.length ||\n                c.match(\"<script\") ||\n                ((c = c.replace(/</gi, \"&lt;\")),\n                $.post(\"/api/setabout?about=\" + c).done((a) => {\n                    \"done\" == a && (b.about = c);\n                }));\n        },\n        empty() {},\n    },\n    d = window.settings,\n    e = _settingmap_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\nvar generateHTMLForSettings = (d, f, g) => {\n    var h = $('<div class=\"margin-4 row\" />'),\n        j = $('<div class=\"col-60 medium-80 large-80 small-60 tabs me-tabs\" />'),\n        k = $('<div class=\"col-40 medium-20 large-20 small-40\"><div class=\"list nav-list links-list searchbar-found\"><ul></ul></div></div>'),\n        l = k.find(\"ul\"),\n        m = $(`<div class=\"searchbar searchbar-inline\">\n      <div class=\"searchbar-input-wrap\">\n        <input type=\"text\" placeholder=\"Search\" />\n        <i class=\"searchbar-icon\"></i>\n        <div class=\"input-clear-button\"></div>\n      </div>\n    </div>`);\n    for (var n in (k.prepend(m), e)) {\n        var o = e[n];\n        (o.wid = g), (o.n = n), l.append(at.template(b.li, o));\n        var p = $(at.template(b.tab, o)),\n            q = $('<div class=\"list\"><ul></ul></div>'),\n            r = q.find(\"ul\");\n        p.append(q),\n            j.append(p),\n            o.settings.forEach((g) => {\n                (g.s = o), \"select\" == g.type && \"string\" == typeof g.options[0] && (g.options = g.options.map((b) => ({ title: a(b), value: b, selected: b == g.value })));\n                var h = $(at.template(b[g.type], g));\n                r.append(h);\n                var e = h.find(g.type);\n                e.on(\"change\", () => {\n                    c[g.callback](e.val(), d, f);\n                });\n            });\n    }\n    return h.append(k), h.append(j), h;\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (generateHTMLForSettings);\n\n\n//# sourceURL=webpack://r965/./cilia/src/settingman.js?");

/***/ }),

/***/ "./cilia/src/settingmap.js":
/*!*********************************!*\
  !*** ./cilia/src/settingmap.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n    layouts: {\n        title: \"Layouts\",\n        icon: \"layers\",\n        settings: [\n            { type: \"select\", icon: \"dashboard\", id: \"style\", title: \"Style\", callback: \"setStyle\", value:  false ? 0 : \"free\", options: [\"free\", \"compact\"] },\n            { type: \"select\", icon: \"format_paint\", id: \"theme\", title: \"Theme\", callback: \"setTheme\", value:  false ? 0 : \"app-based\", options: [\"user-based\", \"app-based\"] },\n            { type: \"select\", icon: \"palette\", id: \"color\", title: \"Color\", callback: \"setColor\", value: null, options: [\"orange\", \"purple\", \"default\", \"green\", \"blue\"] },\n        ],\n    },\n    profile: {\n        title: \"Profile\",\n        icon: \"person\",\n        settings: [{ type: \"input\", icon: \"palette\", id: \"user-about\", title: \"About\", callback: \"setAbout\", value: \"\" }],\n    },\n    Rayous: { title: \"Rayous\", icon: \"article\", text: \"You can set the settings of Rayous in Rayous itself.\", settings: [] },\n    LRN: { title: \"LRN\", icon: \"article\", text: \"You can set the settings of LRN in LRN itself.\", settings: [] },\n    Linque: { title: \"Linque\", icon: \"article\", settings: [{ type: \"input\", icon: \"dashboard\", id: \"lin-mit\", title: \"Links per page\", callback: \"empty\", value: 24 }] },\n});\n\n//# sourceURL=webpack://r965/./cilia/src/settingmap.js?");

/***/ }),

/***/ "./cilia/src/settings.js":
/*!*******************************!*\
  !*** ./cilia/src/settings.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _req_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./req.js */ \"./cilia/src/req.js\");\n\n\nvar user = USER;\n\nfunction Setting(a, opts){\n  this.name = a;\n  if(opts) this.options = opts;\n}\n\nSetting.prototype = {\n  prevVal: null,\n  name: null,\n  init(){\n    if(this.get()) return;\n    this.set('default');\n  },\n  set(val){\n    var ths = this;\n    var data = {};\n    data[ths.name] = val;\n    if(this.options && !this.options.find(f => f == val)){\n      val = this.options[val];\n      if(!val) return null;\n    }\n    return (0,_req_js__WEBPACK_IMPORTED_MODULE_0__.postSync)('self/settings', data) && $(window).trigger('settings:'+ths.name, val);\n  },\n  get(){\n    var ths = this;\n    var data = (0,_req_js__WEBPACK_IMPORTED_MODULE_0__.getSync)('self/settings');\n    return data ? data[ths.name] : null;\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Setting);\n\n//# sourceURL=webpack://r965/./cilia/src/settings.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./cilia/src/main.js");
/******/ 	
/******/ })()
;