import { useCallback } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { createCar, getCars, updateCar, removeCar } from "../services/car.service";
import { CarSelector, CarActions } from "../store/car";
import { ICar, ICarEditType, Meta } from "../types";


const useCarService = () => {
  const dispatch = useDispatch()
  const cars = useSelector<RootStateOrAny, ICar[]>(CarSelector.selectCars)
  const meta = useSelector<RootStateOrAny, Meta>(CarSelector.selectCarsMeta)

  const restify = useCallback(async (fn) => {
    try {
      dispatch(CarActions.setLoading(true))
      await fn()
    } catch (e) {
      dispatch(CarActions.failed(e.message))
    } finally {
      dispatch(CarActions.setLoading(false))
    }
  }, [dispatch])

  const fetch = useCallback(async () => {
    restify(async () => {
      const result = await getCars()
      dispatch(CarActions.fetchSuccess(result.data))
    })
  }, [restify, dispatch])

  const create = useCallback(async (car: ICarEditType) => {
    restify(async () => {
      const result = await createCar(car)
      dispatch(CarActions.add(result.data))
    })
  }, [restify, dispatch])

  const update = useCallback(async (id: string, car: ICarEditType) => {
    restify(async () => {
      const result = await updateCar(id, car)
      dispatch(CarActions.update(id, result.data))
    })
  }, [restify, dispatch])

  const remove = useCallback(async (id: string) => {
    restify(async () => {
      await removeCar(id)
      dispatch(CarActions.remove(id))
    })
  }, [restify, dispatch])

  return {
    cars,
    create,
    fetch,
    meta,
    remove,
    update,
  }
}

export default useCarService;