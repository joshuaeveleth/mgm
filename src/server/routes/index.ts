
import * as express from 'express';
import { Freeswitch } from '../Freeswitch';
import { PersistanceLayer, RegionInstance } from '../database';

import { AuthHandler } from './AuthHandler';
import { ConsoleHandler } from './ConsoleHandler';
import { TaskHandler } from './TaskHandler';
import { EstateHandler } from './EstateHandler';
import { HostHandler } from './HostHandler';
import { UserHandler } from './UserHandler';
import { RegionHandler } from './RegionHandler';
import { GroupHandler } from './GroupHandler';
import { DispatchHandler } from './DispatchHandler';
import { OfflineMessageHandler } from './OfflineMessageHandler';
import { RegisterHandler } from './RegisterHandler';
import { FreeswitchHandler } from './FreeswitchHandler';

import { Config } from '../config';

export function isUser(req, res, next) {
  if (req.cookies['uuid']) {
    return next();
  }
  return res.send(JSON.stringify({ Success: false, Message: 'No session found' }));
}

export function isAdmin(req, res, next) {
  if (req.cookies['userLevel'] >= 250) {
    return next();
  }
  return res.send(JSON.stringify({ Success: false, Message: 'Permission Denied' }));
}

export function SetupRoutes(conf: Config): express.Router {
  let db = new PersistanceLayer(conf.mgm.db, conf.halcyon.db);

  let router = express.Router();
  let fs = new Freeswitch(conf.mgm.voiceIP);

  router.use('/auth', AuthHandler(db));
  router.use('/console', ConsoleHandler(db));
  router.use('/task', TaskHandler(db,conf));
  router.use('/estate', EstateHandler(db));
  router.use('/host', HostHandler(db));
  router.use('/user', UserHandler(db, conf.mgm.templates));
  router.use('/region', RegionHandler(db));
  router.use('/group', GroupHandler(db));

  //router.use('/fsapi', FreeswitchHandler(fs));

  router.use('/offline', OfflineMessageHandler(db));
  router.use('/register', RegisterHandler(db, conf.mgm.templates));

  router.use('/server/dispatch', DispatchHandler(db, conf));

  router.get('/', (req, res) => {
    res.send('MGM');
  });

  let grid_info = conf.grid_info;
  router.get('/get_grid_info', (req, res) => {
    res.send('<?xml version="1.0"?><gridinfo><login>' +
      grid_info.login +
      '</login><register>' +
      grid_info.mgm +
      '</register><welcome>' +
      grid_info.mgm + '\welcome.html' +
      '</welcome><password>' +
      grid_info.mgm +
      '</password><gridname>' +
      grid_info.gridName +
      '</gridname><gridnick>' +
      grid_info.gridNick +
      '</gridnick><about>' +
      grid_info.mgm +
      '</about><economy>' +
      grid_info.mgm +
      '</economy></gridinfo>');
  });

  router.get('/map/regions', (req, res) => {
    if (!req.cookies['uuid']) {
      res.send(JSON.stringify({ Success: false, Message: 'No session found' }));
      return;
    }

    db.Regions.getAll().then((regions: RegionInstance[]) => {
      let result = [];
      for (let r of regions) {
        result.push({
          Name: r.name,
          x: r.locX,
          y: r.locY
        })
      }
      res.send(JSON.stringify(result));
    }).catch((err: Error) => {
      res.send(JSON.stringify({ Success: false, Message: err.message }));
    });
  });

  router.post('/register/submit', (req, res) => {
    console.log('Received registration request.  Not Implemented');
    res.send(JSON.stringify({ Success: false, Message: 'Not Implemented' }));
  });

  return router;
}