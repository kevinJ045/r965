
const makeEntry = (opts, e) => {
	var start = "===================\n";
	for(var i in opts){
		start += "* "+opts[i]+": "+e[i]+"\n"
	}
	start += "===================\n";
	return start.trim();
}

const commands = {
	async echo(term, ...a){
	  	term.echo(...a);
	},
	async title(term, ...a){
		var g = a.join(" ");
		if(g.length > 22) g = g.substr(0, 19)+"...";
		term.titleEl.text(g);
	}
}

async function doCmd(command, term) {
  	var cmds = command.match(' ') ? command.split(' ') : [command];
  	var cmd = cmds.shift();
  	if(commands[cmd]){
	  	await commands[cmd].call(commands, term, ...cmds);
	} else {
		term.error('rsh: no such command');
	}
};

var keywords = Object.keys(commands);
keywords.push("clear");


function newTerminal(el){
	var $el = $(el);
	var j = $el.find('.tab').length+1;
	var termEl = $(`<div class="tab" id="term-tab-${j}"><div class="term"></div></div>`);
	var navEl = $(`<a href="#term-tab-${j}" class="tab-link no-left-margin"><span>Terminal ${j}</span> <span class="mio close-tab">close</span></a>`);
	$el.find(".tabs-list").append(navEl);
	navEl.find('.close-tab').click(() => {
		termEl.remove();
		navEl.remove();
	});
	termEl.appendTo($el.find('.tabs'));
	var term = termEl.find('.term').terminal(doCmd, {
		greetings: `       ___ ____  _ 
 _ __ / _ \\___ \\/ |
| '__| (_) |__) | |
| |   \\__, / __/| |
|_|     /_/_____|_|
rsh: RShell (terminal emulator for Cilia)`,
		prompt: "usr/"+USER.username+" $ ",
		autocompleteMenu: true,
    	completion: keywords,
    	formatters: [function(string) {
			return string.split(/((?:\s|&nbsp;)+)/).map(function(string) {
			  if (keywords.indexOf(string) != -1) {
			      return '[[b;white;]' + string + ']';
			  } else {
			      return string;
			  }
			}).join('');
		}]
	});
	term.titleEl = navEl.find('span').first();
	Dom7(navEl[0]).click();
	return term;
}

export default (props, { $f7, $on, $el, $update, $h }) => {

	$on('pageInit', (e, page) => {
		newTerminal($el.value.find('.page-content')[0]);
		$el.value.find('.add-tab').click(() => {
			newTerminal($el.value.find('.page-content')[0]);
		});
	});

	return () => $h `<div class="page">
		<div class="page-content">
			<div class="appbar appbar-scrollable">
			    <div class="appbar-inner">
			      <div class="left">
			        <a href="#" class="button button-small add-tab display-flex">
			          <i class="mio">add</i>
			        </a>
			      </div>
			      <div class="right tabbar-cus">
			      	<a href="#" class="button button-small display-flex left-scroll margin-left-half">
			          <i class="mio">chevron_left</i>
			        </a>
					    <a href="#" class="button button-small display-flex right-scroll margin-left-half">
			          <i class="mio">chevron_right</i>
			        </a>
				    <div class="tab-links-list tabs-list">
				      
				    </div>
			      </div>
			    </div>
			  </div>
			<div class="tabs">
		    
			</div>
		</div>
	</div>`;
}