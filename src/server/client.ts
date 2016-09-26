
import * as io from 'socket.io';
import { Host, Region, PendingUser, User } from '../common/messages';
import { Detail } from './auth';
import { MGMDB, HALCYONDB, User as DBUser } from './mysql';

/* the functions in this file involve querying the database for initial values, and interacting with the websocket.
 * Halcyon objects are copied and simplified before sending, as they contain a lot more information than necessary
 * MGM Pending Users are copied, as we do not need to send their passwords over the network
 */

function handleUser(sock: SocketIO.Socket, mgmDB: MGMDB, halDB: HALCYONDB){
  // send estates
  

  // send regions
  mgmDB.regions.findAll().then( (regions: Region[]) => {
    regions.map( (r: Region) => {
      sock.emit('region', r);
    })
  }).catch( (e: Error) => {
    console.log(e);
  })
}

function handleAdmin(sock: SocketIO.Socket, mgmDB: MGMDB, halDB: HALCYONDB){
  //send hosts
  mgmDB.hosts.findAll().then( (hosts : Host[]) => {
    hosts.map( (h: Host) => {
      sock.emit('host', h);
    })
  })

  //send groups

  //send users
  halDB.users.findAll().then( (users: DBUser[]) => {
    //send users
    users.map( (u: DBUser) => {
      let user: User = {
        uuid: u.UUID,
        name: u.username + ' ' + u.lastname,
        email: u.email,
        godLevel: u.godLevel
      }
      sock.emit('user', user);
    })
  })

  //send pending
  mgmDB.pendingUsers.findAll().then( (users: PendingUser[]) => {
    // send pending users here
  })
}

export function handleClient(sock: SocketIO.Socket, account: Detail, mgmDB: MGMDB, halDB: HALCYONDB){
  if(account.godLevel >= 250){
    handleAdmin(sock, mgmDB, halDB);
  }
  handleUser(sock, mgmDB, halDB);
}