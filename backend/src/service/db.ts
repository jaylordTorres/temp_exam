import { ICar, ICarJson, IMaker } from '../type';
import { optimize as optimizePhoto } from './upload';
import Sqlite from 'sqlite3';

const sqlite3 = Sqlite.verbose();
const genId = require('uuid').v4;
const data = require('../cars.json')

export const db = new sqlite3.Database(':memory:');


///
/// migration
/// must run only one time
///

export function migration() {

  db.run("CREATE TABLE make (id STRING UNIQUE, name TEXT)");
  db.run(`CREATE TABLE photo (id STRING UNIQUE, car_id STRING, name STRING)
  `);
  db.run(`
    CREATE TABLE car (id STRING UNIQUE, make_id STRING, model STRING, year INT,  
    FOREIGN KEY(make_id) REFERENCES make(make_id))
  `);
  /// process makers
  const makers = getAllMaker(data.items)
  const makersIds = toIds(makers)
  const makerSmt = db.prepare("INSERT INTO make VALUES (?, ?)");
  makers.forEach(i => makerSmt.run(i.id, i.name))
  makerSmt.finalize();

  /// process cars
  const cars: ICarJson[] = data.items
  const carSmt = db.prepare("INSERT INTO car VALUES (?, ?, ?, ?)");
  cars.forEach(i => {
    carSmt.run(genId(), makersIds[i.make], i.model, i.year)
  })

  /// process images
  const assets = getAssets();
  const assetSmt = db.prepare("INSERT INTO photo VALUES (?, ?, ?)");
  db.each("SELECT id, make_id, year, model FROM car", function (err: Error, car: ICar) {
    if (err) { return; }
    const name = getRanodmImageFilename(assets);
    const id = genId()
    assetSmt.run(id, car.id, name)
    /// this will create thumbs images 
    optimizePhoto(id, 'assets/' + name, 'jpg')
  });

  db.each("SELECT id, name FROM make", function (err: Error, row: any) {
    err ? console.log(err) : null

  });
  db.each("SELECT id, make_id, year, model FROM car", function (err: Error, row: any) {
    err ? console.log(err) : null
  });
  db.each("SELECT id, car_id, name FROM photo", function (err: Error, row: any) {
    err ? console.log(err) : null
    console.log(row)
  });
  console.log('db migrated and add contents')
}

function getAllMaker(record: ICarJson[] = []): IMaker[] {
  const makers: IMaker[] = []
  const uniqueMaker = new Set<string>(record.map(i => i.make))
  uniqueMaker.forEach((name) => {
    makers.push({
      id: genId(),
      name
    })
  })
  return makers
}

function toIds(item: IMaker[] = []): Record<string, string> {
  return item.reduce((c, p) => ({ ...c, [p.name]: p.id }), {})
}

/// get all prefilled assets
/// will use to randomaise json items photos
function getAssets(): string[] {
  const assets: string[] = [];
  const files = './assets/';
  const fs = require('fs');
  fs.readdirSync(files).forEach((file: string) => {
    if (file.match(/\.jpg/i)) {
      assets.push(file)
    }
  });

  return assets
}
function getRanodmImageFilename(images: string[]): string {
  return images[Math.floor(Math.random() * images.length)]
}

export function iniitalize() {
  db.serialize(migration)
}

// test
if (require.main === module) {
  const testing = async () => {
    db.serialize(migration)
  }
  testing()
} 