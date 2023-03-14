import ROUTES from './routes.js';
import initiateMenu from './menu.js';

import { el, $app, _app } from "lib/cilia/el.js";
import COLORS from "lib/colors.js";
import { getSync, getFrom, postSync, postTo } from "./req.js";

import Setting from "./settings.js";

window.settings = {
    color: new Setting('preferredColor', Object.keys(COLORS))
};

if(USER.loggedin) $('body').removeClass('blue-sky').addClass('theme-'+settings.color.get());

function initApp(){
	var menu, mainView;
	var viewEl = el('view view-main main-viewel');

	function toastAs(text){
	    app.toast.create({text, closeTimeout: 2000}).open();
	}
	window.toastAs = toastAs;
	window.elementor = el;
	window.getSync = getSync;
	window.getFrom = getFrom;
	window.postSync = postSync;
	window.postTo = postTo;


	/*
	    Initialize Framework7 App
	    https://framework7.io/docs
	*/

	console.log(ROUTES)

	var app = new Framework7({
	    el: '#app-root',
	    name: 'Cilia',
	    theme: 'md',
	    id: 'com.esvigd.cilia',
	    routes: ROUTES,
	    view: {
	    	browserHistory: true,
	        browserHistorySeparator: '',
	        browserHistoryRoot: location.origin
	    },
	    on: {
	    	pageBeforeIn(e){
	    		var el = $(e.pageEl);
	    		var $title = el.find('.ml6 .letters');
				$title.each(function(){
					var $ths = $(this);
					$ths.html($ths.text()
						.replace(/\S/g, '<span class="letter">$&</span>')
						.replace(/<span class="letter">%<\/span><span class="letter">([0-9])<\/span>([\s\S]+)<span class="letter">%<\/span>/g, "<b b$1>$2</b>"));
				});
	    	},
	    	pageAfterIn(e){
				anime.timeline()
				  .add({
				    targets: '.ml6 .letter',
				    translateY: ["1.1em", 0],
				    translateZ: 0,
				    duration: 750,
				    delay: (el, i) => 20 * i
				  });
	    	}
	    }
	});

	window.app = app;
	window.viewEl = viewEl;


	mainView = app.views.create(viewEl[0]);
	window.mainView = mainView;

	console.log(mainView)

	if(USER.loggedin) initiateMenu(app, viewEl);

	function reloadPage(){
		mainView.router.refreshPage();
	}

	function navTo(path){
		mainView.router.navigate(path);
	}

	window.reloadPage = reloadPage;
	window.navTo = navTo;
}

function reinitApp(){
	delete Framework7.instance;
	$("#app-root").empty();
	initApp();
}
window.reinitApp = reinitApp;
window.initApp = initApp;

$(window).on('settings:preferredColor', reinitApp);

initApp();