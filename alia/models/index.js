import models from './models.json' assert { type: 'json' };

function model(object, type, parent){
	var modelOriginal = parent[type];
	var modelFormatted = {};

	for(var i in modelOriginal){
		if(i.startsWith('#')){
			// modelFormatted.__parent = modelOriginal[i];
			continue;
		}
		var val = object[modelOriginal[i]];
		var setnull = false;
		if(!val) {
			var values = modelOriginal[i].replace('/n', () => {
				setnull = true;
				return "";
			}).split('|');
			values.forEach(value => {
				if(!val){
					if(value in object) val = object[value];
				}
			});
		}
		if(typeof modelOriginal[i] == "string" && val) val.toString();
		if(!setnull) modelFormatted[i] = val;
		else if(setnull && val) modelFormatted[i] = val;
	}

	return modelFormatted;
}

function modelToDb(object, type){
	if(type in models.database) {
		return model(object, type, models.database);
	} else {
		return object;
	}
}

function modelToPrimitive(object, type){
	if(type in models.primitive) {
		return model(object, type, models.primitive);
	} else {
		return object;
	}
}

// var post = modelToDb({
// 	id: "sjsjr7yf",
// 	containerid: "sjsnsuh",
// 	timecode: new Date().getTime(),
// 	content: "hi",
// 	tags: "a,b,c",
// 	type: "image",
// 	about: "hello",
// 	url: "kdjdj",
// 	name: "sss"
// }, 'item.post');

// console.log(post, modelToPrimitive(post, 'item.post'));

export { modelToDb, modelToPrimitive, model };
