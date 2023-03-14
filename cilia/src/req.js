const baseUrl = "/api/";

function fix(baseUrl, url){
	if(url.startsWith('/')) return url;
	return baseUrl+url;
}

function getSync(url){
    return $.ajax({url: fix(baseUrl,url), async: false}).responseJSON;
}

function getFrom(url, callback = () => {}){
    return $.ajax({url: fix(baseUrl,url)}).done(callback);
}

function postSync(url, data){
    return $.ajax({url: fix(baseUrl,url), data, async: false, method: "POST"}).responseJSON;
}

function postTo(url, data, callback = () => {}){
    return $.ajax({url: fix(baseUrl,url), data, method: "POST"}).done(callback);
}

export { getSync, getFrom, postSync, postTo };