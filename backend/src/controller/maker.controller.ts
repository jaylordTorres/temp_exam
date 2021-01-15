import { Request, Response, Router } from 'express'
import { getMakers } from '../service/maker.service';
import { IMaker } from '../type';
import BaseController from './base.cotroller'


export default class MakerController extends BaseController {
  constructor(router: Router) {
    super();
    BaseController.addRouter(router, this);
  }
  url = '/api/maker/'

  /**
   * 
   * @param req [Request]
   * @param res [Response]
   * @returns [IMaker[]]
   * 
   */
  async index(req: Request, res: Response) {
    const data: IMaker[] = await getMakers()

    return res.json({
      data: data
    })
  }

}

