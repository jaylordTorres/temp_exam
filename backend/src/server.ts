import app from './app'
import { iniitalize } from './service/db'

const port = parseInt(process.env.APP_PORT as string) || 3000

async function startApp() {
  /// initialize db
  /// added seed data to memory db from json
  /// create thumbs from provideed images 
  await iniitalize();

  app.listen(port, () => {
    const logYellow = '\x1b[33m%s\x1b[0m';
    console.log(logYellow, `💾 running on ${port}`)
  })

}
startApp();
