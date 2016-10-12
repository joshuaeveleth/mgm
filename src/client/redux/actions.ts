import { Action } from 'redux';

import { Actions } from "./types";

import { IRole, IMembership, IManager, IEstateMap } from '../../common/messages';
import { Auth, Host, Region, User, PendingUser, Group, Estate, Job } from './model'

export interface LoginAction extends Action {
  user: User
  token: string
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
  role: IRole
}
export interface MembershipAction extends Action {
  member: IMembership
}

export interface EstateAction extends Action {
  estate: Estate
}
export interface ManagerAction extends Action {
  manager: IManager
}
export interface EstateMapAction extends Action {
  region: IEstateMap
}

export interface RequestCreateHostAction extends Action {
  address: string
}
export interface RequestDeleteHostAction extends Action {
  host: Host
}
export interface HostDeletedAction extends Action {
  id: number
}


export function createLoginAction(user: User, token: string): Action {
  let act: LoginAction = {
    type: Actions.LOGIN,
    user: user,
    token: token
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
export function createRoleAction(r: IRole): Action {
  let act: RoleAction = {
    type: Actions.ADD_ROLE,
    role: r
  }
  return act;
}
export function createMembershipAction(m: IMembership): Action {
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
export function createManagerAction(m: IManager): Action {
  let act: ManagerAction = {
    type: Actions.ADD_MANAGER,
    manager: m
  }
  return act;
}
export function createEstateMapAction(r: IEstateMap): Action {
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

export function createRequestCreateHostAction(address: string): Action {
  let act: RequestCreateHostAction = {
    type: Actions.REQUEST_CREATE_HOST,
    address: address
  }
  return act;
}

export function createRequestDeleteHostAction(host: Host): Action {
  let act: RequestDeleteHostAction = {
    type: Actions.REQUEST_DELETE_HOST,
    host: host
  }
  return act;
}

export function createHostDeletedAction(id: number): Action {
  let act: HostDeletedAction = {
    type: Actions.HOST_DELETED,
    id: id
  }
  return act;
}