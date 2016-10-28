import { Record, Map } from 'immutable';
import { Action } from 'redux';
import { IHost } from '../../../common/messages';

const UPSERT_HOST = 'HOSTS_UPSERT_HOST';
const HOST_DELETED = 'HOSTS_HOST_DELETED';

const HostClass = Record({
  id: 0,
  address: '',
  port: 0,
  name: '',
  slots: 0
})

export class Host extends HostClass implements IHost {
  id: number
  address: string
  port: number
  name: string
  slots: number

  set(key: string, value: string | number): Host {
    return <Host>super.set(key, value);
  }
}

export interface UpsertHost extends Action {
  host: Host
}

export interface HostDeletedAction extends Action {
  id: number
}

export const UpsertHostAction = function(h: Host): Action {
  let act: UpsertHost = {
    type: UPSERT_HOST,
    host: h
  }
  return act;
}

export const HostDeletedAction = function(id: number): Action {
  let act: HostDeletedAction = {
    type: HOST_DELETED,
    id: id
  }
  return act;
}

export const HostsReducer = function(state = Map<number, Host>(), action: Action): Map<number, Host> {
  switch (action.type) {
    case UPSERT_HOST:
      let act = <UpsertHost>action;
      return state.set(act.host.id, act.host);
    case HOST_DELETED:
      let rmvr = <HostDeletedAction>action;
      return state.delete(rmvr.id);
    default:
      return state;
  }
}