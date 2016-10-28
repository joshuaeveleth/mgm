import { Map, Record } from 'immutable';
import { Action } from 'redux';

import { IRegion } from '../../../common/messages';

const UPSERT_REGION = "REGIONS_UPSERT_REGION";

interface UpsertRegion extends Action {
  region: Region
}

const RegionClass = Record({
  uuid: '',
  name: '',
  httpPort: 0,
  locX: 0,
  locY: 0,
  externalAddress: '',
  slaveAddress: ''
})

export class Region extends RegionClass implements IRegion {
  readonly uuid: string
  readonly name: string
  readonly httpPort: number
  readonly locX: number
  readonly locY: number
  readonly externalAddress: string
  readonly slaveAddress: string

  set(key: string, value: string | number): Region {
    return <Region>super.set(key, value);
  }
}

export const UpsertRegionAction = function(r: Region): Action {
  let act: UpsertRegion = {
    type: UPSERT_REGION,
    region: r
  }
  return act;
}

export const RegionsReducer = function(state = Map<string, Region>(), action: Action): Map<string, Region> {
  switch (action.type) {
    case UPSERT_REGION:
      let act = <UpsertRegion>action;
      let r = state.get(act.region.uuid) || act.region;
      return state.set(act.region.uuid, r);
    default:
      return state;
  }
}