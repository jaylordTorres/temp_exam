import { useCallback, useMemo, useState } from "react"
import { FormTypes } from "../../constants"
import { CarFormState, ConfigType, useCarFormHookType } from './type'


interface useCarFormHookProps {
  route: { params: { type: string } }
}

export const useCarFormHook = ({ route }: useCarFormHookProps): useCarFormHookType => {
  const config = useMemo<ConfigType>(() => {
    return {
      isEdit: FormTypes.edit === route.params.type
    }
  }, [route])

  const [state, setState] = useState<CarFormState>({ make: '', model: '', year: '' })

  const onChange = useCallback((key: string, value: string) =>
    setState((s: CarFormState) => ({ ...s, [key]: value })), [setState])

  const onChangeMake = useCallback((value: string) => onChange('make', value), [onChange])
  const onChangeYear = useCallback((value: string) => onChange('year', value), [onChange])
  const onChangeModel = useCallback((value: string) => onChange('model', value), [onChange])

  return { config, state, onChangeMake, onChangeYear, onChangeModel }
}