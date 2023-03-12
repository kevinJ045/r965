import * as express from "express";
import * as session from "express-session";
import fs, { readFileSync } from 'node:fs';
import path from 'node:path';
import * as cookieParser from 'cookie-parser';
import * as uuidv4 from 'uuid';
import { moxiChatBot, moxiDataManager } from './moxi/index.js';
import * as crypto from "crypto";
import * as ejs from "ejs";
import * as cors from 'cors';
import axios from 'axios';
import http from 'http';
import * as socketIo from 'socket.io';
import * as Identicon from './lib/identicon.js';
import { pickRandom, randFrom } from './misc/rand.js';
import { admin  } from './admin/index.js';

var app = express();
var server = http.createServer(app);

const io = socketIo(server);