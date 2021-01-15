import { IMaker, Meta } from '../../types'
import { RootStateOrAny } from 'react-redux'
import Const from './constant'
import { MakerState } from './type'

const selectMakers = (state: RootStateOrAny): IMaker[] => {
  return state[Const.namespace].ids.map((id: string) => state[Const.namespace].values[id])
}
const selectMakerMeta = (state: RootStateOrAny): Meta => {
  const value: MakerState = state[Const.namespace];
  return {
    loading: value.loading,
    error: value.error,
    cache: value.cache
  }
}


export default {
  selectMakers,
  selectMakerMeta
}