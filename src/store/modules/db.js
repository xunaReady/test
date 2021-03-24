import db from '@/libs/db.js'
import util from '@/libs/util.js'

function pathInit ({
  dbName = 'database',
  path = '',
  user = true,
  validator = () => true,
  defaultValue = ''
}) {
  const uuid = util.cookie.get('uuid') || 'ghost-uuid'
  const currentPath = `${dbName}.${user ? `user.${uuid}` : 'public'}${path ? `.${path}` : ''}`
  const value = db.get(currentPath).value()
  if (value && validator(value)) {
    db.set(currentPath, defaultValue).write()
  }
  return currentPath
}

export default {
  namespaced: true,
  actions: {
    // 将数据存储到指定位置
    set (context, {
      dbName = 'database',
      path = '',
      value = '',
      user = false
    }) {
      db.set(pathInit({
        dbName,
        path,
        user
      }), value).write()
    },

    // 获取数据
    get (context, {
      dbName = 'database',
      path = '',
      defaultValue = '',
      user = false
    }) {
      return new Promise(resolve => {
        resolve(db.get(
          pathInit({
            dbName,
            path,
            user,
            defaultValue
          })
        ).value())
      })
    },

    // 获取存储数据库对象
    database (context, {
      user = false
    } = {}) {
      return new Promise(resolve => {
        resolve(db.get(
          pathInit({
            dbName: 'database',
            path: '',
            user,
            defaultValue: {}
          })
        ))
      })
    },

    // 清空存储数据库对象
    databaseClear (context, {
      user = false
    } = {}) {
      return new Promise(resolve => {
        resolve(
          db.get(pathInit({
            dbName: 'database',
            path: '',
            user,
            validator: () => false,
            defaultValue: {}
          }).value())
        )
      })
    }
  }
}
