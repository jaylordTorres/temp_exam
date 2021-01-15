import { useCallback, useEffect } from "react"
import { StackNavigationProp } from '@react-navigation/stack'
import { FormTypes } from "../../constants"
import { useCarService } from '../../hooks'
import { RootStackParamList } from "../../types"
import { useGarageHookType } from './type'


interface useGarageHookHookProps {
  navigation: StackNavigationProp<RootStackParamList>
}

export const useGarageHook = ({ navigation }: useGarageHookHookProps): useGarageHookType => {
  const { cars, fetch, meta } = useCarService()

  useEffect(() => { fetch() }, [fetch])

  const onPress = useCallback((car) => {
    navigation.navigate('Details', car)
  }, [])
  const onCreate = useCallback(() => {
    navigation.navigate('Form', { type: FormTypes.create })
  }, [])
  return { onPress, onCreate, meta, cars }
}