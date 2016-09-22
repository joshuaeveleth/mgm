import { Action, Dispatch, Middleware, Store} from 'redux';

import * as io from "socket.io-client";
import * as Promise from "bluebird";

import { setAuthErrorMessage, logoutAction } from '../redux/actions';
import { mgmState } from '../redux/model';
import * as types from '../redux/types';

let sock: SocketIOClient.Socket = null;

function connectSocket(): Promise<void> {
  return new Promise<void>( (resolve, reject) => {
    console.log('attempting socket connection');
    sock = io.connect({
      reconnection: false
    });
    sock.on('connect_error', () => {
      return reject(new Error('Cannot connect to MGM socket server'));
    });
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
    case types.LOGIN_ACTION:
      connectSocket().then(() => {
        next(action);
      }).catch( (e:Error) => {
        store.dispatch(setAuthErrorMessage(e.message));
        store.dispatch(logoutAction());
      })
    case types.LOGOUT_ACTION:
      closeSocket();
      next(action);
    default:
      next(action);
  }
}
