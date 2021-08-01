/*导入的模块 */
let mysql = require('mysql')
let express = require('express')
let svgCaptcha = require('svg-captcha') //验证码模块
let session = require('express-session') //session模块



/*创建数据池*/
let pool = mysql.createPool({
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: '123456',
  database: 'ego',
  connectionLimit: 10 //连接池大小限制
})

/*创建服务器 */
let server = express()
let port = 5050
server.listen(port, function () {
  console.log('服务器启动成功，正在监听端口：', port)
})

//使用Express提供的中间件：处理POST请求中的主体数据，保存在req.body属性中
//处理application/x-www-form-urlencoded类型的请求数据
server.use(express.urlencoded({
  extended: false //是否使用扩展工具解析请求主体
}))
//自定义中间件：允许指定客户端的跨域访问
server.use(function (req, res, next) {
  res.set('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
  res.set('Access-Control-Allow-Credentials', true)
  next() //放行，让后续的请求处理方法继续处理
})


/**
 * API  用户注册
 */

//检测账号是否已存在
server.post('/nickname', function (req, res) {
  //读取客户端nickname文本框的请求数据
  let nickname = req.body.nickname
  //执行数据库操作-----SELECT
  let sql = 'SELECT uid FROM ego_user WHERE nickname=?'
  pool.query(sql, [nickname], function (err, result) {
    if (err) throw err
    if (result.length > 0) {
      res.json({
        code: 500,
        msg: 'nickname already exists'
      })
      return
    } else {
      res.json({
        code: 200,
        msg: 'nickname can be used'
      })
    }
  })
})

//检测手机号是否已经存在
server.post('/phone', function (req, res) {
  //读取客户端phone文本框的请求数据
  let phone = req.body.phone
  //执行数据库操作-----SELECT
  let sql = 'SELECT uid FROM ego_user WHERE phone=?'
  pool.query(sql, [phone], function (err, result) {
    if (err) throw err
    if (result.length > 0) {
      res.json({
        code: 501,
        msg: 'phone already exists'
      })
      return
    } else {
      res.json({
        code: 201,
        msg: 'phone can be used'
      })
    }
  })
})

//检测邮箱是否已存在
server.post('/email', function (req, res) {
  //读取客户端email文本框的请求数据
  let email = req.body.email
  //执行数据库操作-----SELECT
  let sql = 'SELECT uid FROM ego_user WHERE email=?'
  pool.query(sql, [email], function (err, result) {
    if (err) throw err
    if (result.length > 0) {
      res.json({
        code: 502,
        msg: 'email already exists'
      })
      return
    } else {
      res.json({
        code: 202,
        msg: 'email can be used'
      })
    }
  })
})

//生成验证码
server.use(session({ //一定要写，不然疯狂报错
  secret: 'yzm',
  resave: true,
  saveUninitialized: true,
  key: 'yzm_sid',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}))

server.get('/yzm', function (req, res) {
  let codeConfig = {
    size: 4, // 验证码长度
    ignoreChars: '0o1i', // 验证码字符中排除 0o1i
    noise: 3, // 干扰线条的数量
    fontSize: 42,
    color: true, //开启文字颜色
    background: "#fff", //背景色
    width: 150,
    height: 44
  }
  let yzm = svgCaptcha.create(codeConfig);
  req.session.yzm = yzm.text.toLocaleLowerCase()
  res.type('svg');
  res.status(200).send(yzm.data);
})

//完成注册
server.post('/register', function (req, res) {
  let myyzm = req.body.myyzm
  let nickname = req.body.nickname
  let upassword = req.body.upassword
  let phone = req.body.phone
  let email = req.body.email

  if (myyzm != req.session.yzm) {
    res.json({
      code: 505,
      msg: 'yzm is wrong'
    })
    return
  }
  let sql01 = 'SELECT uid FROM ego_user WHERE nickname=? OR phone=? OR email=?'
  pool.query(sql01, [nickname, phone, email], function (err, result) {
    if (err) throw err
    if (result.length > 0) {
      res.json({
        code: 503,
        msg: 'user exists'
      })
      return
    }
    let sql02 = 'INSERT INTO ego_user(nickname,upassword,phone,email) VALUES(?, ?, ?, ?)'
    pool.query(sql02, [nickname, upassword, phone, email], function (err, result) {
      if (err) throw err
      res.json({
        code: 200,
        msg: 'register succ',
        uid: result.insertId
      })
    })
  })
})



//实现登录(成功后把数据存入session，可以在用ajax来获取显示)
server.post('/login', function (req, res) {
  let nickname = req.body.nickname
  let upassword = req.body.upassword
  let user = req.body.user
  let sql = 'SELECT uid FROM ego_user WHERE nickname = ? AND upassword = ?'
  pool.query(sql, [nickname, upassword], function (err, result) {
    if (err) throw err
    if (result.length > 0) {
      if (user == 'ordinary') {
        if (nickname != 'root') {
          res.json({
            code: 200,
            msg: 'login succ',
            uid: result[0].uid,
            nickname: nickname
          })
        } else {
          res.json({
            code: 506,
            msg: 'login fail'
          })
        }
      } else if (user == 'root' && nickname == 'root') {
        res.json({
          code: 201,
          msg: 'root login succ'
        })
      } else{
        res.json({
          code: 506,
          msg: 'login fail'
        })
      }
    } else {
      res.json({
        code: 506,
        msg: 'login fail'
      })
    }
  })
})

/*个人中心地址管理*/

//实现新增地址
server.post('/add_address', function (req, res) {
  let uid = req.body.uid
  let receiver = req.body.receiver
  let province = req.body.province
  let city = req.body.city
  let county = req.body.county
  let address = req.body.address
  let phone = req.body.phone
  let postcode = req.body.postcode
  let sql = 'INSERT INTO ego_user_address(uid,receiver, province, city, county, address, phone, postcode) VALUES (?,?,?,?,?,?,?,?)'
  pool.query(sql, [uid, receiver, province, city, county, address, phone, postcode], function (err, result) {
    if (err) throw err
    res.json({
      code: 200,
      aid: result.insertId
    })
  })
})

//实现地址管理显示
server.post('/address', function (req, res) {
  let uid = req.body.uid
  let sql01 = "SELECT * FROM ego_user_address WHERE uid = ?"
  let sql02 = "SELECT aid FROM ego_user_address WHERE uid = ? AND is_default = 1"
  pool.query(sql01, [uid], function (err, result) {
    if (err) throw err
    let allAddress = result 
    if(result.length > 0){
      pool.query(sql02, [uid], function (err, result) {
        if (err) throw err
        res.json({
          code: 200,
          defaultaid: result[0].aid,
          allAddress : allAddress
        })
      })
    }
    else{
      res.json({
        code:201
      })
    }
  })
})

//实现编辑模态框内容显示
server.post('/show_edit_address', function (req, res) {
  let aid = req.body.aid
  let sql = "SELECT * FROM ego_user_address WHERE aid = ?"
  pool.query(sql, [aid], function (err, result) {
    if (err) throw err
    res.json({
      code: 200,
      result: result
    })
  })
})

//实现编辑模态框内容的修改
server.post('/edit_address', function (req, res) {
  let aid = req.body.aid
  let receiver = req.body.receiver
  let province = req.body.province
  let city = req.body.city
  let county = req.body.county
  let address = req.body.address
  let phone = req.body.phone
  let postcode = req.body.postcode
  let sql = "UPDATE ego_user_address SET receiver = ?,province = ?,city = ?,county = ?,address = ?,phone = ?,postcode = ? WHERE aid = ?"
  pool.query(sql, [receiver, province, city, county, address, phone, postcode, aid], function (err, result) {
    if (err) throw err
    res.json({
      code: 200,
      msg: 'edit succ'
    })
  })
})

//实现删除地址
server.post('/delete', function (req, res) {
  let aid = req.body.aid
  let sql = "DELETE FROM ego_user_address WHERE ego_user_address.aid = ?"
  pool.query(sql, [aid], function (err, result) {
    if (err) throw err
    res.json({
      code: 200,
      msg: 'delete succ'
    })
  })
})

//实现设置默认地址
server.post('/setDefaultAddress', function (req, res) {
  let aid = req.body.aid
  let uid = req.body.uid
  let sql01 = 'UPDATE ego_user_address SET ego_user_address.is_default = 0 WHERE ego_user_address.uid = ?'
  let sql02 = 'UPDATE ego_user_address SET ego_user_address.is_default = 1 WHERE ego_user_address.aid = ?'
  let sql03 = 'SELECT aid FROM ego_user_address WHERE is_default = 0 AND uid = ?'
  pool.query(sql01, [uid], function (err, result) {
    pool.query(sql02, [aid], function (err, result) {
      pool.query(sql03, [uid], function (err, result) {
        if (err) throw err
        res.json({
          code: 200,
          NotDefaultaid: result
        })
      })
    })
  })
})

/*个人中心基本信息*/

//实现基本信息的获取显示
server.post('/show_personal',function(req,res){
  let uid = req.body.uid
  let sql = "SELECT * FROM ego_user WHERE uid = ?"
  pool.query(sql,[uid],function(err,result){
    if(err) throw err
    res.json({
      code:200,
      allData : result
    })
  })
})

//实现基本信息的保存更新
server.post('/save_personal',function(req,res){
  let uid = req.body.uid
  let upassword = req.body.upassword
  let gender = req.body.gender
  let uname = req.body.uname
  console.log(uid)
  console.log(upassword)
  sql = "UPDATE ego_user SET upassword = ?,gender = ?,uname = ? WHERE uid = ?"
  pool.query(sql,[upassword,gender,uname,uid],function(err,result){
    if(err) throw err
    res.json({
      code:200,
      msg: 'update succ'
    })
  })
})