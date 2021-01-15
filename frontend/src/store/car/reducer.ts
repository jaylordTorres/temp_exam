import { ActionType, ICar } from '../../types'
import { mergeKeys, mergeValues } from '../util'
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
  error: '',
  cache: false,
  form: null, // changes on async update
}

export const carReducer = (state: CarState = initState,
  action: ActionType<ICar | CarUpdatePayloadType | CarFetchSuccessPayloadType | CarFailedPayloadType>) => {


  switch (action.type) {
    case Const.fetch: {
      return {
        ...state,
        loading: true
      }
    }
    case Const.fetchSuccess: {
      const { payload: data } = action as CarFetchSuccessPayloadType
      return {
        ...state,
        ids: mergeKeys<ICar>(state.ids, data as ICar[]),
        values: mergeValues<ICar>(state.values, data as ICar[]),
        error: '',
        loading: false
      }
    }
    case Const.failed:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    case Const.update: {
      const { id, payload: data } = action
      // as CarUpdatePayloadType 

      return {
        ...state,
        values: {
          ...state.values,
          [id]: {
            ...(state.values[id] || {}),
            ...(typeof data === 'object' ? data : {}),
          }
        },
        form: {
          ...(state.form || {}),
          ...(data as ICar || {})
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

    case Const.updateForm: {
      const data = action.payload as ICar
      return {
        ...state,
        form: data
      }
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
