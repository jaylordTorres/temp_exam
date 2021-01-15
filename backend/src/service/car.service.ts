import { db } from './db'
import { ICar, IMaker, IPhoto } from '../type'
import { promisafy } from '../helper'



export const getCars = promisafy<ICar[]>(db.all.bind(db),
  `SELECT car.id as id, car.make_id as make_id, make.name as make, model, year FROM car LEFT JOIN make ON make.id = car.make_id`)

export const getCarById = promisafy<ICar>(db.get.bind(db),
  `SELECT car.id as id, car.make_id as make_id, make.name as make_name, model, year 
    FROM car LEFT JOIN make ON make.id = car.make_id 
    WHERE car.id = ?`)

export const getCarPhoto = promisafy<IPhoto>(db.get.bind(db),
  `SELECT id, name FROM photo WHERE car_id= ?`)



/**
 * @params [model, make_id, year, id]
 */
export const updateCarById = promisafy<ICar>(db.run.bind(db),
  `UPDATE car
  SET
    model = ?,
    make_id = ?,
    year = ?
  WHERE id = ?`
)
