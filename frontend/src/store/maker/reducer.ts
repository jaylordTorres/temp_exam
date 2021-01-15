import { ActionType, IMaker } from '../../types'
import { mergeKeys, mergeValues } from '../util'
import {
  MakerFailedPayloadType,
  MakerFetchSuccessPayloadType,
  MakerState,
} from './type'
import Const from './constant'

const initState = {
  ids: [],
  values: {},
  loading: false,
  error: '',
  cache: false,
}

export const makerReducer = (state: MakerState = initState,
  action: ActionType<MakerFetchSuccessPayloadType | MakerFailedPayloadType>) => {


  switch (action.type) {
    case Const.fetch: {
      return {
        ...state,
        loading: true
      }
    }
    case Const.fetchSuccess: {
      const { payload: data } = action as MakerFetchSuccessPayloadType
      console.log('data', data)
      return {
        ...state,
        ids: mergeKeys<IMaker>(state.ids, data as IMaker[]),
        values: mergeValues<IMaker>(state.values, data as IMaker[]),
        error: '',
        loading: false,
        // lock for caching
        cache: Array.isArray(data) && data?.length > 0
      }
    }

    case Const.failed:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    case Const.setLoading: {
      return {
        ...state,
        loading: action.payload
      }
    }
    default:
      return state
  }
}
