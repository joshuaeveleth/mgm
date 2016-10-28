import { Action, Dispatch, Middleware, Store } from 'redux';

import * as io from "socket.io-client";
import * as Promise from "bluebird";

import {
  createSetAuthErrorMessageAction,
  createLogoutAction,
  LoginAction,
  MyPasswordAction,
} from '../redux/actions';

import { IHost, IRegion, IUser, IPendingUser, IGroup, IRole, IMembership, IEstate, IManager, IEstateMap, IJob } from '../../common/messages'
import { Auth, StateModel } from '../redux/model'
import { MessageTypes } from '../../common/MessageTypes';

import { User, UpsertUserAction } from '../components/Users';
import { Region, UpsertRegionAction } from '../components/Regions';
import { Host, UpsertHostAction, HostDeletedAction } from '../components/Hosts';
import { Estate, UpsertEstateAction, EstateDeletedAction, CreateManagerAction, AssignRegionEstateAction } from '../components/Estates';
import { Role, Group, CreateGroupAction, CreateMemberAction, CreateRoleAction } from '../components/Groups'
import { PendingUser, UpsertPendingUserAction } from '../components/PendingUsers';
import { Job, UpsertJobAction } from '../components/Account';

let sock: SocketIOClient.Socket = null;

interface SockJwtError {
  message: string
  data: {
    code: string
    message: string
    type: string
  }
}

function handleSocket(store: Store<StateModel>) {
  sock.on(MessageTypes.ADD_JOB, (j: IJob) => {
    store.dispatch(UpsertJobAction(new Job(j)));
  })

  sock.on(MessageTypes.ADD_HOST, (h: IHost) => {
    store.dispatch(UpsertHostAction(new Host(h)));
  })
  sock.on(MessageTypes.HOST_DELETED, (id: number) => {
    store.dispatch(HostDeletedAction(id));
  })

  sock.on(MessageTypes.ADD_REGION, (r: IRegion) => {
    store.dispatch(UpsertRegionAction(new Region(r)));
  })

  sock.on(MessageTypes.ADD_USER, (u: IUser) => {
    store.dispatch(UpsertUserAction(new User(u)));
  })

  sock.on(MessageTypes.ADD_PENDING_USER, (u: IPendingUser) => {
    store.dispatch(UpsertPendingUserAction(new PendingUser(u)));
  });


  sock.on(MessageTypes.ADD_GROUP, (group: IGroup) => {
    store.dispatch(CreateGroupAction(new Group(group)));
  })
  sock.on(MessageTypes.ADD_ROLE, (role: IRole) => {
    store.dispatch(CreateRoleAction(new Role(role)));
  })
  sock.on(MessageTypes.ADD_MEMBER, (member: IMembership) => {
    store.dispatch(CreateMemberAction(member));
  })

  sock.on(MessageTypes.ADD_ESTATE, (estate: IEstate) => {
    store.dispatch(UpsertEstateAction(new Estate(estate)));
  })
  sock.on(MessageTypes.ESTATE_DELETED, (id: number) => {
    store.dispatch(EstateDeletedAction(id));
  })

  sock.on(MessageTypes.ADD_MANAGER, (manager: IManager) => {
    store.dispatch(CreateManagerAction(manager));
  })
  sock.on(MessageTypes.ADD_REGION_ESTATE, (region: IEstateMap) => {
    store.dispatch(AssignRegionEstateAction(region));
  })
}

function connectSocket(store: Store<StateModel>, jwt: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    sock = io.connect({
      reconnection: false
    });
    sock.on('connect_error', () => {
      reject(new Error('Cannot connect to MGM socket server'));
    });
    sock.on('connect', () => {
      sock
        .emit('authenticate', jwt)
        .on('authenticated', () => {
          //we are token-authenticated and ready to roll
          console.log('client authenticated');
          resolve();
          handleSocket(store);
        })
        .on('unauthorized', (error: SockJwtError) => {
          reject(new Error('Token expired, please log in again'));
        })
    })
  });
}

function closeSocket() {
  if (sock && sock.connected)
    sock.close();
  sock = null;
}

function setMyPassword(action: Action) {
  let act = <MyPasswordAction>action;
  sock.emit(MessageTypes.SET_OWN_PASSWORD, act.password, (success: boolean, message: string) => {
    if (success) {
      alertify.success('Password Updated Successfully');
    } else {
      alertify.error('Could not set password: ' + message);
    }
  });
}

export function RequestCreateHost(address: string) {
  sock.emit(MessageTypes.REQUEST_CREATE_HOST, address, (success: boolean, message: string) => {
    if (success) {
      alertify.success('Host ' + address + ' added');
    } else {
      alertify.error('Could not add host ' + address + ': ' + message);
    }
  })
}

export function RequestDeleteHost(host: Host) {
  sock.emit(MessageTypes.REQUEST_DELETE_HOST, host.id, (success: boolean, message: string) => {
    if (success) {
      alertify.success('Host ' + host.address + ' removed');
    } else {
      alertify.error('Could not remove host ' + host.address + ': ' + message);
    }
  })
}

export function RequestCreateEstate(name: string, owner: string) {
  sock.emit(MessageTypes.REQUEST_CREATE_ESTATE, name, owner, (success: boolean, message: string) => {
    if (success) {
      alertify.success('Estate ' + name + ' created');
    } else {
      alertify.error('Could not create estate ' + name + ': ' + message);
    }
  })
}

export function RequestDeleteEstate(e: Estate) {
  sock.emit(MessageTypes.REQUEST_DELETE_ESTATE, e.EstateID, (success: boolean, message: string) => {
    if (success) {
      alertify.success('Estate ' + e.EstateName + ' deleted');
    } else {
      alertify.error('Could not delete estate ' + e.EstateName + ': ' + message);
    }
  })
}

import { APP_LOGIN, APP_LOGOUT, APP_CHANGE_PASSWORD} from '../redux/actions';
/**
 * This is a redux middleware.  As most actions in MGM affect the server, and then are asynchronously affected in return,
 * this middleware intercepts the requests and proxies them to the server, then dispatching based on the result.
 */
export const MGM = (store: Store<StateModel>) => (next: Dispatch<StateModel>) => (action: Action) => {
  switch (action.type) {
    case APP_LOGIN:
      let act = <LoginAction>action;
      connectSocket(store, act.token).then(() => {
        console.log('connection succeeded, proceeding with login')
        next(action);
      }).catch((e: Error) => {
        // log out, and set error message
        store.dispatch(createSetAuthErrorMessageAction(e.message));
      })
      break;
    case APP_LOGOUT:
      closeSocket();
      next(action);
      break;
    case APP_CHANGE_PASSWORD:
      setMyPassword(action);
      break;

    default:
      next(action);
  }
}