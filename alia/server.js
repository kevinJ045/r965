
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

import Identicon from './lib/identicon.js';
import { pickRandom, randFrom } from './misc/rand.js';

import PORT from './misc/PORT.js';

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

	// components.userAddFile('91058bb4-6585-46dc-a467-9c46c138523e', 'a.txt', 'REAL FUCKING CONTENT HERE')

	const router = new Router(app, server, io,
		{
			path: 'all;/api/*',
			component: (req, res, next) => {
				//res.send({success: false, response: "not authorized"});
				next();
			}
		}, {
			path: 'get;/api/users/',
			component: async (req, res, next) => {
				res.send(await components.listUserNames());
			}
		}, {
			path: 'get;/api/users/:username',
			component: async (req, res, next) => {
				res.send(await components.findUser(req.params.username));
			}
		}, {
			path: 'get;/api/users/:username/all',
			component: async (req, res, next) => {
				res.send(await components.getFullUserData(req.params.username));
			}
		}, {
			path: 'get;/api/users/:username/posts',
			component: async (req, res, next) => {
				res.send(await components.getUserProperty(req.params.username, 'posts'));
			}
		}, {
			path: 'get;/api/users/:username/files',
			component: async (req, res, next) => {
				res.send(await components.getUserProperty(req.params.username, 'files'));
			}
		}
	);

	server.listen(PORT, () => {
		console.log("Alia running: ", serverSessionID, '::', PORT);
	});
})();