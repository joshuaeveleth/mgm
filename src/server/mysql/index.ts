
/// <reference path="../../../typings/index.d.ts" />

import * as Sequelize from 'sequelize';

//HALCYON definitions
import { users, User } from './models/halcyon/users';
import { users as pendingUsers } from './models/mgm/users';
import { hosts } from './models/mgm/hosts';
import { regions } from './models/mgm/regions';

import { Host, Region, PendingUser } from '../../common/messages';

export { User } from './models/halcyon/users';

export interface Config {
  host: string
  user: string
  pass: string
  name: string
}

export interface MGMDB {
  hosts: Sequelize.Model<{},Host>
  regions: Sequelize.Model<{},Region>
  pendingUsers: Sequelize.Model<{},PendingUser>
}

export interface HALCYONDB {
  users: Sequelize.Model<{},User>
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
      pendingUsers: seq.import('users', pendingUsers)
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
      users: seq.import('users', users)
    };
  }
}
