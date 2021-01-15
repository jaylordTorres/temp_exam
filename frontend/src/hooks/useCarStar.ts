import { ICar } from "../types";
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { toggleStar } from '../store/actions'
import { useCallback } from "react";

const useCarStar = (car: ICar) => {
  const star = useSelector<RootStateOrAny, boolean>((state) => {
    return state.star.starred[car.id]
  })
  const dispatch = useDispatch()

  const _toggleStar = useCallback(() => dispatch(toggleStar(car.id)), [toggleStar, car]);

  return {
    star,
    toggleStar: _toggleStar
  }
}

export default useCarStar