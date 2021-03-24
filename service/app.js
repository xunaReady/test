const userApi = require('./api/userApi')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const expressJwt = require('express-jwt')

app.use((req, res, next) => {
  // 由于express-jwt需要配合前台发送的cookie使用，所以要把Access-Control-Allow-Credentials设置为true
  // 设置Access-Control-Allow-Credentials为true后，Access-Control-Allow-Origin不能使用通配符，所以我改成req.get('origin')
  // 允许的请求主机名及端口号也可以用通配符*，表示允许所有主机请求
  res.setHeader('Access-Control-Allow-Origin', req.get('origin'))

  // 允许请求携带cookie
  res.setHeader('Access-Control-Allow-Credentials', true)
  // 允许的请求方式
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS,PATCH,DELETE')
  // 允许的请求头 express-jwt的cookie是使用Authorization所以需要允许Authorization通过
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization')
  res.setHeader('Access-Control-Expose-Headers', 'Authorization')

  if (req.method === 'OPTIONS') {
    res.sendStatus(200) // 让options请求快速返回.
  } else {
    next()
  }
})

app.use(expressJwt({
  secret: 'userLogin', // 签名的密钥
  algorithms: ['HS256'] // 设置算法
}).unless({
  path: ['/api/user/login']
}))

app.use((err, req, res, next) => {
  if (err && err.name === 'UnauthorizedError') {
    res.status(401).send({ code: -1, msg: '无权访问' })
  }
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/user', userApi)

app.listen(3000)

console.log('success listen at port: 3000')
