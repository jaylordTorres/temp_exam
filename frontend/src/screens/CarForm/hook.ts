import { useMemo } from "react"
import { FormTypes } from "../../constants"


interface useCarFormHookProps {
  route: { params: { type: string } }
}
export const useCarFormHook = ({ route }: useCarFormHookProps) => {
  const config = useMemo(() => {
    return {
      isEdit: FormTypes.edit === route.params.type
    }
  }, [route])

  return {
    config
  }
}