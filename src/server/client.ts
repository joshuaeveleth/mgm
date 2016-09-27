
import * as io from 'socket.io';
import { Host, Region, PendingUser, User, Group, Role, Membership } from '../common/messages';
import { Detail } from './auth';
import { MGMDB, HALCYONDB, User as DBUser } from './mysql';

/* the functions in this file involve querying the database for initial values, and interacting with the websocket.
 * Halcyon objects are copied and simplified before sending, as they contain a lot more information than necessary
 * MGM Pending Users are copied, as we do not need to send their passwords over the network
 */

function handleUser(sock: SocketIO.Socket, mgmDB: MGMDB, halDB: HALCYONDB) {
  // send estates


  // send regions
  mgmDB.regions.findAll().then((regions: Region[]) => {
    regions.map((r: Region) => {
      sock.emit('region', r);
    })
  }).catch((e: Error) => {
    console.log(e);
  })
}

function handleAdmin(sock: SocketIO.Socket, mgmDB: MGMDB, halDB: HALCYONDB) {
  //send hosts
  mgmDB.hosts.findAll().then((hosts: Host[]) => {
    hosts.map((h: Host) => {
      sock.emit('host', h);
    })
  })

  //send groups
  halDB.groups.findAll().then((groups: Group[]) => {
    groups.map( (g: Group) => {
      let group: Group = {
        GroupID: g.GroupID,
        Name: g.Name,
        FounderID: g.FounderID,
        OwnerRoleID: g.OwnerRoleID
      }
      sock.emit('group', group);
    })
  })
  halDB.roles.findAll().then( (roles: Role[]) => {
    roles.map( (r: Role) => {
      sock.emit('role', r);
    })
  }).catch( (err: Error) => {
    console.log(err);
  })
  halDB.members.findAll().then( (members: Membership[]) => {
    members.map( (member: Membership) => {
      sock.emit('member', member);
    })
  })

  //send users
  halDB.users.findAll().then((users: DBUser[]) => {
    //send users, mapped to hide extra data from sim
    users.map((u: DBUser) => {
      let user: User = {
        uuid: u.UUID,
        name: u.username + ' ' + u.lastname,
        email: u.email,
        godLevel: u.godLevel
      }
      sock.emit('user', user);
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
  if (account.godLevel >= 250) {
    handleAdmin(sock, mgmDB, halDB);
  }
  handleUser(sock, mgmDB, halDB);
}