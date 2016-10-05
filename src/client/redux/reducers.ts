import { Action } from 'redux';
import { combineReducers } from 'redux-immutable';
import { Record, Map } from 'immutable';

import { Host, Region, User, PendingUser, Group, Membership, Role, Estate, Manager, EstateMap, Job } from '../../common/messages'
import { mgmState, GroupRecord, EstateRecord } from './model';

import {
  NavigateTo,
  LoginAction,
  SetAuthMessage,
  UpsertHost,
  UpsertRegion,
  UpsertUser,
  InsertPendingUser,
  GroupAction,
  MembershipAction,
  RoleAction,
  EstateAction,
  ManagerAction,
  EstateMapAction,
  JobAction,
  HostDeletedAction
} from './actions';
import { Actions } from './types';

const initialState = {
  auth: {
    loggedIn: false
  },
  url: window.location.href
}

const AUTH_INIT = Record({
  loggedIn: false,
  user: null,
  token: '',
  errorMsg: ''
})

function auth(state = new AUTH_INIT(), action: Action) {
  switch (action.type) {
    case Actions.LOGIN:
      let act = <LoginAction>action;
      return state
        .set('loggedIn', true)
        .set('user', act.user);
    case Actions.LOGOUT:
      return state
        .set('loggedIn', false)
        .set('user', null);
    case Actions.AUTH_SET_ERROR_MESSAGE:
      let aca = <SetAuthMessage>action;
      return state
        .set('loggedIn', false)
        .set('user', null)
        .set('errorMsg', aca.message);
    default: return state;
  }
}

function url(state = "/", action: Action) {
  switch (action.type) {
    case Actions.NAVIGATE_TO:
      let act = <NavigateTo>action;
      if (act.url === state) return state;
      return act.url
    default:
      return state;
  }
}

function hosts(state = Map<string, Host>(), action: Action) {
  switch (action.type) {
    case Actions.UPSERT_HOST:
      let act = <UpsertHost>action;
      return state.set(act.host.address, act.host);
    case Actions.HOST_DELETED:
      let rmvr = <HostDeletedAction>action;
      return state.delete(rmvr.address);
    default:
      return state;
  }
}

function regions(state = Map<string, Region>(), action: Action) {
  switch (action.type) {
    case Actions.UPSERT_REGION:
      let act = <UpsertRegion>action;
      return state.set(act.region.uuid, act.region);
    default:
      return state;
  }
}

function users(state = Map<string, User>(), action: Action) {
  switch (action.type) {
    case Actions.UPSERT_USER:
      let act = <UpsertUser>action;
      return state.set(act.user.uuid, act.user);
    default:
      return state;
  }
}

function pendingUsers(state = Map<string, PendingUser>(), action: Action) {
  switch (action.type) {
    case Actions.INSERT_PENDING_USER:
      let act = <InsertPendingUser>action;
      return state.set(act.user.name, act.user);
    default:
      return state;
  }
}

function groups(state = Map<string, GroupRecord>(), action: Action) {
  let gr: GroupRecord;
  switch (action.type) {
    case Actions.ADD_GROUP:
      let ga = <GroupAction>action;
      gr = state.get(ga.group.GroupID) || { group: null, members: [], roles: [] };
      gr.group = ga.group;
      return state.set(ga.group.GroupID, gr);
    case Actions.ADD_MEMBER:
      let ma = <MembershipAction>action;
      gr = state.get(ma.member.GroupID) || { group: null, members: [], roles: [] };
      gr.members.push(ma.member);
      return state.set(ma.member.GroupID, gr);
    case Actions.ADD_ROLE:
      let ra = <RoleAction>action;
      gr = state.get(ra.role.GroupID) || { group: null, members: [], roles: [] };
      gr.roles.push(ra.role);
      return state.set(ra.role.GroupID, gr);
    default:
      return state
  }
}

function jobs(state = Map<number, Job>(), action: Action) {
  switch (action.type) {
    case Actions.UPSERT_JOB:
      let j = <JobAction>action;
      return state.set(j.job.id, j.job);
    default:
      return state;
  }
}

function estates(state = Map<number, EstateRecord>(), action: Action) {
  let er: EstateRecord;
  switch (action.type) {
    case Actions.ADD_ESTATE:
      let ea = <EstateAction>action;
      er = state.get(ea.estate.EstateID) || { estate: null, managers: [], regions: [] }
      er.estate = ea.estate
      return state.set(ea.estate.EstateID, er);
    case Actions.ADD_MANAGER:
      let ma = <ManagerAction>action;
      er = state.get(ma.manager.EstateId) || { estate: null, managers: [], regions: [] }
      er.managers.push(ma.manager.uuid);
      return state.set(ma.manager.EstateId, er);
    case Actions.ASSIGN_ESTATE:
      let ra = <EstateMapAction>action;
      er = state.get(ra.region.EstateID) || { estate: null, managers: [], regions: [] }
      er.regions.push(ra.region.RegionID);
      return state.set(ra.region.EstateID, er);
    default:
      return state
  }
}

const rootReducer = combineReducers<Map<string,any>>({
  "auth": auth,
  "url": url,
  "hosts": hosts,
  "regions": regions,
  "users": users,
  "pendingUsers": pendingUsers,
  "groups": groups,
  "estates": estates,
  "jobs": jobs
});

export default rootReducer;