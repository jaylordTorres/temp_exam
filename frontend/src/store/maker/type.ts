import { ICar, ActionType, IMaker } from '../../types'

export interface MakerFailedPayloadType extends ActionType<string> { }
export interface MakerFetchSuccessPayloadType extends ActionType<IMaker[]> { }


export interface MakerState {
  ids: string[];
  values: {
    [key: string]: IMaker
  }
  loading: boolean
  error: string
  cache: boolean
}
