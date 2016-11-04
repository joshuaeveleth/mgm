
import * as express from 'express';

import { ClientManager } from '../ClientManager';
/*import { Region, RegionMgr } from '../Region';
import { Host, HostMgr } from '../Host';
import { UUIDString } from '../../halcyon/UUID';*/
import { RegionLogs } from './RegionLogs';
import { IHostStat, IRegionStat } from '../../common/messages';


interface statsUpdateMessage {
  host: IHostStat
  processes: IRegionStat[]
}

export function NodeHandler(mgm: ClientManager): express.Router {
  let router: express.Router = express.Router();

  router.post('/logs/:uuid', (req, res) => {
    /*let regionID = new UUIDString(req.params.uuid);
    let remoteIP: string = req.ip.split(':').pop();
    RegionMgr.instance().getRegion(regionID)
      .then((r: Region) => {
        let logs: string[] = JSON.parse(req.body.log);
        return RegionLogs.instance().append(r.getUUID(), logs);
      }).then(() => {
        res.send(JSON.stringify({ Success: true }));
      }).catch((err: Error) => {
        console.log('Error handling logs for host ' + remoteIP + ': ' + err.message);
        res.send(JSON.stringify({ Success: false, Message: err.message }));
      });*/
  });

  router.post('/stats/:host', (req, res) => {
    let host = req.params.host; //url parameter, not relaly used
    let remoteIP: string = req.ip.split(':').pop();
    let stats: statsUpdateMessage = JSON.parse(req.body.json);

    mgm.database.Hosts.getByAddress(remoteIP).then((host) => {

      // update host statistics
      mgm.hostStatus(host, stats.host);

      // update region statistics
      stats.processes.map((proc) => {
        mgm.regionStatus(proc);
      })

      res.send('OK');
    }).catch((e: Error) => {
      console.log(e.stack);
      res.send(e.message);
    })


    /*HostMgr.instance().get(remoteIP).then((host: Host) => {
      //this is from mgmNode, which isnt following the rules
      let stats = JSON.parse(req.body.json);

      let workers = [];
      host.setStatus(stats.host);

      let halted = 0;
      let running = 0;
      for (let proc of stats.processes) {
        let w = RegionMgr.instance().getRegion(new UUIDString(proc.id)).then((r: Region) => {
          if (proc.running.toUpperCase() === 'FALSE' ? false : true)
            running++;
          else
            halted++;
          r.setRunning(proc.running.toUpperCase() === 'FALSE' ? false : true);
          r.setStats(proc.stats)
        });
        workers.push(w);
      }

      return Promise.all(workers).then(() => {
        res.send('Stats recieved: ' + running + ' running processes, and ' + halted + ' halted processes');
      });

    }).catch((err: Error) => {
      res.send(JSON.stringify({ Success: false, Message: err.message }));
    });*/
  });

  router.post('/node', (req, res) => {
    let remoteIP: string = req.ip.split(':').pop();
    let payload = req.body;

    mgm.database.Hosts.getByAddress(remoteIP).then((host) => {
      host.port = payload.port;
      host.name = payload.host;
      host.slots = payload.slots;
      return host.save().then(() => {
        mgm.hostUpdated(host);
      })
    }).then(() => {
      return mgm.database.Regions.getBySlave(remoteIP);
    }).then((regions) => {
      return res.send(JSON.stringify({
        Success: true,
        Regions: regions
      }));
    }).catch((e: Error) => {
      console.log(e.stack);
      return res.send(JSON.stringify({ Success: false, Message: e.message }));
    })
  });

  // nodes do not ask for this, we give it to them with an order
  //router.get('/region/:id', (req, res) => {
  /*let uuid = new UUIDString(req.params.id);
  //validate host
  let remoteIP: string = req.ip.split(':').pop();
  RegionMgr.instance().getRegion(uuid).then((r: Region) => {
    if (r.getNodeAddress() === remoteIP) {
      return r;
    }
    throw new Error('Requested region does not exist on the requesting host');
  }).then((r: Region) => {
    res.send(JSON.stringify({
      Success: true,
      Region: {
        Name: r.getName(),
        RegionUUID: r.getUUID().toString(),
        LocationX: r.getX(),
        LocationY: r.getY(),
        InternalPort: r.getPort(),
        ExternalHostName: r.getExternalAddress()
      }
    }));
  }).catch((err: Error) => {
    res.send(JSON.stringify({ Success: false, Message: err.message }));
    return;
  });*/
  //});

  // we give this information to the node when we request a start
  //router.get('/process/:id', (req, res) => {
  /*let uuid = new UUIDString(req.params.id);
  let httpPort = req.query.httpPort;
  let consolePort = req.query.consolePort;
  let externalAddress = req.query.externalAddress;
  //validate host
  let remoteIP: string = req.ip.split(':').pop();
  RegionMgr.instance().getRegion(uuid).then((r: Region) => {
    if (r.getNodeAddress() === remoteIP) {
      return r;
    }
    throw new Error('Requested region does not exist on the requesting host');
  }).then((r: Region) => {
    return r.setPort(httpPort);
  }).then((r: Region) => {
    return r.setExternalAddress(externalAddress);
  }).then((r: Region) => {
    return mgm.getRegionINI(r);
  }).then((config: { [key: string]: { [key: string]: string } }) => {
    res.send(JSON.stringify({ Success: true, Region: config }));
  }).catch((err: Error) => {
    res.send(JSON.stringify({ Success: false, Message: err.message }));
    return;
  });*/
  //});

  return router;
}
