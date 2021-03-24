const userApi = require('./api/userApi')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const expressJwt = require('express-jwt')

app.use(expressJwt({
  secret: 'userLogin', // 签名的密钥
  algorithms: ['HS256'] // 设置算法
}).unless({
  path: ['/api/user/login']
}))

app.use((req, res, next) => {
  // 由于express-jwt需要配合前台发送的cookie使用，所以要把Access-Control-Allow-Credentials设置为true
  // 设置Access-Control-Allow-Credentials为true后，Access-Control-Allow-Origin不能使用通配符，所以我改成req.get('origin')
  // 允许的请求主机名及端口号也可以用通配符*，表示允许所有主机请求
  res.setHeader('Access-Control-Allow-Origin', req.get('origin'))

  // 允许请求携带cookie
  res.setHeader('Access-Control-Allow-Credentials', true)
  // 允许的请求方式
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS,PUT,PATCH,DELETE')
  // 允许的请求头 express-jwt的cookie是使用Authorization所以需要允许Authorization通过
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization')
  res.setHeader('Access-Control-Expose-Headers', 'Authorization')

  next()
})

app.use((err, req, res, next) => {
  console.log(err)
  // 根据错误信息判断是否是未登录直接访问
  if (err.name === 'UnauthorizedError') {
    res.status(402).send('没有权限')
  }
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.send('error')
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/user', userApi)

app.listen(3000)

console.log('success listen at port: 3000')
