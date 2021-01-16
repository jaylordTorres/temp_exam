import { StackNavigationProp } from "@react-navigation/stack"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Alert } from 'react-native'
import { FormTypes } from "../../constants"
import useCarService from '../../hooks/useCarService'
import useMakerService from "../../hooks/useMakerService"
import { ICar, RootStackParamList } from "../../types"
import { CarFormState, ConfigType, useCarFormHookType } from './type'


interface useCarFormHookProps {
  route: { params: { type: string, id?: string, car?: ICar } },
  navigation: StackNavigationProp<RootStackParamList>
}

export const useCarFormHook = ({ route, navigation }: useCarFormHookProps): useCarFormHookType => {
  const [state, setState] = useState<CarFormState>(Object.assign({}, { make: '', model: '', year: '' }, route.params.car))
  const config = useMemo<ConfigType>(() => {
    return {
      isEdit: FormTypes.edit === route.params.type,
      id: route.params.id,
      car: route.params.car
    }
  }, [route])

  const { create, update, remove, meta } = useCarService()
  const { makers, fetch } = useMakerService()
  useEffect(() => {
    fetch()
  }, [])

  const onChange = useCallback((key: string, value: string) =>
    setState((s: CarFormState) => ({ ...s, [key]: value })), [setState])

  const onChangeMake = useCallback((value: string) => onChange('make_id', value), [onChange])
  const onChangeYear = useCallback((value: string) => onChange('year', value), [onChange])
  const onChangeModel = useCallback((value: string) => onChange('model', value), [onChange])

  const onSubmit = useCallback(async () => {
    if (config.isEdit) {
      if (config.id) {
        await update(config.id, state)
      }
    } else {
      await create(state)
      navigation.pop()
    }
  }, [config, state])


  const onDelete = useCallback(() => {
    if (config.isEdit && config.id) {
      Alert.alert(
        "Delete Confirmation",
        `Are you sure you want to delete this model ${state.model}?`,
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          { text: "Delete", onPress: () => { config.id && remove(config.id) } }
        ],
        { cancelable: false }
      );
    }
  }, [config])

  return { makers, onSubmit, onDelete, config, state, onChangeMake, onChangeYear, onChangeModel, meta }
}