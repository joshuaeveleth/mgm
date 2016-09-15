
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
new Auth();



/*let app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));

//static file hosting optionally here

app.post('/auth', bodyParser.json(), (req, res) => {

})*/


/*
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from "path";

import { Sql } from './mysql/sql';
import { MGM } from './mgm/MGM';
import { User } from './halcyon/User';
import { Host } from './mgm/Host';
import { UUIDString } from './halcyon/UUID';
import { Job } from './mgm/Job';
import { Region } from './mgm/Region';
import { Estate } from './halcyon/Estate';
import { Group } from './halcyon/Group';

var conf = require('../settings.js');

let mgm = new MGM(conf);

let app = express();

var cookieParser = require('cookie-parser')
app.use(cookieParser('super-secret-cookie-session-key!!!1!'));

app.use(bodyParser.json({ limit: '1gb' }));       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true,
  limit: '1gb'
}));

app.use('/', mgm.getRouter());

app.listen(3000, function() {
  console.log('MGM listening on port 3000!');
});
*/