import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'
import setting from '@/setting.js'

const adapters = new LocalStorage(`dataAdmin-${setting.releases.version}`)
const db = low(adapters)

db.defaults({
  sys: {},
  database: {}
}).write()

export default db
