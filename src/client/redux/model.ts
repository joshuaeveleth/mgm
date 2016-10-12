
import { IHost, IRegion, IUser, IPendingUser, IGroup, IMembership, IRole, IEstate, IManager, IEstateMap, IJob } from '../../common/messages'

import { Map, Record } from 'immutable';

/** USERS */
const UserClass = Record({
  uuid: '',
  name: '',
  email: '',
  godLevel: 0
})

export class User extends UserClass implements IUser {
  uuid: string
  name: string
  email: string
  godLevel: number

  set(key: string, value: string | number): User {
    return <User>super.set(key, value);
  }
}

const PendingUserClass = Record({
  name: '',
  email: '',
  gender: '',
  registered: Date,
  summary: ''
})

export class PendingUser extends PendingUserClass implements IPendingUser {
  name: string
  email: string
  gender: string
  registered: Date
  summary: string

  set(key: string, value: string): User {
    return <User>super.set(key, value);
  }
}

/** AUTH */
interface IAuth {
  user: User,
  loggedIn: boolean,
  errorMsg: string,
  token: string
}

const AuthClass = Record({
  user: new User(),
  loggedIn: false,
  errorMsg: '',
  token: ''
})

export class Auth extends AuthClass implements IAuth {
  user: User
  loggedIn: boolean
  errorMsg: string
  token: string

  set(key: string, value: string | boolean | User): Auth {
    return <Auth>super.set(key, value);
  }
}

/** HOSTS */
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

/** REGIONS */
const RegionClass = Record({
  uuid: '',
  name: '',
  httpPort: 0,
  locX: 0,
  locY: 0,
  externalAddress: '',
  slaveAddress: '',
  estateID: 0
})

export class Region extends RegionClass implements IRegion {
  uuid: string
  name: string
  httpPort: number
  locX: number
  locY: number
  externalAddress: string
  slaveAddress: string
  estateID: number

  set(key: string, value: string | number): Region {
    return <Region>super.set(key, value);
  }
}

/** GROUPS */
const GroupClass = Record({
  GroupID: '',
  Name: '',
  FounderID: '',
  OwnerRoleID: ''
})

export class Group extends GroupClass implements IGroup {
  GroupID: string
  Name: string
  FounderID: string
  OwnerRoleID: string

  set(key: string, value: string): Group {
    return <Group>super.set(key, value);
  }
}

/** ESTATE */
const EstateClass = Record({
  EstateID: 0,
  EstateName: '',
  EstateOwner: '',
})

export class Estate extends EstateClass implements IEstate {
  EstateID: number
  EstateName: string
  EstateOwner: string

  set(key: string, value: string | number): Estate {
    return <Estate>super.set(key, value);
  }
}

/** JOB */
const JobClass = Record({
  id: 0,
  timestamp: '',
  type: '',
  user: '',
  data: ''
})

export class Job extends JobClass implements IJob {
  id: number
  timestamp: string
  type: string
  user: string
  data: string

  set(key: string, value: string | number): Job {
    return <Job>super.set(key, value);
  }
}

/** APPLICATION STATE */

export interface IStateModel {
  auth: Auth
  url: string
  hosts: Map<number, Host>
  regions: Map<string, Region>
  users: Map<string, User>
  pendingUsers: Map<string, PendingUser>
  groups: Map<string, Group>
  estates: Map<number, Estate>
  jobs: Map<number, Job>
}

const StateModelClass = Record({
  auth: new Auth(),
  url: '',
  hosts: Map<number, Host>(),
  regions: Map<string, Region>(),
  users: Map<string, User>(),
  pendingUsers: Map<string, PendingUser>(),
  groups: Map<string, Group>(),
  estates: Map<number, Estate>(),
  jobs: Map<number, Job>()
})

export class StateModel extends StateModelClass implements IStateModel {
  auth: Auth
  url: string
  hosts: Map<number, Host>
  regions: Map<string, Region>
  users: Map<string, User>
  pendingUsers: Map<string, PendingUser>
  groups: Map<string, Group>
  estates: Map<number, Estate>
  jobs: Map<number, Job>

  set(key: string, value: Auth | string | Map<string, any> | Map<number, any>): StateModel {
    return <StateModel>super.set(key, value);
  }
}