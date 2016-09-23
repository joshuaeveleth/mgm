import { Action, Dispatch, Middleware, Store} from 'redux';

import * as io from "socket.io-client";
import * as Promise from "bluebird";

import { createSetAuthErrorMessageAction, createLogoutAction, LoginAction, createUpsertHostAction, createUpsertRegionAction } from '../redux/actions';
import { mgmState } from '../redux/model';
import { Actions } from '../redux/types';

import { Host, Region } from '../../common/messages'

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
          if (error.data.code == "invalid_token") {
            reject(new Error('Token expired, please log in again'));
          }
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
        console.log(e);
        store.dispatch(createSetAuthErrorMessageAction(e.message));
        store.dispatch(createLogoutAction());
      })
      break;
    case Actions.LOGOUT:
      closeSocket();
      next(action);
      break;
    
    case Actions.NAVIGATE_TO:
    case Actions.UPSERT_HOST:
    case Actions.UPSERT_REGION:
      next(action);
      break;
    default:
      console.log('socket middleware ignored action: ' + action.type);
      next(action);
  }
}
