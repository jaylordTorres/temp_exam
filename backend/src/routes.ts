import { Router } from 'express'
import CarController from './controller/car.controller'

const router = Router()

new CarController(router);

export default router
