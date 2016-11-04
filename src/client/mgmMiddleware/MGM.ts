import { Action, Dispatch, Middleware, Store } from 'redux';

import * as io from "socket.io-client";
import * as Promise from "bluebird";

import { Connection } from './Connection';

import {
  createSetAuthErrorMessageAction,
  createLogoutAction,
  LoginAction,
  MyPasswordAction,
} from '../redux/actions';

import { IHost, IRegion, IUser, IPendingUser, IJob, IHostStat, IRegionStat } from '../../common/messages'
import { Auth, StateModel } from '../redux/model'
import { MessageTypes } from '../../common/MessageTypes';

import { User, UpsertUserAction } from '../components/Users';
import { Region, UpsertRegionAction, RegionStat, UpsertRegionStatAction } from '../components/Regions';

import { PendingUser, UpsertPendingUserAction } from '../components/PendingUsers';
import { Job, UpsertJobAction } from '../components/Account';

import { handleHostMessages } from './Host';
import { handleEstateMessages } from './Estate';
import { handleGroupMessages } from './Group';

interface SockJwtError {
  message: string
  data: {
    code: string
    message: string
    type: string
  }
}

function handleSocket(store: Store<StateModel>) {
  Connection.instance().sock.on(MessageTypes.ADD_JOB, (j: IJob) => {
    store.dispatch(UpsertJobAction(new Job(j)));
  })

  Connection.instance().sock.on(MessageTypes.ADD_REGION, (r: IRegion) => {
    store.dispatch(UpsertRegionAction(new Region(r)));
  })

  Connection.instance().sock.on(MessageTypes.ADD_USER, (u: IUser) => {
    store.dispatch(UpsertUserAction(new User(u)));
  })

  Connection.instance().sock.on(MessageTypes.ADD_PENDING_USER, (u: IPendingUser) => {
    store.dispatch(UpsertPendingUserAction(new PendingUser(u)));
  });

  Connection.instance().sock.on(MessageTypes.REGION_STATUS, (stat: IRegionStat) => {
    store.dispatch(UpsertRegionStatAction(new RegionStat(stat)));
  })
}

function connectSocket(store: Store<StateModel>, jwt: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    Connection.instance().sock = io.connect({
      reconnection: false
    });
    Connection.instance().sock.on('connect_error', () => {
      reject(new Error('Cannot connect to MGM socket server'));
    });
    Connection.instance().sock.on('connect', () => {
      Connection.instance().sock
        .emit('authenticate', jwt)
        .on('authenticated', () => {
          //we are token-authenticated and ready to roll
          console.log('client authenticated');
          resolve();
          handleSocket(store);
          handleHostMessages(store);
          handleEstateMessages(store);
          handleGroupMessages(store);
        })
        .on('unauthorized', (error: SockJwtError) => {
          reject(new Error('Token expired, please log in again'));
        })
    })
  });
}

function setMyPassword(action: Action) {
  let act = <MyPasswordAction>action;
  Connection.instance().sock.emit(MessageTypes.SET_OWN_PASSWORD, act.password, (success: boolean, message: string) => {
    if (success) {
      alertify.success('Password Updated Successfully');
    } else {
      alertify.error('Could not set password: ' + message);
    }
  });
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
      Connection.instance().closeSocket();
      next(action);
      break;
    case APP_CHANGE_PASSWORD:
      setMyPassword(action);
      break;

    default:
      next(action);
  }
}
