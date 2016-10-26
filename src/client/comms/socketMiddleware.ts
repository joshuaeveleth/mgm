import { Action, Dispatch, Middleware, Store } from 'redux';

import * as io from "socket.io-client";
import * as Promise from "bluebird";

import {
  createSetAuthErrorMessageAction,
  createLogoutAction,
  LoginAction,
  createUpsertHostAction,
  createUpsertRegionAction,
  createUpsertUserAction,
  createInsertPendingUserAction,
  createGroupAction,
  createMembershipAction,
  createRoleAction,
  createEstateAction,
  createManagerAction,
  createEstateMapAction,
  MyPasswordAction,
  createUpsertJobAction,
  RequestCreateHostAction,
  RequestDeleteHostAction,
  createHostDeletedAction
} from '../redux/actions';
import { Actions } from '../redux/types';

import { IHost, IRegion, IUser, IPendingUser, IGroup, IRole, IMembership, IEstate, IManager, IEstateMap, IJob } from '../../common/messages'
import { Auth, StateModel, Host, Region, User, PendingUser, Group, Estate, Job, Role } from '../redux/model'
import { MessageTypes } from '../../common/MessageTypes';

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
    store.dispatch(createUpsertJobAction(new Job(j)));
  })

  sock.on(MessageTypes.ADD_HOST, (h: IHost) => {
    store.dispatch(createUpsertHostAction(new Host(h)));
  })
  sock.on(MessageTypes.HOST_DELETED, (id: number) => {
    store.dispatch(createHostDeletedAction(id));
  })

  sock.on(MessageTypes.ADD_REGION, (r: IRegion) => {
    store.dispatch(createUpsertRegionAction(new Region(r)));
  })

  sock.on(MessageTypes.ADD_USER, (u: IUser) => {
    store.dispatch(createUpsertUserAction(new User(u)));
  })

  sock.on(MessageTypes.ADD_PENDING_USER, (u: IPendingUser) => {
    store.dispatch(createInsertPendingUserAction(new PendingUser(u)));
  });


  sock.on(MessageTypes.ADD_GROUP, (group: IGroup) => {
    store.dispatch(createGroupAction(new Group(group)));
  })
  sock.on(MessageTypes.ADD_ROLE, (role: IRole) => {
    store.dispatch(createRoleAction(new Role(role)));
  })
  sock.on(MessageTypes.ADD_MEMBER, (member: IMembership) => {
    store.dispatch(createMembershipAction(member));
  })

  sock.on(MessageTypes.ADD_ESTATE, (estate: IEstate) => {
    store.dispatch(createEstateAction(new Estate(estate)));
  })
  sock.on(MessageTypes.ADD_MANAGER, (manager: IManager) => {
    store.dispatch(createManagerAction(manager));
  })
  sock.on(MessageTypes.ADD_REGION_ESTATE, (region: IEstateMap) => {
    store.dispatch(createEstateMapAction(region));
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

function requestCreateHost(action: Action) {
  let act = <RequestCreateHostAction>action;
  sock.emit(MessageTypes.REQUEST_CREATE_HOST, act.address, (success: boolean, message: string) => {
    if (success) {
      alertify.success('Host ' + act.address + ' added');
    } else {
      alertify.error('Could not add host ' + act.address + '+' + message);
    }
  })
}

function requestDeleteHost(action: Action) {
  let act = <RequestDeleteHostAction>action;
  sock.emit(MessageTypes.REQUEST_DELETE_HOST, act.host.id, (success: boolean, message: string) => {
    if (success) {
      alertify.success('Host ' + act.host.address + ' removed');
    } else {
      alertify.error('Could not remove host ' + act.host.address + '+' + message);
    }
  })
}

/**
 * This is a redux middleware.  As most actions in MGM affect the server, and then are asynchronously affected in return,
 * this middleware intercepts the requests and proxies them to the server, then dispatching based on the result.
 */
export const socketMiddleWare = (store: Store<StateModel>) => (next: Dispatch<StateModel>) => (action: Action) => {
  switch (action.type) {
    case Actions.LOGIN:
      let act = <LoginAction>action;
      connectSocket(store, act.token).then(() => {
        console.log('connection succeeded, proceeding with login')
        next(action);
      }).catch((e: Error) => {
        // log out, and set error message
        store.dispatch(createSetAuthErrorMessageAction(e.message));
      })
      break;
    case Actions.LOGOUT:
      closeSocket();
      next(action);
      break;
    case Actions.SET_MY_PASSWORD:
      setMyPassword(action);
      break;
    case Actions.REQUEST_CREATE_HOST:
      requestCreateHost(action);
      break;
    case Actions.REQUEST_DELETE_HOST:
      requestDeleteHost(action);
      break;

    // messages that we ignore, either because we don't care, or they come from us
    case Actions.AUTH_SET_ERROR_MESSAGE:
    case Actions.NAVIGATE_TO:
    case Actions.UPSERT_HOST:
    case Actions.HOST_DELETED:
    case Actions.UPSERT_REGION:
    case Actions.UPSERT_USER:
    case Actions.INSERT_PENDING_USER:
    case Actions.ADD_ROLE:
    case Actions.ADD_GROUP:
    case Actions.ADD_MEMBER:
    case Actions.ADD_ESTATE:
    case Actions.ADD_MANAGER:
    case Actions.ASSIGN_ESTATE:
    case Actions.UPSERT_JOB:
      next(action);
      break;
    default:
      console.log('socket middleware ignored action: ' + action.type);
      next(action);
  }
}
