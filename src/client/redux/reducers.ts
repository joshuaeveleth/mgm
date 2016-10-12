import { Action } from 'redux';
import { Record, Map } from 'immutable';

import { IMembership, IRole, IManager, IEstateMap } from '../../common/messages'
import { StateModel, Auth, Host, Region, User, PendingUser, Group, Estate, Job } from './model';

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

function auth(state = new Auth(), action: Action): Auth {
  switch (action.type) {
    case Actions.LOGIN:
      let act = <LoginAction>action;
      return state
        .set('loggedIn', true)
        .set('errorMsg', '')
        .set('user', act.user);
    case Actions.LOGOUT:
      return state
        .set('loggedIn', false)
        .set('errorMsg', '')
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

function hosts(state = Map<number, Host>(), action: Action) {
  switch (action.type) {
    case Actions.UPSERT_HOST:
      let act = <UpsertHost>action;
      return state.set(act.host.id, act.host);
    case Actions.HOST_DELETED:
      let rmvr = <HostDeletedAction>action;
      return state.delete(rmvr.id);
    default:
      return state;
  }
}

function regions(state = Map<string, Region>(), action: Action) {
  switch (action.type) {
    case Actions.UPSERT_REGION:
      let act = <UpsertRegion>action;
      let r = state.get(act.region.uuid) || act.region;
      return state.set(act.region.uuid, act.region.set('estateID', r.estateID));
    case Actions.ASSIGN_ESTATE:
      let ra = <EstateMapAction>action;
      r = state.get(ra.region.RegionID) || new Region();
      return state.set(ra.region.RegionID, r.set('estateID', ra.region.EstateID));
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

function groups(state = Map<string, Group>(), action: Action) {
  let gr: Group;
  switch (action.type) {
    case Actions.ADD_GROUP:
      let ga = <GroupAction>action;
      gr = state.get(ga.group.GroupID) || ga.group
      return state.set(ga.group.GroupID, gr);
    //case Actions.ADD_MEMBER:
    //  let ma = <MembershipAction>action;
    //  gr = state.get(ma.member.GroupID) || { group: null, members: [], roles: [] };
    //  gr.members.push(ma.member);
    //  return state.set(ma.member.GroupID, gr);
    //case Actions.ADD_ROLE:
    //  let ra = <RoleAction>action;
    //  gr = state.get(ra.role.GroupID) || { group: null, members: [], roles: [] };
    //  gr.roles.push(ra.role);
    //  return state.set(ra.role.GroupID, gr);
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

function estates(state = Map<number, Estate>(), action: Action) {
  let er: Estate;
  switch (action.type) {
    case Actions.ADD_ESTATE:
      let ea = <EstateAction>action;
      er = state.get(ea.estate.EstateID) || ea.estate
      return state.set(ea.estate.EstateID, er);
    //case Actions.ADD_MANAGER:
    //  let ma = <ManagerAction>action;
    //  er = state.get(ma.manager.EstateId) || { estate: null, managers: [], regions: [] }
    //  er.managers.push(ma.manager.uuid);
    //  return state.set(ma.manager.EstateId, er);
    //case Actions.ASSIGN_ESTATE:
    //  let ra = <EstateMapAction>action;
    //  er = state.get(ra.region.EstateID) || { estate: null, managers: [], regions: [] }
    //  er.regions.push(ra.region.RegionID);
    //  return state.set(ra.region.EstateID, er);
    default:
      return state
  }
}

export default function rootReducer(state = new StateModel(), action: Action): StateModel {
  return state
    .set('auth', auth(state.auth, action))
    .set('url', url(state.url, action))
    .set('hosts', hosts(state.hosts, action))
    .set('regions', regions(state.regions, action))
    .set('users', users(state.users, action))
    .set('pendingUsers', pendingUsers(state.pendingUsers, action))
    .set('groups', groups(state.groups, action))
    .set('estates', estates(state.estates, action))
    .set('jobs', jobs(state.jobs, action));
}