
/// <reference path="../../typings/index.d.ts" />


import * as express from 'express';
//import * as log4js from 'log4js';
import * as io from 'socket.io';
import * as jwt from 'jsonwebtoken'
import * as bodyParser from 'body-parser'

var conf = require('../../settings.js');

import { PersistanceLayer } from './database';
import { Auth, Detail } from './auth';

import { ClientManager } from './ClientManager';
import { Client } from './Client';

import { NodeHandler } from './node';
import { Freeswitch, FreeswitchHandler } from  './Freeswitch';

//connect to the databases
let db = new PersistanceLayer(conf.mgm.db, conf.halcyon.db);

//initialize singletons
let auth = new Auth(db, conf.mgm.tokenKey, conf.halcyon.user_server);
let cm = new ClientManager(db);

let app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));

//static file hosting optionally here

app.post('/auth/login', bodyParser.json(), (req, res) => { auth.handleLogin(req, res) });

// TODO: move node comms to a separate port
app.use('/dispatch', NodeHandler(cm));

// freeswitch components
let fs = new Freeswitch(conf.mgm.voiceIP);
app.use('/fsapi', FreeswitchHandler(fs));

let server = app.listen(3000, () => {
  console.log('mgm running on port 3000');
});

// websocket connectivity
let sio = io(server);

sio.sockets.on('connection', (sock: SocketIO.Socket) => {
  let timer = setTimeout(() => {
    sock.disconnect();
  }, 3000)
  sock.on('authenticate', (token: string) => {
    clearTimeout(timer);
    jwt.verify(token, conf.mgm.tokenKey, {algorithms: ["HS256"]}, (err: Error, decoded: Detail) => {
      if(err){
        sock.emit('unauthorized', 'Could not decode token');
        sock.disconnect();
        console.log('Connection failed, invalid token or handshake');
      } else {
        sock.emit('authenticated');
        let c = new Client(sock, decoded);
        console.log('User ' + c.id + ' connected');
        cm.handleClient(c);
      }
    })
  })
})
