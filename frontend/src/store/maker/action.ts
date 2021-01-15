import {
  MakerFailedPayloadType,
  MakerFetchSuccessPayloadType,
} from './type'
import Const from './constant'

// const fetch = () => ({ type: Const.fetch })
const fetchSuccess = (payload: MakerFetchSuccessPayloadType) => ({ payload, type: Const.fetchSuccess })
const failed = (payload: MakerFailedPayloadType) => ({ payload, type: Const.failed })
const setLoading = (payload: boolean) => ({ payload, type: Const.setLoading })

export default {
  fetch,
  fetchSuccess,
  failed,
  setLoading,
}

