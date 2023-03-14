import components from './components.js'

const ROUTES = [];

if(!USER.loggedin) {
	if(location.pathname != "/") location.href = "/";
	ROUTES.push({
		path: '/',
		component: components.login
	});
} else {
	ROUTES.push(
		{
			path: '/',
			component: components.home
		}, {
			path: '/settings',
			component: components.settings
		}, {
			path: '/shell',
			component: components.shell
		}
	);
}

export default ROUTES;