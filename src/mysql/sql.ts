
/// <reference path="../../typings/index.d.ts" />

import * as Promise from 'bluebird';
import * as mysql from 'mysql';

interface Config {
  host: string,
  user: string,
  pass: string,
  name: string
}

export class Sql {
  public pool: mysql.IPool

  constructor(config: Config) {
    this.pool = mysql.createPool({
      host: config.host,
      user: config.user,
      password: config.pass,
      database: config.name
    });
  }
}