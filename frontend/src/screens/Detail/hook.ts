import { StackNavigationProp } from "@react-navigation/stack"
import { useCallback, useEffect, useMemo, useState } from "react"
import { RootStateOrAny, useDispatch, useSelector } from "react-redux"
import { FormTypes } from "../../constants"
import { useCarStar } from "../../hooks"
import { CarActions, CarSelector } from "../../store/car"
import { ICar, RootStackParamList } from "../../types"
import { useCarDetailHookType } from './type'


interface useCarDetailHookProps {
  route: { params: ICar }
  navigation: StackNavigationProp<RootStackParamList>
}

export const useCarDetailHook = ({ route, navigation }: useCarDetailHookProps): useCarDetailHookType => {
  const dispatch = useDispatch();
  const paramCar = route.params

  const car = useSelector<RootStateOrAny, ICar>(s => CarSelector.selectCar(s, paramCar.id))
  const { star, toggleStar } = useCarStar(paramCar)

  const _updateCarForm = useCallback((car) => {
    dispatch(CarActions.updateForm(car))
  }, [dispatch])

  const onEdit = useCallback(() => {
    _updateCarForm(car)
    navigation.navigate('Form', {
      type: FormTypes.edit,
      id: car?.id,
      car: car
    })
  }, [_updateCarForm, navigation, car])



  return { car, star, onEdit, onToggleStar: toggleStar }
}