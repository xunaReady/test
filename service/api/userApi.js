var models = require('../db/db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../db/sqlMap')

var conn = mysql.createConnection(models.mysql)
conn.connect()

var jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.send('err')
  } else {
    console.log(ret)
    res.send(ret)
  }
}

var dataStr = function (str) {
  return new Date(str.slice(0, 7))
}

// 增加用户接口
router.post('/addUser', (req, res) => {
  var sql = $sql.user.add
  var params = req.body
  console.log(params)
  console.log(params.birth)
  conn.query(sql, [params.name, params.account, params.pass, params.checkPass,
    params.email, params.phone, params.card, dataStr(params.birth), params.sex], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

// 查找用户接口
router.post('/login', (req, res) => {
  var sqlName = $sql.user.select_name
  var params = req.body
  console.log(params)
  if (params.name) {
    sqlName += "where username = '" + params.name + "'"
  }
  conn.query(sqlName, params.name, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result[0] === undefined) {
      res.send('-1')
    } else {
      var resultArray = result[0]
      console.log(resultArray.password)
      if (resultArray.password === params.password) {
        jsonWrite(res, result)
      } else {
        res.send('0')
      }
    }
  })
})

// 获取用户信息
router.get('/getUser', (req, res) => {
  var sqlName = $sql.user.select_name
  var params = req.body
  console.log(params)
  if (params.name) {
    sqlName += "where username = '" + params.name + "'"
  }
  conn.query(sqlName, params.name, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result[0] === undefined) {
      res.send('-1')
    } else {
      jsonWrite(res, result)
    }
  })
})

// 更新用户信息
router.post('/updateUser', (req, res) => {
  var sqlUpdate = $sql.user.update_user
  var params = req.body
  console.log(params)
  if (params.id) {
    sqlUpdate += "email = '" + params.email +
                        "',phone = '" + params.phone +
                        "',card = '" + params.card +
                        "',birth = '" + params.birth +
                        "',sex = '" + params.sex +
                        "' where id = '" + params.id + "'"
  }
  conn.query(sqlUpdate, params.id, function (err, result) {
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
  var sqlModify = $sql.user.update_user
  var params = req.body
  console.log(params)
  if (params.id) {
    sqlModify += " password = '" + params.pass +
                        "',repeatPass = '" + params.checkPass +
                        "' where id = " + params.id + "'"
  }
  conn.query(sqlModify, params.id, function (err, result) {
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
