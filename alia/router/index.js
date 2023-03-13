
class Route {

	constructor(url, app, method, type, callBack = (req, res, next) => next()){
		this.path = url;
		this.type = type;
		this.method = method;
		this.caller = app[method](url, (req, res, next) => {
			res.set('ResponseType', type);
			callBack(req, res, next);
		});
	}

}

class Router {

	constructor(app, server, io, ...routes){

		var that = this;

		this.$app = app;
		this.$server = server;
		this.$io = io;

		if(routes.length){

			routes.forEach(route => {
				that.register(route.path.split(';')[1], route.path.split(';')[0], route.type || "normal", route.component);
			});

		}

	}

	routes = []
	$app = {}
	$server = {}
	$io = {}

	register(url, method, type, cb){

		this.routes.push(new Route(url, this.$app, method, type, cb));

	}

}

export default Router;