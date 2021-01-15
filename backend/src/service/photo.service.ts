import { db } from './db'
import { IPhoto } from '../type'
import { promisafy } from '../helper'


// id, car_id, name
export const createPhoto = promisafy<IPhoto>(db.run.bind(db),
  `INSERT INTO photo VALUES (?, ?, ?)`)