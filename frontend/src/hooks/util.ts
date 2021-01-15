import { useCallback } from "react"

export const useRestify = (dispatch: any, Action: any) => useCallback(async (fn) => {
  try {
    dispatch(Action.setLoading(true))
    await fn()
  } catch (e) {
    dispatch(Action.failed(e.message))
  } finally {
    dispatch(Action.setLoading(false))
  }
}, [dispatch])