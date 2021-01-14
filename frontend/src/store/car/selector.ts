import { ICar } from '../../types'
import { CarState } from './type'

const selectCars = (state: CarState): ICar[] => {
  /// useSelector will automatically memoize this
  /// unlike calling it as anoymouse function that does not memoize
  return state.ids.map(id => state.values[id])
}


export default {
  selectCars
}