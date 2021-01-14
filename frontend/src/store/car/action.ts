import {
  CarAddPayloadType,
  CarFailedPayloadType,
  CarFetchSuccessPayloadType,
  CarUpdatePayloadType,
} from './type'
import Const from './constant'

const fetch = () => ({ type: Const.fetch })
const fetchSuccess = (payload: CarFetchSuccessPayloadType) => ({ payload, type: Const.fetchSuccess })
const failed = (payload: CarFailedPayloadType) => ({ payload, type: Const.failed })
const update = (id: string, payload: CarUpdatePayloadType) => ({ id, payload, type: Const.update })
const add = (payload: CarAddPayloadType) => ({ payload, type: Const.add })

const remove = (id: string) => ({ id, type: Const.remove })
const setLoading = (payload: boolean) => ({ payload, type: Const.setLoading })

export default {
  add,
  fetch,
  fetchSuccess,
  failed,
  update,
  setLoading,
  remove
}

