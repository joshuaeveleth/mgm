
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
    });
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

  router.get('/region/:id', (req, res) => {
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
  });

  // we give this information to the node when we request a start
  router.get('/process/:id', (req, res) => {
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
  });

  return router;
}
