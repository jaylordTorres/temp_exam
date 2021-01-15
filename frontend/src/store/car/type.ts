import { ICar, ActionType } from '../../types'

export interface CarFailedPayloadType extends ActionType<string> { }
export interface CarFetchSuccessPayloadType extends ActionType<ICar[]> { }

export interface CarUpdatePayloadType {
  id: string
  data: ICar
}

export interface CarAddPayloadType {
  data: ICar
}

export interface CarState {
  ids: string[];
  values: {
    [key: string]: ICar
  }
  loading: boolean
  error: string
  cache: boolean
}
