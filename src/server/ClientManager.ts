import { Client } from './Client'
import { PersistanceLayer } from './database'

import { IHost, IRegion, IPendingUser, IUser, IGroup, IRole, IMembership, IEstate, IManager, IEstateMap, IJob,
  IHostStat, IRegionStat } from '../common/messages';
import { MessageTypes } from '../common/MessageTypes';
import { JobTypes } from '../common/jobTypes';

import { JobInstance, HostInstance } from './database';

export class ClientManager {
  clients: { [key: string]: Client };
  database: PersistanceLayer

  hostStats: { [key: number]: IHostStat }
  regionStats: { [key: string]: IRegionStat }

  constructor(db: PersistanceLayer) {
    this.clients = {};
    this.database = db;
    this.hostStats = {};
    this.regionStats = {};
  }


  handleClient(c: Client) {
    this.clients[c.id] = c;
    this.initNormalUser(c);
    this.handleNormalUser(c);
    if (c.godLevel >= 250) {
      this.initAdminUser(c);
      this.handleAdminUser(c);
    }
  }

  private initNormalUser(c: Client) {
    // send jobs for this user
    this.database.Jobs.getFor(c.id).then((jobs) => {
      jobs.map((j) => c.socket.emit(MessageTypes.ADD_JOB, j))
    });

    //send users
    this.database.Users.getAll().then((users: IUser[]) => {
      users.map((u: IUser) => c.socket.emit(MessageTypes.ADD_USER, u));
    });

    // send estates
    this.database.Estates.getAll().then((estates: IEstate[]) => {
      estates.map((e: IEstate) => c.socket.emit(MessageTypes.ADD_ESTATE, e));
    });
    this.database.Estates.getManagers().then((managers: IManager[]) => {
      managers.map((m: IManager) => c.socket.emit(MessageTypes.ADD_MANAGER, m));
    });
    this.database.Estates.getMapping().then((regs: IEstateMap[]) => {
      regs.map((r: IEstateMap) => c.socket.emit(MessageTypes.ADD_REGION_ESTATE, r));
    });

    // send regions
    this.database.Regions.getAll().then((regions: IRegion[]) => {
      regions.map((r: IRegion) => c.socket.emit(MessageTypes.ADD_REGION, r));
    });

    //send groups
    this.database.Groups.getAll().then((groups: IGroup[]) => {
      groups.map((g: IGroup) => c.socket.emit(MessageTypes.ADD_GROUP, g));
    })
    this.database.Groups.getRoles().then((roles: IRole[]) => {
      roles.map((r: IRole) => c.socket.emit(MessageTypes.ADD_ROLE, r));
    })
    this.database.Groups.getMembers().then((members: IMembership[]) => {
      members.map((member: IMembership) => c.socket.emit(MessageTypes.ADD_MEMBER, member));
    })
  }

  private handleNormalUser(c: Client) {
    c.socket.on(MessageTypes.SET_OWN_PASSWORD, (password: string, cb: (success: boolean, message?: string) => void) => {
      let j: JobInstance
      console.log('user ' + c.id + ' is updating their password');
      return this.database.Jobs.create(JobTypes.SetMyPassword, c.id, JSON.stringify({ status: 'Pending' })).then((job) => {
        j = job;
        c.socket.emit(MessageTypes.ADD_JOB, j);
        return this.database.Users.setPassword(c.id, password);
      }).then(() => {
        j.data = JSON.stringify({ status: 'Success' })
        return j.save();
      }).then((j) => {
        c.socket.emit(MessageTypes.ADD_JOB, j);
      }).catch((e: Error) => {
        j.data = JSON.stringify({ status: 'Error: ' + e.message })
        j.save().then((j) => {
          c.socket.emit(MessageTypes.ADD_JOB, j);
        })
        cb(false, e.message)
      })
    })
  }

  private initAdminUser(c: Client) {

    //send hosts
    this.database.Hosts.getAll().then((hosts) => {
      hosts.map((host) => c.socket.emit(MessageTypes.ADD_HOST, host));
    })

    //send pending
    this.database.PendingUsers.getAll().then((users) => {
      users.map((user) => c.socket.emit(MessageTypes.ADD_PENDING_USER, user));
    })

    //send current status
    for(let id in this.hostStats){
      c.socket.emit(MessageTypes.HOST_STATUS, parseInt(id), this.hostStats[id]);
    }
    for(let name in this.regionStats){
      c.socket.emit(MessageTypes.REGION_STATUS, this.regionStats[name]);
    }



  }

  private handleAdminUser(c: Client) {
    c.socket.on(MessageTypes.REQUEST_CREATE_HOST, (address: string, cb: (success: boolean, message?: string) => void) => {
      console.log('user ' + c.id + ' is adding host ' + address);
      this.database.Hosts.create(address).then((host) => {
        cb(true);
        c.socket.emit(MessageTypes.ADD_HOST, host);
      }).catch((err: Error) => {
        cb(false, err.message);
      })
    })

    c.socket.on(MessageTypes.REQUEST_DELETE_HOST, (id: number, cb: (success: boolean, message?: string) => void) => {
      console.log('user ' + c.id + ' is removing host ' + id);
      this.database.Hosts.destroy(id).then(() => {
        cb(true);
        c.socket.emit(MessageTypes.HOST_DELETED, id);
      }).catch((err: Error) => {
        cb(false, err.message);
      })
    });

    c.socket.on(MessageTypes.REQUEST_CREATE_ESTATE, (name: string, owner: string, cb: (success: boolean, message?: string) => void) => {
      console.log('user ' + c.id + ' is creating estate ' + name);
      this.database.Estates.create(name, owner).then((e) => {
        cb(true);
        c.socket.emit(MessageTypes.ADD_ESTATE, e);
      }).catch((err: Error) => {
        cb(false, err.message);
      })
    });

    c.socket.on(MessageTypes.REQUEST_DELETE_ESTATE, (estateID: number, cb: (success: boolean, message?: string) => void) => {
      console.log('user ' + c.id + ' is deleting estate ' + estateID);
      this.database.Estates.destroy(estateID).then(() => {
        cb(true);
        c.socket.emit(MessageTypes.ESTATE_DELETED, estateID);
      }).catch((err: Error) => {
        cb(false, err.message);
      });
    });
  }

  hostUpdated(h: HostInstance) {
    console.log('Received connection from node ' + h.address);
    for (let id in this.clients) {
      if (this.clients[id].godLevel >= 250) {
        this.clients[id].socket.emit(MessageTypes.ADD_HOST, h);
      }
    }
  }

  hostStatus(h: HostInstance, stats: IHostStat) {
    console.log('Updated stats from node ' + h.address);
    this.hostStats[h.id] = stats;
    for (let id in this.clients) {
      if (this.clients[id].godLevel >= 250) {
        this.clients[id].socket.emit(MessageTypes.HOST_STATUS, h.id, stats);
      }
    }
  }

  regionStatus(stats: IRegionStat) {
    this.regionStats[stats.id] = stats;
    for (let id in this.clients) {
      if (this.clients[id].godLevel >= 250) {
        this.clients[id].socket.emit(MessageTypes.REGION_STATUS, stats);
      }
    }
  }
}