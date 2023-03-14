import grne from '../lib/grne.js';

var app;

var sessions = {};

sessions._items = {};

sessions.get = (name) => sessions._items[name] ? sessions._items[name].cid : null;
sessions.set = (cid) => {
	var id = grne(120);
	sessions._items[id] = {
		cid,
		time: new Date().getTime()
	};
	return id;
}

sessions.init = _app => app = _app;

export default sessions;