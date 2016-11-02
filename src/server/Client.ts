
import * as io from 'socket.io';
import { IHost, IRegion, IPendingUser, IUser, IGroup, IRole, IMembership, IEstate, IManager, IEstateMap, IJob } from '../common/messages';
import { MessageTypes } from '../common/MessageTypes';
import { JobTypes } from '../common/jobTypes';
import { Detail } from './auth';
import { PersistanceLayer } from './database';
import { Credential } from './auth/Credential';

export class Client {
  readonly socket: SocketIO.Socket
  readonly id: string
  readonly token: string
  readonly godLevel: number

  constructor(sock: SocketIO.Socket, account: Detail){
    this.socket = sock;
    this.id = account.uuid;
    this.token = account.consoleToken;
    this.godLevel = account.godLevel;
  }
}
