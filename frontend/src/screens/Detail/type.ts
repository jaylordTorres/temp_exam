import { ICar, IMaker, Meta } from "../../types";

export interface useCarDetailHookType {
  star: boolean

  onEdit: () => void
  onToggleStar: () => void
  car: ICar
}
