
import * as io from 'socket.io';
import { Host } from '../common/messages';
import { Detail } from './auth';
import { MGMDB, HALCYONDB } from './mysql';

function handleUser(sock: SocketIO.Socket, mgmDB: MGMDB, halDB: HALCYONDB){
  // send estates
  

  // send regions

}

function handleAdmin(sock: SocketIO.Socket, mgmDB: MGMDB, halDB: HALCYONDB){
  //send hosts
  mgmDB.hosts.findAll().then( (hosts : Host[]) => {
    hosts.map( (h: Host) => {
      let msg : Host = {
        id: h.id,
        name: h.name,
        address: h.address,
        port: h.port,
        slots: h.slots
      }
      sock.emit('host', msg);
    })
  })

  //send groups

  //send users

  //send pending
}

export function handleClient(sock: SocketIO.Socket, account: Detail, mgmDB: MGMDB, halDB: HALCYONDB){
  if(account.godLevel >= 250){
    handleAdmin(sock, mgmDB, halDB);
  }
  handleUser(sock, mgmDB, halDB);
}