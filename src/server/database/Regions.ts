
import * as Sequelize from 'sequelize';
import { RegionInstance, RegionAttribute } from './mysql';
import { IRegion } from '../../common/messages';

export class Regions {
  private db: Sequelize.Model<RegionInstance, RegionAttribute>

  constructor(ui: Sequelize.Model<RegionInstance, RegionAttribute>) {
    this.db = ui;
  }

  getAll(): Promise<RegionInstance[]> {
    return this.db.findAll();
  }

  getBySlave(address: string): Promise<RegionInstance[]> {
    return this.db.findAll({
      where: {
        slaveAddress: address
      }
    })
  }
}