// import {} from "";

const access = {};

access.fileViews = (items, user) => items.filter(item => {
	return item.name[0] == '.' ? user.containerId == item.containerId : true;
});

access.readFile = (file, user) => {
	return file.name[0] == '.' ? (user.containerId == item.containerId ? file : null) : file;
}

access.clearify = (...items_bare) => {
	var items = Array.from(items_bare);
	var user = items.pop();
	items = items.map(item => {
		if(item.password) delete item.password;
		delete item.containerId;
		return item;
	});
	return items.length > 1 ? items : items[0];
}

export default access;