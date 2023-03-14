
import { pickRandom, randFrom } from 'misc/rand.js';

import Home from "./components/home.js";
import Settings from "./components/settings.js";
import Terminal from "./components/shell.js";

const components = {};
components.sub = {};

components.sub.login = (uname, pwd, logbtn) => {
	if(uname.match(/([\s\W]+)/g)) toastAs("No special characters allowed!!");
	if(!uname.length) return toastAs("No username entered");
	if(uname.length < 5) return toastAs("Username too short");
	if(uname.length > 32) return toastAs("Max of 32 characters for username");
	if(!pwd.length) return toastAs("No password entered");
	if(logbtn) logbtn.addClass('button-loading');
	var confirmLogin = () => {
		postTo('/login/'+uname+'?pwd='+pwd, {}, function(e){
			if(logbtn) logbtn.removeClass('button-loading');
			if(e.failed){
				toastAs("Wrong username or password");
			} else {
				location.reload();
			}
		});
	};
	getFrom('/usernameavail/'+uname, d => {
		if(d == "false"){
			confirmLogin();
		} else {
			app.dialog.confirm('Create account?', () => {
				postTo('/register/'+uname+'?pwd='+pwd, {}, function(e){
					confirmLogin();
				});
			});
		}
	});
}

components.login = (props, { $f7, $on, $el, $update, $h }) => {

	$on('pageInit', () => {

		var logbtn = $el.value.find('#login-btn');

		logbtn.click(() => {
			var uname = $el.value.find("#username").val().trim();
			var pass = $el.value.find("#password").val().trim();
			components.sub.login(uname, pass, logbtn);
		});

	});

	return () => $h `
			<div class="page no-navbar no-toolbar no-swipeback">
			    <div class="page-content login-screen-content display-center">
			    	<div class="block">
			      <div class="login-screen-title">Cilia login</div>
			      <form autocomplete="false">
			        <div class="list">
			          <ul>
			            <li class="item-content item-input">
			              <div class="item-inner">
			                <div class="item-title item-label">Username</div>
			                <div class="item-input-wrap">
			                  <input type="text" id="username" placeholder="Your username" />
			                </div>
			              </div>
			            </li>
			            <li class="item-content item-input">
			              <div class="item-inner">
			                <div class="item-title item-label">Password</div>
			                <div class="item-input-wrap">
			                  <input type="password" id="password" placeholder="Your password" />
			                </div>
			              </div>
			            </li>
			          </ul>
			        </div>
			        <div class="list">
			          <ul>
			            <li><a href="#" class="list-button button-preloader" id="login-btn"><span class="preloader"></span>Login</a></li>
			          </ul>
			          <div class="block-footer">
			            <p>If you don't already have one a new account will be opened automatically for you.</p>
			            <p>Got any problems? <a href="#ask" id="got-problems">Click here</a></p>
			          </div>
			        </div>
			      </form>
			    </div>
		    </div>
		  </div>
		`;
}

components.home = Home;
components.settings = Settings;
components.shell = Terminal;

window.components = components;

export default components;
