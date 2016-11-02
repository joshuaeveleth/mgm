

import * as Sequelize from 'sequelize';
import { PendingUserInstance, PendingUserAttribute } from './mysql';

export class PendingUsers {
  private db: Sequelize.Model<PendingUserInstance, PendingUserAttribute>

  constructor(ui: Sequelize.Model<PendingUserInstance, PendingUserAttribute>) {
    this.db = ui;
  }

  getAll(): Promise<PendingUserInstance[]> {
    return this.db.findAll();
  }
}