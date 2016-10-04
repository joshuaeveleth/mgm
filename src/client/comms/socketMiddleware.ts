import { Action, Dispatch, Middleware, Store} from 'redux';

import * as io from "socket.io-client";
import * as Promise from "bluebird";

import { createSetAuthErrorMessageAction,
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
  createHostDeletedAction } from '../redux/actions';
import { mgmState } from '../redux/model';
import { Actions } from '../redux/types';

import { Host, Region, User, PendingUser, Group, Role, Membership, Estate, Manager, EstateMap, Job } from '../../common/messages'
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

function handleSocket(store: Store<mgmState>) {
  sock.on(MessageTypes.ADD_JOB, (j: Job) => {
    store.dispatch(createUpsertJobAction(j));
  })

  sock.on(MessageTypes.ADD_HOST, (h: Host) => {
    store.dispatch(createUpsertHostAction(h));
  })
  sock.on(MessageTypes.HOST_DELETED, (address: string) => {
    store.dispatch(createHostDeletedAction(address));
  })

  sock.on(MessageTypes.ADD_REGION, (r: Region) => {
    store.dispatch(createUpsertRegionAction(r));
  })

  sock.on(MessageTypes.ADD_USER, (u: User) => {
    store.dispatch(createUpsertUserAction(u));
  })

  sock.on(MessageTypes.ADD_PENDING_USER, (u: PendingUser) => {
    store.dispatch(createInsertPendingUserAction(u));
  });


  sock.on(MessageTypes.ADD_GROUP, (group: Group) => {
    store.dispatch(createGroupAction(group));
  })
  sock.on(MessageTypes.ADD_ROLE, (role: Role) => {
    store.dispatch(createRoleAction(role));
  })
  sock.on(MessageTypes.ADD_MEMBER, (member: Membership) => {
    store.dispatch(createMembershipAction(member));
  })

  sock.on(MessageTypes.ADD_ESTATE, (estate: Estate) => {
    store.dispatch(createEstateAction(estate));
  })
  sock.on(MessageTypes.ADD_MANAGER, (manager: Manager) => {
    store.dispatch(createManagerAction(manager));
  })
  sock.on(MessageTypes.ADD_REGION_ESTATE, (region: EstateMap) => {
    store.dispatch(createEstateMapAction(region));
  })
}

function connectSocket(store: Store<mgmState>, jwt: string): Promise<void> {
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
  let act= <RequestCreateHostAction>action;
  sock.emit(MessageTypes.REQUEST_DELETE_HOST, act.address, (success: boolean, message: string) => {
    if (success) {
      alertify.success('Host ' + act.address + ' added');
    } else {
      alertify.error('Could not add host ' + act.address + '+' + message);
    }
  })
}

function requestDeleteHost(action: Action) {
  let act= <RequestDeleteHostAction>action;
  sock.emit(MessageTypes.REQUEST_DELETE_HOST, act.host.address, (success: boolean, message: string) => {
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
export const socketMiddleWare = (store: Store<mgmState>) => (next: Dispatch<mgmState>) => (action: Action) => {
  switch (action.type) {
    case Actions.LOGIN:
      let act = <LoginAction>action;
      connectSocket(store, act.user.token).then(() => {
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
