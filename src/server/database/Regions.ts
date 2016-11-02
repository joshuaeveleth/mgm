
import * as Sequelize from 'sequelize';
import { RegionInstance, RegionAttribute } from './mysql';
import { IRegion } from '../../common/messages';

export class Regions {
  private db: Sequelize.Model<RegionInstance, RegionAttribute>

  constructor(ui: Sequelize.Model<RegionInstance, RegionAttribute>) {
    this.db = ui;
  }

  getAll(): Promise<IRegion[]> {
    return this.db.findAll().then((regions: RegionInstance[]) => {
      return regions.map((r: RegionInstance) => {
        let region: IRegion = {
          uuid: r.uuid,
          name: r.name,
          httpPort: r.httpPort,
          locX: r.locX,
          locY: r.locY,
          externalAddress: r.externalAddress,
          slaveAddress: r.slaveAddress
        }
        return region;
      });
    });
  }
}