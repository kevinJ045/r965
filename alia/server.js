
import fs, { readFileSync } from 'node:fs';
import path from 'node:path';

import * as uuid from 'uuid';
const uuidV4 = uuid.v4;
import md5 from './lib/md5.js';
import cors from 'cors';

import express from "express";
import session from "express-session";
import cookieParser from 'cookie-parser';

import { MongoClient } from 'mongodb';
import { connectToCluster } from './db/conn.js';

import ejs from "ejs";
import * as socketIo from 'socket.io';

import axios from 'axios';
import http from 'http';

import { moxiChatBot, moxiDataManager } from './moxi/index.js';
import { modelToDb, modelToPrimitive, model } from './models/index.js';

import { admin } from './admin/index.js';
import Router from './router/index.js';
import Manager from './components/components.js';
import access from './components/access.js';
import sessions from './components/sessions.js';

import Identicon from './lib/identicon.js';
import { pickRandom, randFrom } from './misc/rand.js';

import PORT from './misc/PORT.js';
import COLORS from './lib/colors.js';

import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

(async function App(){

	var app = express();
	var server = http.createServer(app);

	var io = new socketIo.Server(server);

	const serverSessionID = [uuidV4(), uuidV4()].join("-");


	var connection = await connectToCluster('mongodb://127.0.0.1:27017/test');
	var db = connection.db('main');
    var dbUsers = db.collection('users');

	const components = new Manager(app, connection, db, io);

	app.use(session({
		secret: serverSessionID,
		resave: false,
		saveUninitialized: true
	}));

	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(cookieParser());

	app.use('/app', express.static(path.join(__dirname, '../cilia')));

	const router = new Router(app, server, io,
		{
			path: 'use;*',
			component: async (req, res, next) => {
				var _cid = sessions.get(req.session.token);
				req.user = await components.getUserByContainerID(_cid);
				delete req.user.password;
				next();
			}
		}, {
			path: "get;/avatar/:id",
			component: async (req, res) => {
				var hash = md5(req.params.id);

				var user = req.user;

				var options = {
				    foreground: COLORS.default,
				    background: [24, 22, 34, 255],
				    margin: 0.25,
				    size: 144,
				    format: 'png'
				};

				if(!user.username) user = await components.findUser(req.params.id);

				if(user){	
					var color = user.settings?.preferredColor || "default";
					options.foreground = COLORS[color];
				}

				if(req.query.size) options.size = parseInt(req.query.size);
				if(options.size > 600) options.size = 144;
				if(req.query.format) options.format = req.query.format;
				if(req.query.bg) options.background = req.query.bg.split(",");
				if(req.query.rdc) {
					options.foreground = [randFrom(0, 255), randFrom(0, 255), randFrom(0, 255), 255];
					options.background = [randFrom(0, 255), randFrom(0, 255), randFrom(0, 255), 255];
				};

				var data = new Identicon(hash, options).toString();
				if(req.query.base64) return res.send(data);
				var image = Buffer.from(data, 'base64');
				res.writeHead(200, {
					'Content-Type': 'image/png',
					'Content-Length': image.length
				});
				res.end(image);
			}
		}, {
			path: 'post;/login/:username',
			component: async (req, res, next) => {
				var pwd = req.body.pass || req.query.pass || req.body.pwd || req.query.pwd;
				var user = await components.findUser(req.params.username);
				var failed, response;
				if(!user) return res.status(404).send({ failed: true, response: 'user_not_found' });
				if(user.password == md5(pwd)){
					var session = sessions.set(user.containerId);
					req.session.token = session;
					failed = false;
					response = session;
				} else {
					failed = true;
					response = 'password_unmatched';
				}
				res.send({ failed, response })
			}
		},
		{
			path: 'post;/register/:username',
			component: async (req, res, next) => {
				var uname = req.params.username;
				if(uname.length < 5) return res.status(500).send({ failed: true, response: 'username_too_short' });
				var pwd = req.body.pass || req.query.pass || req.body.pwd || req.query.pwd;
				var user = await components.makeUser(uname, pwd);
				res.redirect('/login/'+uname+"?pwd="+pwd);
			}
		}, {
			path: 'get;/usernameavail/:username',
			component: async (req, res, next) => {
				var user = await components.findUser(req.params.username);
				if(!user || !user.username) return res.send('true');
				res.send('false');
			}
		}, {
			path: 'all;/api/*',
			component: async (req, res, next) => {
				if(!req.user?.containerId) return res.status(401).send({failed: true, response: "not_authorized"});
				else next();
			}
		}, {
			path: 'get;/api/users/',
			component: async (req, res, next) => {
				res.send(await components.listUserNames());
			}
		}, {
			path: 'get;/api/self/',
			component: async (req, res, next) => {
				res.send(req.user);
			}
		}, {
			path: 'get;/api/self/all/',
			component: async (req, res, next) => {
				res.send(await components.getFullUserData(req.user.username));
			}
		}, {
			path: 'get;/api/self/settings/',
			component: async (req, res, next) => {
				var user = await components.findUser(req.user.username);
				res.send(user.settings);
			}
		}, {
			path: 'post;/api/self/settings/',
			component: async (req, res, next) => {
				var settings = await components.findUser(req.user.username).settings || {};
				for(var i in req.body){
					settings[i] = req.body[i];
				}
				if(!settings.preferredColor) settings.preferredColor = 'default';
				await components.setUserProp(req.user.username, {
					'@options': settings
				});
				res.send(settings);
			}
		}, {
			path: 'get;/api/users/:username',
			component: async (req, res, next) => {
				var user = await components.findUser(req.params.username);
				if(!user || !user.username) return res.send({ failed: true, response: "user_not_found" })
				res.send(user);
			}
		}, {
			path: 'get;/api/users/:username/all',
			component: async (req, res, next) => {
				var user = await components.getFullUserData(req.params.username);
				user.container.files = access.fileViews(user.container.files, req.user);
				user.container.posts = access.clearify(...user.container.posts, req.user);
				user.container.files = access.clearify(...user.container.files, req.user);
				delete user.containerId;
				res.send(user);
			}
		}, {
			path: 'get;/api/users/:username/posts',
			component: async (req, res, next) => {
				var posts = await components.getUserProperty(req.params.username, 'posts');
				res.send(access.clearify(...posts, req.user));
			}
		}, {
			path: 'get;/api/users/:username/files',
			component: async (req, res, next) => {
				var files = access.fileViews(await components.getUserProperty(req.params.username, 'files'), req.user);
				res.send(access.clearify(...files, req.user));
			}
		}, {
			path: 'get;/api/users/:username/files/:file',
			component: async (req, res, next) => {
				var user = await components.findUser(req.params.username);
				var file = access.readFile(await components.getUserFile(user.containerId, req.params.file), req.user);
				res.send(access.clearify(file, req.user));
			}
		}, {
			path: 'use;/',
			component: (req, res) => {
				res.render(path.join(__dirname, '../cilia/index.ejs'), {
					user: req.user || {"loggedin": false}
				});
			}
		}
	);

	io.on('connection', (socket) => {
		socket.on('h', ($) => {
			var div = $('div');
			div.set('shsh')
		})
	});

	server.listen(PORT, () => {
		console.log("Alia running: ", serverSessionID, '::', PORT);
	});
})();