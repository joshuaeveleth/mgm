
/// <reference path="../../../typings/index.d.ts" />

import * as Sequelize from 'sequelize';

//HALCYON definitions
import { users, UserInstance, UserAttribute } from './models/halcyon/users';
import { users as pendingUsers, PendingUserInstance, PendingUserAttribute } from './models/mgm/users';
import { hosts, HostInstance, HostAttribute } from './models/mgm/hosts';
import { regions, RegionInstance, RegionAttribute } from './models/mgm/regions';

import { osGroup, GroupInstance, GroupAttribute } from './models/halcyon/osgroup';
import { osRole, RoleInstance, RoleAttribute } from './models/halcyon/osrole';
import { osGroupMembership, MembershipInstance, MembershipAttribute } from './models/halcyon/osgroupmembership';

import { estate_settings, EstateInstance, EstateAttribute } from './models/halcyon/estate_settings';
import { estate_map, EstateMapInstance, EstateMapAttribute } from './models/halcyon/estate_map';
import { estate_managers, ManagerInstance, ManagerAttribute } from './models/halcyon/estate_managers';

import { jobs, JobInstance, JobAttribute } from './models/mgm/jobs';

export { UserInstance } from './models/halcyon/users';
export { JobInstance } from './models/mgm/jobs';
export { HostInstance } from './models/mgm/hosts';
export { EstateInstance } from './models/halcyon/estate_settings';
export { ManagerInstance } from './models/halcyon/estate_managers';
export { EstateMapInstance } from './models/halcyon/estate_map';
export { GroupInstance } from './models/halcyon/osgroup';
export { PendingUserInstance } from './models/mgm/users';
export { MembershipInstance } from './models/halcyon/osgroupmembership';

export interface Config {
  host: string
  user: string
  pass: string
  name: string
}

export interface MGMDB {
  hosts: Sequelize.Model<HostInstance,HostAttribute>
  regions: Sequelize.Model<RegionInstance,RegionAttribute>
  pendingUsers: Sequelize.Model<PendingUserInstance,PendingUserAttribute>
  jobs: Sequelize.Model<JobInstance,JobAttribute>
}

export interface HALCYONDB {
  users: Sequelize.Model<UserInstance,UserAttribute>
  groups: Sequelize.Model<GroupInstance, GroupAttribute>
  roles: Sequelize.Model<RoleInstance, RoleAttribute>
  members: Sequelize.Model<MembershipInstance, MembershipAttribute>
  estates: Sequelize.Model<EstateInstance, EstateAttribute>
  managers: Sequelize.Model<ManagerInstance, ManagerAttribute>
  estateMap: Sequelize.Model<EstateMapInstance, EstateMapAttribute>
}

export class Sql {

  static connectMGM(conf: Config): MGMDB {
    let seq = new Sequelize(conf.name, conf.user, conf.pass, {
      host: conf.host,
      dialect: 'mysql',
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
      logging: false
    });

    return {
      hosts: seq.import('hosts', hosts),
      regions: seq.import('regions', regions),
      pendingUsers: seq.import('users', pendingUsers),
      jobs: seq.import('jobs', jobs)
    };
  }

  static connectHalcyon(conf: Config): HALCYONDB {
    let seq = new Sequelize(conf.name, conf.user, conf.pass, {
      host: conf.host,
      dialect: 'mysql',
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
      logging: false
    });

    return {
      users: seq.import('users', users),
      groups: seq.import('osgroup', osGroup),
      roles: seq.import('osrole', osRole),
      members: seq.import('osgroupmembership', osGroupMembership),
      estates: seq.import('estate_settings', estate_settings),
      managers: seq.import('estate_managers', estate_managers),
      estateMap: seq.import('estate_map', estate_map)
    };
  }
}
