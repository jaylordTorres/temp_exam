import { combineReducers } from 'redux'
import { carReducer } from '../car/reducer'
import { makerReducer } from '../maker/reducer'

export interface Stars {
  starred: {
    [key: string]: boolean
  }
}

const initState = {
  starred: {}
}

const star = (state: Stars = initState, action: any) => {
  switch (action.type) {
    case 'TOGGLE_STAR':
      return {
        ...state,
        starred: {
          ...state.starred,
          [action.id]: !state.starred[action.id]
        }
      }
    default:
      return state
  }
}

export default combineReducers({
  star,
  car: carReducer,
  maker: makerReducer,
})
