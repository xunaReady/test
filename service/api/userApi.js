const models = require('../db/db')
const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const $sql = require('../db/sqlMap')
const jwt = require('jsonwebtoken')

const conn = mysql.createConnection(models.mysql)
conn.connect()

router.all('/', (err, req, res, next) => {
  console.log(err)
  const token = req.headers.Authorization
  console.log('输出token输出token输出token输出token输出token', token)
  if (token) {
    jwt.verify(token, 'userLogin', (err, decoded) => {
      if (err) {
        switch (err.name) {
          case 'JsonWebTokenError':
            res.status(403).send({ code: -1, msg: '无效的token' })
            break
          case 'TokenExpiredError':
            res.status(403).send({ code: -1, msg: 'token过期' })
            break
        }
      } else {
        next()
      }
    })
  }
})

const jsonWrite = function(res, ret) {
  if (typeof ret === 'undefined') {
    res.send({ code: -1, msg: 'error' })
  } else {
    console.log(ret)
    res.send(ret)
  }
}

// 增加用户接口
router.post('/addUser', (req, res) => {
  const sql = $sql.user.add
  const params = req.body
  console.log(params, '88888', params.name, params.password)
  conn.query(sql, [params.name, params.password], function(err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

// 登录接口
router.post('/login', (req, res) => {
  let sqlName = $sql.user.select_name
  const params = req.body
  console.log('77777', params)
  if (params.username) {
    sqlName += " where username = '" + params.username + "'"
  }
  conn.query(sqlName, function(err, result) {
    if (err) {
      console.log(err)
    }
    if (result[0] === undefined) {
      jsonWrite(res, { code: -1, msg: '用户名不存在' })
    } else {
      const resultArray = result[0]
      console.log(result[0])
      if (resultArray.password === params.password) {
        console.log(resultArray, resultArray.password)
        const token = jwt.sign({
          userid: resultArray.id,
          username: resultArray.username
        }, 'userLogin', {
          expiresIn: '24h'
        })
        return jsonWrite(res, {
          code: 1,
          msg: 'success',
          result: { ...result, token }
        })
      } else {
        jsonWrite(res, { code: -1, msg: '用户密码错误' })
      }
    }
  })
})

// 获取用户信息
router.get('/getUser', (req, res) => {
  let sqlName = $sql.user.select_name
  const params = req.query
  console.log('用户参数', params)
  if (params.username) {
    sqlName += " where username = '" + params.username + "'"
  }
  conn.query(sqlName, function(err, result) {
    if (err) {
      console.log(err)
    }
    if (result[0] === undefined) {
      jsonWrite(res, { code: -1, msg: 'error' })
    } else {
      jsonWrite(res, { code: 1, msg: 'success', result: result })
    }
  })
})

// 更新用户信息
router.post('/updateUser', (req, res) => {
  let sqlUpdate = $sql.user.update_user
  const params = req.body
  console.log(params)
  if (params.id) {
    sqlUpdate += "email = '" + params.email +
                        "',phone = '" + params.phone +
                        "',card = '" + params.card +
                        "',birth = '" + params.birth +
                        "',sex = '" + params.sex +
                        "' where id = '" + params.id + "'"
  }
  conn.query(sqlUpdate, params.id, function(err, result) {
    if (err) {
      console.log(err)
    }
    console.log(result)
    if (result.affectedRows === undefined) {
      res.send('更新失败，请联系管理员')
    } else {
      res.send('ok')
    }
  })
})

// 更改密码
router.post('/modifyPassword', (req, res) => {
  let sqlModify = $sql.user.update_user
  const params = req.body
  console.log(params)
  if (params.id) {
    sqlModify += " password = '" + params.pass +
                        "',repeatPass = '" + params.checkPass +
                        "' where id = " + params.id + "'"
  }
  conn.query(sqlModify, params.id, function(err, result) {
    if (err) {
      console.log(err)
    }
    if (result.affectedRows === undefined) {
      res.send('修改密码失败，请联系管理员')
    } else {
      res.send('ok')
    }
  })
})

module.exports = router
