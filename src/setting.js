import { version } from '../package.json'

export default {
  // 版本信息
  releases: {
    version: version
  },

  // 在读取持久化数据失败时默认用户信息
  user: {
    info: {
      name: 'admin'
    }
  }
}
