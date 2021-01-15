import { Request, Response, Router, NextFunction } from 'express'

export default class BaseController {
  url = ''
  static addRouter(router: Router, controller: BaseController) {
    router.get(controller.url, controller.index)
    router.post(controller.url, controller.create)
    router.put(controller.url + ':id', controller.update)
    router.delete(controller.url + ':id', controller.remove)
  }
  index(req: Request, res: Response, next: NextFunction) { }
  create(req: Request, res: Response, next: NextFunction) { }
  update(req: Request, res: Response, next: NextFunction) { }
  remove(req: Request, res: Response, next: NextFunction) { }
}
