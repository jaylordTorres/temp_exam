import { ICar, ActionType } from '../../types'
import { CarPayloadType, CarState } from './type'
import Const from './constant'

const initState = {
  ids: [],
  values: {},
  loading: false,
  error: ''
}

export const carReducer = (state: CarState = initState, action: ActionType<CarPayload | ICar[]>) => {
  switch (action.type) {
    case Const.fetch:
      return {
        ...state,
        loading: true
      }
    case Const.fetchSuccess:
      return {
        ...state,
        ...action.payload as ICar[],
        error: '',
        loading: false
      }
    case Const.fetchFailed:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    case Const.update:
      const { id, data } = action.payload as CarPayloadType
      return {
        ...state,
        values: {
          ...state.values,
          [id]: data
        }
      }
    default:
      return state
  }
}