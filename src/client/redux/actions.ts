import { Action } from 'redux';

import { Actions } from "./types";
import { LoginUser } from './model';

import { Host, Region, User, PendingUser, Group, Role, Membership, Estate, Manager, EstateMap, Job } from '../../common/messages'

export interface LoginAction extends Action {
  user: LoginUser
}

export interface MyPasswordAction extends Action {
  password: string
}

export interface JobAction extends Action {
  job: Job
}

export interface SetAuthMessage extends Action {
  message: string
}

export interface NavigateTo extends Action {
  url: string
}

export interface UpsertRegion extends Action {
  region: Region
}

export interface UpsertHost extends Action {
  host: Host
}

export interface UpsertUser extends Action {
  user: User
}

export interface InsertPendingUser extends Action {
  user: PendingUser
}

export interface GroupAction extends Action {
  group: Group
}
export interface RoleAction extends Action {
  role: Role
}
export interface MembershipAction extends Action {
  member: Membership
}

export interface EstateAction extends Action {
  estate: Estate
}
export interface ManagerAction extends Action {
  manager: Manager
}
export interface EstateMapAction extends Action {
  region: EstateMap
}


export function createLoginAction(user: LoginUser): Action {
  let act: LoginAction = {
    type: Actions.LOGIN,
    user: user
  }
  return act;
}

export function createLogoutAction(): Action {
  return { type: Actions.LOGOUT };
}

export function createSetAuthErrorMessageAction(msg: string): Action {
  let act: SetAuthMessage = {
    type: Actions.AUTH_SET_ERROR_MESSAGE,
    message: msg
  }
  return act;
}

export function createClearAuthErrorMessageAction(): Action {
  return { type: Actions.AUTH_CLEAR_ERROR_MESSAGE };
}

export function createNavigateToAction(url: string): Action {
  let act: NavigateTo = {
    type: Actions.NAVIGATE_TO,
    url: url
  }
  return act;
}

export function createUpsertRegionAction(r: Region): Action {
  let act: UpsertRegion = {
    type: Actions.UPSERT_REGION,
    region: r
  }
  return act;
}

export function createUpsertHostAction(h: Host): Action {
  let act: UpsertHost = {
    type: Actions.UPSERT_HOST,
    host: h
  }
  return act;
}

export function createUpsertUserAction(u: User): Action {
  let act: UpsertUser = {
    type: Actions.UPSERT_USER,
    user: u
  }
  return act;
}

export function createInsertPendingUserAction(u: PendingUser): Action {
  let act: InsertPendingUser = {
    type: Actions.INSERT_PENDING_USER,
    user: u
  }
  return act;
}

export function createGroupAction(g: Group): Action {
  let act: GroupAction = {
    type: Actions.ADD_GROUP,
    group: g
  }
  return act;
}
export function createRoleAction(r: Role): Action {
  let act: RoleAction = {
    type: Actions.ADD_ROLE,
    role: r
  }
  return act;
}
export function createMembershipAction(m: Membership): Action {
  let act: MembershipAction = {
    type: Actions.ADD_MEMBER,
    member: m
  }
  return act;
}

export function createEstateAction(e: Estate): Action {
  let act: EstateAction = {
    type: Actions.ADD_ESTATE,
    estate: e
  }
  return act;
}
export function createManagerAction(m: Manager): Action {
  let act: ManagerAction = {
    type: Actions.ADD_MANAGER,
    manager: m
  }
  return act;
}
export function createEstateMapAction(r: EstateMap): Action {
  let act: EstateMapAction = {
    type: Actions.ASSIGN_ESTATE,
    region: r
  }
  return act;
}

export function createSetMyPasswordAction(password: string): Action {
  let act: MyPasswordAction = {
    type: Actions.SET_MY_PASSWORD,
    password: password
  }
  return act;
}

export function createUpsertJobAction(job: Job): Action {
  let act: JobAction = {
    type: Actions.UPSERT_JOB,
    job: job
  }
  return act
}