
import * as io from 'socket.io';
import { Host, Region } from '../common/messages';
import { Detail } from './auth';
import { MGMDB, HALCYONDB } from './mysql';

function handleUser(sock: SocketIO.Socket, mgmDB: MGMDB, halDB: HALCYONDB){
  // send estates
  

  // send regions
  mgmDB.regions.findAll().then( (regions: Region[]) => {
    regions.map( (r: Region) => {
      let msg : Region = {
        uuid: r.uuid,
        name: r.name,
        httpPort: r.httpPort,
        locX: r.locX,
        locY: r.locY,
        slaveAddress: r.slaveAddress,
        externalAddress: r.externalAddress
      }
      sock.emit('region', msg);
    })
  }).catch( (e: Error) => {
    console.log(e);
  })
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