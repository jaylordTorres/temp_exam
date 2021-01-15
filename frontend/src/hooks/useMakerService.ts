import { useCallback } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { getMakers } from "../services/maker.service";
import { MakerSelector, MakerActions } from "../store/maker";
import { IMaker, Meta } from "../types";
import { useRestify } from "./util";


const useMakerService = () => {
  const dispatch = useDispatch()
  const makers = useSelector<RootStateOrAny, IMaker[]>(MakerSelector.selectMakers)
  const meta = useSelector<RootStateOrAny, Meta>(MakerSelector.selectMakerMeta)
  const restify = useRestify(dispatch, MakerActions)


  const fetch = useCallback(async () => {
    if (!meta.cache) {
      restify(async () => {
        const result = await getMakers()
        dispatch(MakerActions.fetchSuccess(result.data))
      })
    }
  }, [restify, dispatch, meta])

  return {
    makers,
    fetch,
    meta,
  }
}

export default useMakerService;