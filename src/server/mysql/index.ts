
/// <reference path="../../../typings/index.d.ts" />

import * as Sequelize from 'sequelize';

//HALCYON definitions
import { users, User } from './models/halcyon/users';

export interface Config {
  host: string
  user: string
  pass: string
  name: string
}

export interface MGMDB {

}

export interface HALCYONDB {
  users: any
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
      }
    });

    return {};
  }

  static connectHalcyon(conf: Config): HALCYONDB {
    let seq = new Sequelize(conf.name, conf.user, conf.pass, {
      host: conf.host,
      dialect: 'mysql',
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
    });

    var usersModel = seq.import('users', users);

    usersModel.findAll({}).then( (u: User[]) => {
      u.map( (us) => {
        console.log(us.passwordHash);
      });
    })

    return {
      users: usersModel 
    };
  }
}
