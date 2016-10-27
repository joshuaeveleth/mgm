
/// <reference path="../../typings/index.d.ts" />


import * as express from 'express';
//import * as log4js from 'log4js';
import * as io from 'socket.io';
import * as jwt from 'jsonwebtoken'
import * as bodyParser from 'body-parser'

var conf = require('../../settings.js');

import { Sql } from './mysql';
import { Auth, Detail } from './auth';
import { handleClient } from './client';

//connect to the databases
let mgmDB = Sql.connectMGM(conf.mgm.db);
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
  console.log('mgm running on port 3000');
});

// websocket connectivity
let sio = io(server);

sio.sockets.on('connection', (sock: SocketIO.Socket) => {
  console.log('client connected');
  let timer = setTimeout(() => {
    sock.disconnect();
  }, 3000)
  sock.on('authenticate', (token: string) => {
    clearTimeout(timer);
    console.log('authentication attempt received');
    jwt.verify(token, conf.mgm.tokenKey, {algorithms: ["HS256"]}, (err: Error, decoded: Detail) => {
      if(err){
        sock.emit('unauthorized', 'Could not decode token');
        sock.disconnect();
      } else {
        sock.emit('authenticated');

        //call client handler to wire up events
        handleClient(sock, decoded, mgmDB, halcyonDB);
      }
    })
  })
})