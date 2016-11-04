import { Action, Dispatch, Middleware, Store } from 'redux';
import { StateModel } from '../redux/model'
import { Connection } from './Connection';
import { MessageTypes } from '../../common/MessageTypes';
import { IRegion, IRegionStat } from '../../common/messages'
import { Region, UpsertRegionAction, RegionStat, UpsertRegionStatAction } from '../components/Regions';


export function handleRegionMessages(store: Store<StateModel>) {
  Connection.instance().sock.on(MessageTypes.ADD_REGION, (r: IRegion) => {
    store.dispatch(UpsertRegionAction(new Region(r)));
  })
  Connection.instance().sock.on(MessageTypes.REGION_STATUS, (stat: IRegionStat) => {
    store.dispatch(UpsertRegionStatAction(new RegionStat(stat)));
  })
}