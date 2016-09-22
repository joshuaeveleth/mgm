import { Action, Dispatch, Middleware, Store} from 'redux';

import * as io from "socket.io-client";
import * as Promise from "bluebird";

import { createSetAuthErrorMessageAction, createLogoutAction, LoginAction } from '../redux/actions';
import { mgmState } from '../redux/model';
import * as types from '../redux/types';

let sock: SocketIOClient.Socket = null;

interface SockJwtError {
  message: string
  data: {
    code: string
    message: string
    type: string
  }
}

function connectSocket(jwt: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    sock = io.connect({
      reconnection: false
    });
    sock.on('connect_error', () => {
      reject(new Error('Cannot connect to MGM socket server'));
    });
    sock.on('connect', () => {
      sock
        .emit('authenticate', { token: jwt })
        .on('authenticated', () => {
          //we are token-authenticated and ready to roll
          console.log('client authenticated');
          resolve();
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
  console.log(action);
  switch (action.type) {
    case types.LOGIN_ACTION:
      let act = <LoginAction>action;
      connectSocket(act.user.token).then(() => {
        console.log('connection succeeded, proceeding with login')
        next(action);
      }).catch((e: Error) => {
        console.log(e);
        store.dispatch(createSetAuthErrorMessageAction(e.message));
        store.dispatch(createLogoutAction());
      })
      break;
    case types.LOGOUT_ACTION:
      closeSocket();
      next(action);
      break;
    default:
      next(action);
  }
}
