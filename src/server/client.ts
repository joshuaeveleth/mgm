
import * as io from 'socket.io';
import { Host, Region, PendingUser, User, Group, Role, Membership, Estate, Manager, EstateMap, Job } from '../common/messages';
import { JobTypes } from '../common/jobTypes';
import { Detail } from './auth';
import { MGMDB, HALCYONDB, UserInstance, JobInstance } from './mysql';
import { Credential } from './auth/Credential';

/* the functions in this file involve querying the database for initial values, and interacting with the websocket.
 * Halcyon objects are copied and simplified before sending, as they contain a lot more information than necessary
 * MGM Pending Users are copied, as we do not need to send their passwords over the network
 */

function handleUser(sock: SocketIO.Socket, account: Detail, mgmDB: MGMDB, halDB: HALCYONDB) {
  // send tasks
  mgmDB.jobs.findAll({
    where: {
      user: account.uuid
    }
  }).then((jobs: JobInstance[]) => {
    jobs.map((j: JobInstance) => {
      sock.emit('job', j);
    })
  })

  // send estates
  halDB.estates.findAll().then((estates: Estate[]) => {
    estates.map((e: Estate) => {
      let estate: Estate = {
        EstateID: e.EstateID,
        EstateName: e.EstateName,
        EstateOwner: e.EstateOwner
      }
      sock.emit('estate', estate);
    })
  }).then(() => {
    return halDB.managers.findAll()
  }).then((managers: Manager[]) => {
    managers.map((m: Manager) => {
      let manager: Manager = {
        EstateId: m.EstateId,
        ID: m.ID,
        uuid: m.uuid
      }
      sock.emit('manager', manager);
    })
  }).then(() => {
    return halDB.estateMap.findAll();
  }).then((regs: EstateMap[]) => {
    regs.map((r: EstateMap) => {
      let region: EstateMap = {
        RegionID: r.RegionID,
        EstateID: r.EstateID
      }
      sock.emit('estateMap', region)
    })
  })

  // send regions
  mgmDB.regions.findAll().then((regions: Region[]) => {
    regions.map((r: Region) => {
      sock.emit('region', r);
    })
  }).catch((e: Error) => {
    console.log(e);
  })

  //send groups
  halDB.groups.findAll().then((groups: Group[]) => {
    groups.map((g: Group) => {
      let group: Group = {
        GroupID: g.GroupID,
        Name: g.Name,
        FounderID: g.FounderID,
        OwnerRoleID: g.OwnerRoleID
      }
      sock.emit('group', group);
    })
  })
  halDB.roles.findAll().then((roles: Role[]) => {
    roles.map((r: Role) => {
      sock.emit('role', r);
    })
  }).catch((err: Error) => {
    console.log(err);
  })
  halDB.members.findAll().then((members: Membership[]) => {
    members.map((member: Membership) => {
      sock.emit('member', member);
    })
  })

  //send users
  halDB.users.findAll().then((users: UserInstance[]) => {
    //send users, mapped to hide extra data from sim
    users.map((u: UserInstance) => {
      let user: User = {
        uuid: u.UUID,
        name: u.username + ' ' + u.lastname,
        email: u.email,
        godLevel: u.godLevel
      }
      sock.emit('user', user);
    })
  })

  sock.on('setMyPassword', (password: string, cb: (success: boolean, message?: string) => void) => {
    let hash = Credential.fromPlaintext(password);
    let job: JobInstance;
    mgmDB.jobs.create({
      type: JobTypes.SetMyPassword,
      user: account.uuid,
      timestamp: new Date(),
      data: 'Pending'
    }).then((j: JobInstance) => {
      job = j;
    }).then(() => {
      return halDB.users.find({
        where: {
          uuid: account.uuid
        }
      })
    }).then((u: UserInstance) => {
      if (u) {
        return u.updateAttributes({
          passwordHash: hash.hash
        })
      }
      throw new Error('Cannot set password, user does not exist');
    }).then(() => {
      cb(true);
      job.data = 'Succeeded';
      job.save().then( () => {
        sock.emit('job', job);
      })
    }).catch((err: Error) => {
      cb(false, err.message);
      job.data = 'Failed: ' + err.message;
      job.save().then( () => {
        sock.emit('job', job);
      })
    })
  })
}

function handleAdmin(sock: SocketIO.Socket, mgmDB: MGMDB, halDB: HALCYONDB) {
  //send hosts
  mgmDB.hosts.findAll().then((hosts: Host[]) => {
    hosts.map((h: Host) => {
      sock.emit('host', h);
    })
  })

  //send pending, blanking the password
  mgmDB.pendingUsers.findAll().then((users: PendingUser[]) => {
    users.map((u: PendingUser) => {
      let user: PendingUser = {
        name: u.name,
        gender: u.gender,
        email: u.email,
        registered: u.registered,
        summary: u.summary,
        password: ''
      }
      sock.emit('pendingUser', user);
    })
  })
}

export function handleClient(sock: SocketIO.Socket, account: Detail, mgmDB: MGMDB, halDB: HALCYONDB) {
  handleUser(sock, account, mgmDB, halDB);
  if (account.godLevel >= 250) {
    handleAdmin(sock, mgmDB, halDB);
  }
}