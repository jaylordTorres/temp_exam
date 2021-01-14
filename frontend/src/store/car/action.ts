import {
  CarFetchFailedPayloadType,
  CarFetchSuccessPayloadType,
  CarUpdatePayloadType,
} from './type'
import Const from './constant'

const fetch = () => ({ type: Const.fetch })
const fetchSuccess = (payload: CarFetchSuccessPayloadType) => ({ payload, type: Const.fetchSuccess })
const fetchFailed = (payload: CarFetchFailedPayloadType) => ({ payload, type: Const.fetchSuccess })
const update = (payload: CarUpdatePayloadType) => ({ payload, type: Const.fetchSuccess })


export default {
  fetch,
  fetchSuccess,
  fetchFailed,
  update
}

