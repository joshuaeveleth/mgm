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
  createEstateMapAction } from '../redux/actions';
import { mgmState } from '../redux/model';
import { Actions } from '../redux/types';

import { Host, Region, User, PendingUser, Group, Role, Membership, Estate, Manager, EstateMap } from '../../common/messages'

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
  sock.on('host', (h: Host) => {
    store.dispatch(createUpsertHostAction(h));
  })

  sock.on('region', (r: Region) => {
    store.dispatch(createUpsertRegionAction(r));
  })

  sock.on('user', (u: User) => {
    store.dispatch(createUpsertUserAction(u));
  })

  sock.on('pendingUser', (u: PendingUser) => {
    store.dispatch(createInsertPendingUserAction(u));
  });


  sock.on('group', (group: Group) => {
    store.dispatch(createGroupAction(group));
  })
  sock.on('role', (role: Role) => {
    store.dispatch(createRoleAction(role));
  })
  sock.on('member', (member: Membership) => {
    store.dispatch(createMembershipAction(member));
  })

  sock.on('estate', (estate: Estate) => {
    store.dispatch(createEstateAction(estate));
  })
  sock.on('manager', (manager: Manager) => {
    store.dispatch(createManagerAction(manager));
  })
  sock.on('estateMap', (region: EstateMap) => {
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

    case Actions.AUTH_SET_ERROR_MESSAGE:
    case Actions.NAVIGATE_TO:
    case Actions.UPSERT_HOST:
    case Actions.UPSERT_REGION:
    case Actions.UPSERT_USER:
    case Actions.INSERT_PENDING_USER:
    case Actions.ADD_ROLE:
    case Actions.ADD_GROUP:
    case Actions.ADD_MEMBER:
    case Actions.ADD_ESTATE:
    case Actions.ADD_MANAGER:
    case Actions.ASSIGN_ESTATE:
      next(action);
      break;
    default:
      console.log('socket middleware ignored action: ' + action.type);
      next(action);
  }
}
