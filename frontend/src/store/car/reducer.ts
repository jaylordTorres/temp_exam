import { ActionType } from '../../types'
import {
  CarAddPayloadType,
  CarFailedPayloadType,
  CarFetchSuccessPayloadType,
  CarState,
  CarUpdatePayloadType
} from './type'
import Const from './constant'

const initState = {
  ids: [],
  values: {},
  loading: false,
  error: ''
}

export const carReducer = (state: CarState = initState,
  action: ActionType<CarUpdatePayloadType | CarFetchSuccessPayloadType | CarFailedPayloadType>) => {


  switch (action.type) {
    case Const.fetch:
      return {
        ...state,
        loading: true
      }
    case Const.fetchSuccess:
      return {
        ...state,
        ...action.payload as CarFetchSuccessPayloadType,
        error: '',
        loading: false
      }
    case Const.fetchFailed:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    case Const.update: {
      const { id, data } = action.payload as CarUpdatePayloadType
      return {
        ...state,
        values: {
          ...state.values,
          [id]: data
        }
      }
    }
    case Const.remove: {
      const { id } = action;
      return {
        ...state,
        ids: [
          ...state.ids.filter(i => i != id)
        ],
        values: {
          ...state.values,
          [id]: undefined
        }
      }
    }

    case Const.add: {
      /// will add new id on ids, create values item 
      const { data } = action.payload as CarAddPayloadType
      return {
        ...state,
        ids: [
          data.id,
          ...state.ids
        ],
        values: {
          ...state.values,
          [data.id]: data
        }
      }
    }

    case Const.setLoading: {
      /// will add new id on ids, create values item 
      return {
        ...state,
        loading: action.payload
      }
    }
    default:
      return state
  }
}