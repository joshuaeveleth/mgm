
/// <reference path="../../typings/index.d.ts" />
/// <reference path="../definitions/socketio-jwt.d.ts" />

import * as express from 'express';
import * as log4js from 'log4js';
import * as io from 'socket.io';
import * as jwt from 'jsonwebtoken'
import * as io_jwt from 'socketio-jwt'
import * as bodyParser from 'body-parser'

var conf = require('../settings.js');

import { Sql } from './mysql';
import { Auth } from './auth';

//connect to the databases
let mgmDb = Sql.connectMGM(conf.mgm.db);
let halcyonDB = Sql.connectHalcyon(conf.halcyon.db);

//initialize singletons
new Auth(halcyonDB, conf.mgm.tokenKey, conf.halcyon.user_server);



let app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));

//static file hosting optionally here

app.post('/auth/login', bodyParser.json(), (req, res) => { Auth.instance().handleLogin(req, res) });

let server = app.listen(3000, () => {
  console.log('mgm initialized');
});

// websocket connectivity
let sio = io(server);

sio.sockets.on('connection', io_jwt.authorize({
  secret: conf.mgm.tokenKey,
  timeout: 3000 // 3 seconds to authorize  
})).on('authenticated', (sock: SocketIO.Socket) => {
  console.log('client socket authenticated');
});