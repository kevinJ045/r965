
import { modelToDb, modelToPrimitive, model } from '../models/index.js';
import * as uuid from 'uuid';
import md5 from '../lib/md5.js';
const uuidV4 = uuid.v4;

var db;

function makePrimitive(items, type){
	return Array.from(items).map(obj => modelToPrimitive(obj, type));
}

class Manager {

	conn = {}
	db = {}
	app = {}
	io = {}

	constructor (app, conn, _db, io) {
		this.conn = conn;
		this.db = _db;
		db = _db;
		this.app = app;
		this.io = io;
	}


	/*
	* User Management
	*/
	async makeUser(username, password){
		var user = modelToDb({
			name: username.replace(username[0], username[0].toUpperCase()),
			username,
			password: md5(password),
			containerid: uuidV4(),
			id: uuidV4(),
			timecode: new Date().getTime()
		}, 'user');
		if(await this.findUser(username)) return {user, fail: true};
		await db.collection('users').insertOne(user);
		return user;
	}

	async findUser(username) {
		var user = await db.collection('users').findOne({ definer: username });
		return user ? modelToPrimitive(user, 'user') : null;
	}

	async getUserByContainerID(cid) {
		var user = await db.collection('users').findOne({ '@container': cid });
		return user ? modelToPrimitive(user, 'user') : null;
	}

	async getAllUsers(){
		return makePrimitive(await db.collection('users').find({}).toArray(), 'user');
	}

	async listUserNames(){
		return (await this.getAllUsers())?.map(user => user.username);
	}

	async getFullUserData(username) {
		var user = await this.findUser(username);
		if(user){
			user.container = {};
			var cid = user.containerId;
			user.container.posts = makePrimitive(await db.collection('posts').find({ '@container': cid }).toArray(), 'item.post');
			user.container.files = makePrimitive(await db.collection('files').find({ '@container': cid }).toArray(), 'item.file');
		}
		return user;
	}

	async getUserProperty(username, property){
		var user = await this.findUser(username);
		var prop = {};
		if(user){
			var cid = user.containerId;
			if(property == 'posts') prop = makePrimitive(await db.collection('posts').find({ '@container': cid }).toArray(), 'item.post');
			else if(property == 'files') prop = makePrimitive(await db.collection('files').find({ '@container': cid }).toArray(), 'item.file');
		}
		return prop;
	}

	async setUserProp(username, props){
		return db.collection('users').updateMany(
	       { 'definer': username },
	       { $set: props }
	   	);
	}

	/*
	* Post Management
	*/

	async userAddPost(cid, name, type, tags, about, char, content){
		var id = uuidV4();
		var post = modelToDb({
			name,
			content,
			dataid: cid.substr(0,12)+"-"+id.substr(0,12),
			type,
			tags,
			about,
			char,
			containerid: cid,
			id,
			timecode: new Date().getTime()
		}, 'item.post');
		await db.collection('posts').insertOne(post);
		return post;
	}

	async userGetPost(id){
		var post = await db.collection('posts').findOne({ '@id': id });
		return post ? modelToPrimitive(post, 'item.post') : null;
	}

	/*
	* File Management 
	*/

	async userAddFile(cid, name, content){
		var id = uuidV4().substr(0, 6)+"-"+name.replace(/[\W\s]/g, '');
		var file = modelToDb({
			name,
			content,
			containerid: cid,
			id,
			timecode: new Date().getTime()
		}, 'item.file');
		await db.collection('files').insertOne(file);
		return file;
	}

	async userGetFile(id){
		var file = await db.collection('files').findOne({ '@id': id });
		return file ? modelToPrimitive(file, 'item.file') : null;
	}

	async getUserFile(cid, id){
		console.log(cid, id)
		var file = await db.collection('files').findOne({ '@container': cid, '@id': id });
		return file ? modelToPrimitive(file, 'item.file') : null;
	}

};

export default Manager;