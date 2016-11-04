import { Map, Record } from 'immutable';
import { Action } from 'redux';

import { IRegion, IRegionStat } from '../../../common/messages';

const UPSERT_REGION = "REGIONS_UPSERT_REGION";
const UPSERT_REGIONSTAT = "REGIONS_UPSERT_REGIONSTAT";

interface UpsertRegion extends Action {
  region: Region
}

interface UpsertRegionStat extends Action {
  status: RegionStat
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

const RegionStatClass = Record({
  id: '',
  running: false,
  stats: {
    timestamp: 0,
    uptime: 0,
    memPercent: 0,
    memKB: 0,
    cpuPercent: 0
  }
})

export class RegionStat extends RegionStatClass implements IRegionStat {
  id: string
  running: boolean
  stats: {
    timestamp: number
    uptime: number
    memPercent: number
    memKB: number
    cpuPercent: number
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

export const UpsertRegionStatAction = function(r: RegionStat): Action {
  let act: UpsertRegionStat = {
    type: UPSERT_REGIONSTAT,
    status: r
  }
  return act;
}

export const RegionStatsReducer = function(state = Map<string, RegionStat>(), action: Action): Map<string, RegionStat> {
  switch (action.type) {
    case UPSERT_REGIONSTAT:
      let act = <UpsertRegionStat>action;
      let r = state.get(act.status.id) || act.status;
      return state.set(act.status.id, r);
    default:
      return state;
  }
}