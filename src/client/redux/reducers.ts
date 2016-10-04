import { Action, combineReducers } from 'redux';

import { Host, Region, User, Group, Membership, Role, Estate, Manager, EstateMap, Job } from '../../common/messages'
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

function auth(state = { loggedIn: false }, action: Action) {
  switch (action.type) {
    case Actions.LOGIN:
      let act = <LoginAction>action;
      return (<any>Object).assign({}, state, {
        loggedIn: true,
        user: act.user
      })
    case Actions.LOGOUT:
      return (<any>Object).assign({}, state, {
        loggedIn: false,
        user: null
      })
    case Actions.AUTH_SET_ERROR_MESSAGE:
      let aca = <SetAuthMessage>action;
      return (<any>Object).assign({}, state, {
        loggedIn: false,
        user: null,
        errorMsg: aca.message
      })
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

function hosts(state: { [key: string]: Host } = {}, action: Action) {
  switch (action.type) {
    case Actions.UPSERT_HOST:
      let act = <UpsertHost>action;
      return (<any>Object).assign({}, state, {
        [act.host.address]: (<any>Object).assign({}, state[act.host.address], act.host)
      });
    case Actions.HOST_DELETED:
      let rmvr = <HostDeletedAction>action;
      let newState = (<any>Object).assign({}, state, {});
      delete newState[rmvr.address];
      return newState;
    default:
      return state;
  }
}

function regions(state: { [key: string]: Region } = {}, action: Action) {
  switch (action.type) {
    case Actions.UPSERT_REGION:
      let act = <UpsertRegion>action;
      return (<any>Object).assign({}, state, {
        [act.region.uuid]: (<any>Object).assign({}, state[act.region.uuid], act.region)
      });
    default:
      return state;
  }
}

function users(state: { [key: string]: User } = {}, action: Action) {
  switch (action.type) {
    case Actions.UPSERT_USER:
      let act = <UpsertUser>action;
      return (<any>Object).assign({}, state, {
        [act.user.uuid]: (<any>Object).assign({}, state[act.user.uuid], act.user)
      });
    default:
      return state;
  }
}

function pendingUsers(state: { [key: string]: User } = {}, action: Action) {
  switch (action.type) {
    case Actions.INSERT_PENDING_USER:
      let act = <InsertPendingUser>action;
      return (<any>Object).assign({}, state, {
        [act.user.name]: (<any>Object).assign({}, state[act.user.name], act.user)
      });
    default:
      return state;
  }
}

function groups(state: { [key: string]: GroupRecord } = {}, action: Action) {
  switch (action.type) {
    case Actions.ADD_GROUP:
      let ga = <GroupAction>action;
      if (state[ga.group.GroupID]) {
        return (<any>Object).assign({}, state, {
          [ga.group.GroupID]: (<any>Object).assign({}, state[ga.group.GroupID], {
            group: ga.group
          })
        })
      } else {
        let gr: GroupRecord = {
          group: ga.group,
          members: [],
          roles: []
        }
        return (<any>Object).assign({}, state, {
          [ga.group.GroupID]: gr
        })
      }
    case Actions.ADD_MEMBER:
      let ma = <MembershipAction>action;
      if (state[ma.member.GroupID]) {
        return (<any>Object).assign({}, state, {
          [ma.member.GroupID]: (<any>Object).assign({}, state[ma.member.GroupID], {
            members: [...state[ma.member.GroupID].members, ma.member]
          })
        })
      } else {
        let gr: GroupRecord = {
          group: null,
          members: [ma.member],
          roles: []
        }
        return (<any>Object).assign({}, state, {
          [ma.member.GroupID]: gr
        })
      }
    case Actions.ADD_ROLE:
      let ra = <RoleAction>action;
      if (state[ra.role.GroupID]) {
        return (<any>Object).assign({}, state, {
          [ra.role.GroupID]: (<any>Object).assign({}, state[ra.role.GroupID], {
            roles: [...state[ra.role.GroupID].roles, ra.role]
          })
        })
      } else {
        let gr: GroupRecord = {
          group: null,
          members: [],
          roles: [ra.role]
        }
        return (<any>Object).assign({}, state, {
          [ra.role.GroupID]: gr
        })
      }
    default:
      return state
  }
}

function jobs(state: { [key: number]: Job; } = {}, action: Action) {
  switch (action.type) {
    case Actions.UPSERT_JOB:
      let j = <JobAction>action;
      return (<any>Object).assign({}, state, {
        [j.job.id]: j.job
      });
    default:
      return state;
  }
}

function estates(state: { [key: number]: EstateRecord } = {}, action: Action) {
  switch (action.type) {
    case Actions.ADD_ESTATE:
      let ea = <EstateAction>action;
      if (state[ea.estate.EstateID]) {
        return (<any>Object).assign({}, state, {
          [ea.estate.EstateID]: (<any>Object).assign({}, state[ea.estate.EstateID], {
            estate: ea.estate
          })
        })
      } else {
        let er: EstateRecord = {
          estate: ea.estate,
          managers: [],
          regions: []
        }
        return (<any>Object).assign({}, state, {
          [ea.estate.EstateID]: er
        })
      }
    case Actions.ADD_MANAGER:
      let ma = <ManagerAction>action;
      if (state[ma.manager.EstateId]) {
        return (<any>Object).assign({}, state, {
          [ma.manager.EstateId]: (<any>Object).assign({}, state[ma.manager.EstateId], {
            managers: [...state[ma.manager.EstateId].managers, ma.manager.uuid]
          })
        })
      } else {
        let er: EstateRecord = {
          estate: null,
          managers: [ma.manager.uuid],
          regions: []
        }
        return (<any>Object).assign({}, state, {
          [ma.manager.EstateId]: er
        })
      }
    case Actions.ASSIGN_ESTATE:
      let ra = <EstateMapAction>action;
      if (state[ra.region.EstateID]) {
        return (<any>Object).assign({}, state, {
          [ra.region.EstateID]: (<any>Object).assign({}, state[ra.region.EstateID], {
            regions: [...state[ra.region.EstateID].regions, ra.region.RegionID]
          })
        })
      } else {
        let er: EstateRecord = {
          estate: null,
          managers: [],
          regions: [ra.region.RegionID]
        }
        return (<any>Object).assign({}, state, {
          [ra.region.EstateID]: er
        })
      }
    default:
      return state
  }
}

const rootReducer = combineReducers<mgmState>({
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