// 导入其他的包import mysql
let mysql = require('mysql')

let svgCaptcha = require('svg-captcha') //验证码模块
let session = require('express-session') //session模块

// 使用第三方包提供的函数和对象
// 创建数据库连接池
let pool = mysql.createPool({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: 'ego',
    multipleStatements: true, //允许一次执行多条sql语句
    connectionLimit: 10        //连接池大小限制  
})


// 导入第三方模块：express，创建基于Node.js的web服务器
let express = require('express')

// 调用第三方提供的模块
let server = express()

// 运行web服务器监听特定的端口
let port = 5050
server.listen(port, function () {
    console.log('服务器启动成功，正在监听端口：', port)
})


/**************************************/
/****************后台API***************/
/**************************************/

//处理application/x—www-form-urlencoded类型的请求数据 
server.use(express.urlencoded({
    extended: false //是否是使用扩展工具解析请求主体
}))

// // 自定义中间件：允许指定客户端的跨域访问
// server.use(function (req, res, next) {
//     res.set('Access-Control-Allow-Origin', '*')//当前服务器允许来自任何客户端的跨域访问
//     next() //放行，让后续的请求处理方法继续处理
// })

//自定义中间件：允许指定客户端的跨域访问
server.use(function (req, res, next) {
    res.set('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
    // res.set('Access-Control-Allow-Origin', 'http://127.0.0.1:5050')

    // res.set('Access-Control-Allow-Origin', '*')
    res.set('Access-Control-Allow-Credentials', true)
    next() //放行，让后续的请求处理方法继续处理
  })




/**
 * 1. 首页数据
 */
server.get('/index', function (req, res) {
    let output = {
        carouselItems: [],
        topSaleItems: [],
        jianshenfuzhuang: [],
        jianshenhuju: [],
        jianshenqicai: [],
        jianshenshipin: [],
        yundongxie: []
    }
    let loadedCount = 0

    // 执行数据库查询1：轮播广告条目
    let sql1 = "select * from ego_index_carousel"
    pool.query(sql1, function (err, result) {
        if (err) throw err
        output.carouselItems = result
        loadedCount++
        if (loadedCount == 7) {
            res.json(output)
        }
    })

    let sql2 = "select * from ego_index_topSale limit 6"
    pool.query(sql2, function (err, result) {
        if (err) throw err
        output.topSaleItems = result
        loadedCount++
        if (loadedCount == 7) {
            res.json(output)
        }
    })

    let sql3 = "select ego_family.fid,title,subtitle,sold_count,product_pic,price from ego_family left join ego_product on ego_family.fid=ego_product.fid where aspectid=1 group by ego_family.fid limit 6"
    pool.query(sql3, function (err, result) {
        if (err) throw err
        output.jianshenfuzhuang = result
        loadedCount++
        if (loadedCount == 7) {
            res.json(output)
        }
    })

    let sql4 = "select ego_family.fid,title,subtitle,sold_count,product_pic,price from ego_family left join ego_product on ego_family.fid=ego_product.fid where aspectid=2 group by ego_family.fid limit 6"
    pool.query(sql4, function (err, result) {
        if (err) throw err
        output.jianshenhuju = result
        loadedCount++
        if (loadedCount == 7) {
            res.json(output)
        }
    })

    let sql5 = "select ego_family.fid,title,subtitle,sold_count,product_pic,price from ego_family left join ego_product on ego_family.fid=ego_product.fid where aspectid=3 group by ego_family.fid limit 6"
    pool.query(sql5, function (err, result) {
        if (err) throw err
        output.jianshenqicai = result
        loadedCount++
        if (loadedCount == 7) {
            res.json(output)
        }
    })

    let sql6 = "select ego_family.fid,title,subtitle,sold_count,product_pic,price from ego_family left join ego_product on ego_family.fid=ego_product.fid where aspectid=4 group by ego_family.fid limit 6"
    pool.query(sql6, function (err, result) {
        if (err) throw err
        output.jianshenshipin = result
        loadedCount++
        if (loadedCount == 7) {
            res.json(output)
        }
    })

    let sql7 = "select ego_family.fid,title,subtitle,sold_count,product_pic,price from ego_family left join ego_product on ego_family.fid=ego_product.fid where aspectid=5 group by ego_family.fid limit 6"
    pool.query(sql7, function (err, result) {
        if (err) throw err
        output.yundongxie = result
        loadedCount++
        if (loadedCount == 7) {
            res.json(output)
        }
    })

})

/**
 * 2. 分类商品
 */
server.get('/products', function (req, res) {
    let aspect = req.query.aspect
    let sql1 = "select aspectid from ego_aspect where name = ?"
    pool.query(sql1, [aspect], function (err, result) {
        if (err) throw err
        if (result.length > 0) {
            let output = result[0]
            let sql2 = "select ego_family.fid,title,subtitle,sold_count,product_pic,price from ego_family left join ego_product on ego_family.fid=ego_product.fid where aspectid = ? group by ego_family.fid"
            pool.query(sql2, [output.aspectid], function (err, result) {
                if (err) throw err
                res.json(result)
            })
        }
        else {
            res.json([])
        }
    })
})



/**
 * 3. 查找商品
 */
server.get('/search', function (req, res) {
    let keyword = req.query.keyword
    // 查询数据库
    if (keyword == '' || keyword == null) {
        let sql = "select ego_family.fid,title,subtitle,sold_count,product_pic,price from ego_family left join ego_product on ego_family.fid=ego_product.fid group by ego_family.fid"
        pool.query(sql, function (err, result) {
            if (err) throw err
            res.json(result)
        })
    }
    else {
        let sql = "select ego_family.fid,title,subtitle,sold_count,product_pic,price from ego_family left join ego_product on ego_family.fid=ego_product.fid where title like ? group by ego_family.fid"
        pool.query(sql, ['%' + keyword + '%'], function (err, result) {
            if (err) throw err
            res.json(result)
        })
    }

})



/**
 * 4. 商品家族信息
 */
server.get('/product_detail', function (req, res) {
    console.log(req)
    let fid = req.query.fid
    let output = {
        goods_family: [],
        product: []
    }
    let loadcount = 0   //加loadcount的目的，因为以下多个sql语句是并发进行的，为了确保能够成功并发，因此加上loadcount，并在每个query中进行判断，判断是否结束
    // let output=null
    let sql1 = "select * from ego_family where fid = ?"  //获取family内容
    pool.query(sql1, [fid], function (err, result) {
        if (err) throw err
        if (result.length > 0) {
            output.goods_family = result[0]
        }
        loadcount++
        if (loadcount == 2) {  //所有的四类数据全部加载完成
            res.json(output)
        }

    })

    let sql2 = "select * from ego_product where fid = ?"  //获取family下每个product内容
    //可是这里如何能够一次性获取多个product呢
    pool.query(sql2, [fid], function (err, result) {
        if (err) throw err
        if (result.length > 0) {
            output.product = result
        }
        loadcount++
        if (loadcount == 2) {  //所有的四类数据全部加载完成
            res.json(output)
        }
    })
})

// 5.添加商品到购物车
server.get('/addToCart', function (req, res) {
    console.log(req)
    let uid = req.query.uid
    let pid = req.query.pid
    let num = req.query.num
    let sql = 'select * from ego_user_shopping_cart where uid=? and pid=?'
    pool.query(sql, [uid, pid], function (err, result) {
        if (err) throw err
        if (result.length > 0) {
            //说明已存在该商品，则需要加，无需创建新数据
            let sql2 = 'update ego_user_shopping_cart set count=count+? where uid=? and pid=?'
            pool.query(sql2, [num, uid, pid], function (err, result) {
                if (err) throw err
                res.json(1)
            })
        }
        else {
            //不存在该商品，要插入一条新数据
            let sql2 = 'insert into ego_user_shopping_cart values(null,?,?,?);'
            pool.query(sql2, [uid, pid, num], function (err, result) {
                if (err) throw err
                res.json(1)
            })
        }
    })




    // //let loadcount =0   //加loadcount的目的，因为以下多个sql语句是并发进行的，为了确保能够成功并发，因此加上loadcount，并在每个query中进行判断，判断是否结束
    // let sql1 = "INSERT INTO ego_user_shopping_cart(cid,uid, pid, count) VALUES (?,?,?,?)"  //获取family内容
    // pool.query(sql1,[null,uid,pid,num],function(err,result){
    //     if(err) throw err
    //     res.json(1)
    // })
})



/**
 * 6.获取用户地址
 */
server.get('/user/address', function (req, res) {
    let uid = req.query.uid
    if (!uid) {
        res.json({})
        return
    }
    let sql = 'select * from ego_user_address where uid=?'
    pool.query(sql, [uid], function (err, result) {
        if (err) throw err
        res.json({
            "code": 200,
            "data": result
        })
    })
})
/**
 * 7.添加购物车购买项
 */
server.get('/cart/item/add', function (req, res) {
    //读取客户端请求消息传来的参数
    let uid = req.query.uid
    let pid = req.query.pid
    let buyCount = req.query.buyCount
    if (!uid || !pid || !buyCount) {
        res.json({})//把JS数据转换为JSON格式字符串，并发送给客户端
        return
    }
    //向数据库查询记录
    let sql = 'select * from ego_user_shopping_cart where uid=? and pid=?'
    pool.query(sql, [uid, pid], function (err, result) {
        if (err) throw err
        if (result.length > 0) {
            //说明已存在该商品，则需要加，无需创建新数据
            let sql2 = 'update ego_user_shopping_cart set count=count+? where uid=? and pid=?'
            pool.query(sql2, [buyCount, uid, pid], function (err, result) {
                if (err) throw err
                res.json({
                    "code": 200,
                    "msg": "add succ"
                })
            })
        }
        else {
            //不存在该商品，要插入一条新数据
            let sql2 = 'insert into ego_user_shopping_cart values(null,?,?,?);'
            pool.query(sql2, [uid, pid, buyCount], function (err, result) {
                if (err) throw err
                res.json({
                    "code": 200,
                    "msg": "add succ"
                })
            })
        }
    })
})
/**
 * 8.购物车项列表
 */
server.get('/cart/item/list', function (req, res) {
    //读取客户端请求消息传来的请求数据uid
    let uid = req.query.uid
    if (!uid) {
        res.json({})  //把JS数据转换为JSON格式字符串，并发送给客户端
        return
    }
    //向数据库查询指定uid的用户记录
    let sql = 'select cid,uid,ego_product.pid,title,property,price,count,product_pic from ego_user_shopping_cart,ego_product,ego_family where ego_user_shopping_cart.uid=? and ego_user_shopping_cart.pid=ego_product.pid and ego_product.fid=ego_family.fid order by ego_product.pid'
    pool.query(sql, [uid], function (err, result) {
        if (err) throw err
        res.json({
            "code": 200,
            "data": result
        })
    })
})
/**
 * 9.删除购物车项
 */
server.get('/cart/item/delete', function (req, res) {
    //读取客户端请求消息传来的请求数据cid
    let cid = req.query.cid
    let uid = req.query.uid
    let pid = req.query.pid
    if ((!cid) && (!uid || !pid)) {
        res.json({})  //把JS数据转换为JSON格式字符串，并发送给客户端
        return
    }
    if (cid) {
        let sql = 'delete from ego_user_shopping_cart where cid=?'
        pool.query(sql, [cid], function (err, result) {
            if (err) throw err
            res.json({
                "code": 200,
                "msg": "delete succ"
            })
        })
    }
    else {
        let sql = 'delete from ego_user_shopping_cart where uid=? and pid=?'
        pool.query(sql, [uid, pid], function (err, result) {
            if (err) throw err
            res.json({
                "code": 200,
                "msg": "delete succ"
            })
        })
    }

})
/**
 * 10.修改购物车条目中的购买数量
 */
server.get('/cart/item/updatecount', function (req, res) {
    let cid = req.query.cid
    let count = req.query.count
    if (!cid || !count) {
        res.json({})  //把JS数据转换为JSON格式字符串，并发送给客户端
        return
    }
    let sql = 'update ego_user_shopping_cart set count=? where cid=?'
    pool.query(sql, [count, cid], function (err, result) {
        if (err) throw err
        res.json({
            "code": 200,
            "msg": "delete succ"
        })
    })
})
/**
 * 11.预生成的订单
 */
server.get('/order/item/prepare', function (req, res) {
    let uid = req.query.uid
    let pids = req.query.pids
    if (!uid || !pids) {
        res.json({})  //把JS数据转换为JSON格式字符串，并发送给客户端
        return
    }

    pids = pids.replace('"', '')
    pids = pids.replace('"', '')
    pids = pids.split(',')
    let sql = 'select ego_product.pid,title,property,price,product_pic from ego_product,ego_family where ego_product.fid=ego_family.fid and ('
    for (var i = 0; i < pids.length; i++) {
        sql = sql + 'ego_product.pid=?'
        if (i != pids.length - 1) {
            sql = sql + ' or '
        }
    }
    // params=[]
    // params[0]=uid
    // for(var i=0;i<pids.length;i++){
    //     params[i+1]=pids[i]
    // }
    sql = sql + ')'
    pool.query(sql, pids, function (err, result) {
        if (err) throw err
        res.json({
            "code": 200,
            "data": result
        })
    })
})
/**
 * 12.创建新订单
 */
server.get('/order/item/create', function (req, res) {
    let uid = req.query.uid
    let aid = req.query.aid
    let pids = req.query.pids
    let counts = req.query.counts
    if (!uid || !aid || !pids || !counts) {
        res.json({})  //把JS数据转换为JSON格式字符串，并发送给客户端
        return
    }
    pids = pids.replace('"', '')
    pids = pids.replace('"', '')
    pids = pids.split(',')
    counts = counts.replace('"', '')
    counts = counts.replace('"', '')
    counts = counts.split(',')
    if (pids.length != counts.length) {//商品数和商品数量不匹配
        res.json({})
        return
    }
    let flag = 0
    let sql = 'insert into ego_user_order values(null,?,?,0,' + (new Date()).getTime() + ',null,null,null)'
    pool.query(sql, [uid, aid], function (err, result) {
        if (err) throw err
        let oid = result.insertId
        for (var i = 0; i < pids.length; i++) {
            let sql2 = 'insert into ego_user_order_details values(null,?,?,?)'
            pool.query(sql2, [oid, pids[i], counts[i]], function (err, result) {
                if (err) throw err
                flag++
                if (flag == pids.length + 1) {
                    res.json({
                        "code": 200,
                        "msg": "delete succ"
                    })
                }
            })
        }
        flag++
        if (flag == pids.length + 1) {
            res.json({
                "code": 200,
                "msg": "delete succ"
            })
        }
    })
})
/**
 * 13.查看所有订单
 */
server.get('/order/item/list', function (req, res) {
    let uid = req.query.uid
    let status = req.query.status
    let sql = 'select order_time,aid,ego_user_order.oid,title,property,price,count,product_pic,status from ego_product,ego_family,ego_user_order,ego_user_order_details where ego_user_order.uid=? and ego_user_order.oid=ego_user_order_details.oid and ego_user_order_details.pid=ego_product.pid and ego_product.fid=ego_family.fid'
    if (!uid) {
        res.json({})  //把JS数据转换为JSON格式字符串，并发送给客户端
        return
    }
    if (status) {//只要求查询特定状态的订单
        sql = sql + ' and status=? order by ego_user_order.oid desc'
        pool.query(sql, [uid, status], function (err, result) {
            if (err) throw err
            res.json({
                "code": 200,
                "data": result
            })
        })
    }
    else {
        sql = sql + ' order by ego_user_order.oid desc'
        pool.query(sql, [uid], function (err, result) {
            if (err) throw err
            res.json({
                "code": 200,
                "data": result
            })
        })
    }
})
/**
 * 14.订单详情
 */
server.get('/order/item/detail', function (req, res) {
    let oid = req.query.oid
    if (!oid) {
        res.json({})  //把JS数据转换为JSON格式字符串，并发送给客户端
        return
    }
    let sql = 'select ego_user_order.aid,receiver,phone,postcode,province,city,county,address,title,property,price,count,product_pic,status from ego_family,ego_product,ego_user_address,ego_user_order_details,ego_user_order where ego_user_order_details.pid = ego_product.pid and ego_user_order.aid=ego_user_address.aid and ego_product.fid=ego_family.fid and ego_user_order.oid=? and ego_user_order.oid=ego_user_order_details.oid'
    pool.query(sql, [oid], function (err, result) {
        if (err) throw err
        //查询到的数据发送给客户端
        if (result.length > 0) {
            res.json({
                "code": 200,
                "data": result
            })
        }
        else {
            res.json({})
        }
    })
})
/**
 * 15.更新订单状态
 */
server.get('/order/item/update', function (req, res) {
    let oid = req.query.oid
    if (!oid) {
        res.json({})  //把JS数据转换为JSON格式字符串，并发送给客户端
        return
    }
    //订单更新状态只可能逐渐加1    0付款--1发货--2收货
    let sql = 'update ego_user_order set status=status+1 where oid=?'
    pool.query(sql, [oid], function (err, result) {
        if (err) throw err
        res.json({
            "code": 200,
            "msg": "delete succ"
        })
    })
})
/**
 * 16.删除订单
 */
server.get('/order/item/delete', function (req, res) {
    let oid = req.query.oid
    if (!oid) {
        res.json({})  //把JS数据转换为JSON格式字符串，并发送给客户端
        return
    }
    flag = 0
    let sql = 'delete from ego_user_order_details where oid=?'
    pool.query(sql, [oid], function (err, result) {
        if (err) throw err
        let sql2 = 'delete from ego_user_order where oid=?'
        pool.query(sql2, [oid], function (err, result) {
            if (err) throw err
            flag++
            if (flag == 2) {
                res.json({
                    "code": 200,
                    "msg": "delete succ"
                })
            }
        })
        flag++
        if (flag == 2) {
            res.json({
                "code": 200,
                "msg": "delete succ"
            })
        }
    })
})





//lyj


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
    console.log(req.body)
    let nickname = req.body.nickname
    let upassword = req.body.upassword
    let user = req.body.user
    let sql = 'SELECT uid FROM ego_user WHERE nickname = ? AND upassword = ?'
    pool.query(sql, [nickname, upassword], function (err, result) {
        console.log(2222222)
        if (err) throw err
        
        if (result.length > 0) {
            console.log(1111111)
            if (user == 'ordinary') {
                if (nickname != 'root') {
                    console.log(33333)
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
            } else {
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
        if (result.length > 0) {
            pool.query(sql02, [uid], function (err, result) {
                if (err) throw err
                res.json({
                    code: 200,
                    defaultaid: result[0].aid,
                    allAddress: allAddress
                })
            })
        }
        else {
            res.json({
                code: 201
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
server.post('/show_personal', function (req, res) {
    let uid = req.body.uid
    let sql = "SELECT * FROM ego_user WHERE uid = ?"
    pool.query(sql, [uid], function (err, result) {
        if (err) throw err
        res.json({
            code: 200,
            allData: result
        })
    })
})

//实现基本信息的保存更新
server.post('/save_personal', function (req, res) {
    let uid = req.body.uid
    let upassword = req.body.upassword
    let gender = req.body.gender
    let uname = req.body.uname
    console.log(uid)
    console.log(upassword)
    sql = "UPDATE ego_user SET upassword = ?,gender = ?,uname = ? WHERE uid = ?"
    pool.query(sql, [upassword, gender, uname, uid], function (err, result) {
        if (err) throw err
        res.json({
            code: 200,
            msg: 'update succ'
        })
    })
})



/******************************************************************************************/
/***************************************后台API********************************************/
/******************************************************************************************/

/**
 * API 1.1.1、获取大类表数据
 */
server.get('/egoAdmin/ego_aspect', function(req, res){
    let sql = "SELECT * FROM ego_aspect"
    pool.query(sql, function(err,result){
        if(err)
            throw err
        console.log("ego_aspect查询成功！"+new Date())
        res.json(result)
    })
})

/**
 * API 1.1.2、修改大类表数据
 */
server.get('/egoAdmin/ego_aspect/updateData', function(req, res){
    let name = req.query.name
    let aspectid = req.query.aspectid
    returnMsg = {code:200, msg:"数据更新成功！"}
    let sql = "UPDATE ego.ego_aspect SET name=? WHERE aspectid=?"
    pool.query(sql, [name,aspectid], function(err,result){
        if(err){
            throw err
        }
        else{
            if(result.affectedRows != 0){
                res.json(returnMsg)
            }
            else{
                res.json({code:400, msg:"数据修改失败！"})
            }
        }
    })
})

/**
 * API 1.1.3、新增大类表数据
 */
server.post('/egoAdmin/ego_aspect/addData', function(req, res){
    let name = req.body.name
    let sql = "INSERT INTO ego.ego_aspect VALUES(null,?)"
    pool.query(sql, [name], function(err,result){
        if(err){
            throw err
        }
        else{
            if(result.affectedRows != 0){
                res.json({code:200, msg:"数据插入成功！"})
            }
            else{
                res.json({code:400, msg:"数据插入失败！"})
            }
        }
    })
})

/**
 * API 1.2.1、获取商品类别表数据
 */
server.get('/egoAdmin/ego_family', function(req, res){
    let sql = "SELECT * FROM ego_family"
    pool.query(sql, function(err,result){
        if(err)
            throw err
        console.log("ego_family查询成功！"+new Date())
        res.json(result)
    })
})

/**
 * API 1.2.2、修改商品类别表数据
 */
server.post('/egoAdmin/ego_family/updateData', function(req, res){
    let sql = "UPDATE ego.ego_family SET title=?, subtitle=?, sold_count=?, detail_text=?, product_pic=?, detail_pic=? WHERE fid=?"
    pool.query(sql, [req.body.title, req.body.subtitle, req.body.sold_count, req.body.detail_text, req.body.product_pic, req.body.detail_pic, req.body.fid], function(err, result){
        if(err){
            res.json({code: 400, msg:"数据修改失败"})
            throw err
        }
        //向客户端输出响应消息
        res.json({code:200, msg:"数据修改成功！"})
    })
})

/**
 * API 1.2.3、删除商品类别表数据
 */
server.get('/egoAdmin/ego_family/deleteData', function(req, res){
    console.log(req.query)
    let fid = req.query.fid;
    returnMsg = {}
    //执行数据库操作——DELETE
    let sql = `SET FOREIGN_KEY_CHECKS=0;
    DELETE FROM ego.ego_family WHERE fid=?;
    DELETE FROM ego.ego_product WHERE fid=?;
    DELETE FROM ego.ego_product_comment WHERE fid=?;`
    pool.getConnection(function (err, connection) {    
        connection.query(sql, [fid,fid,fid], function (err, result) {
            if (err){
                throw err
            }
            else{
                console.log("result1 is", result[1])
                if(result[1].affectedRows==0){
                    returnMsg.ego_family_affetctedRows = 0
                }
                else{
                    returnMsg.ego_family_affetctedRows = result[1].affectedRows
                }
                console.log("result2 is", result[2])
                if(result[2].affectedRows==0){
                    returnMsg.ego_product_affetctedRows = 0
                }
                else{
                    returnMsg.ego_product_affetctedRows = result[2].affectedRows
                }
                console.log("result3 is", result[3])
                if(result[3].affectedRows==0){
                    returnMsg.ego_product_comment_affetctedRows = 0
                }
                else{
                    returnMsg.ego_product_comment_affetctedRows = result[3].affectedRows
                }
                console.log(returnMsg)
            }
            res.json(returnMsg)
        })
        connection.release();//释放链接
    })
})

/**
 * API 1.2.4、新增商品类别表数据
 */
server.post('/egoAdmin/ego_family/addData', function(req, res){
    console.log(req.body)
    let aspectid = req.body.aspectid
    let title = req.body.title
    let subtitle = req.body.subtitle
    let sold_count = req.body.sold_count
    let detail_text = req.body.sold_count
    let product_pic = req.body.product_pic
    let detail_pic = req.body.detail_pic
    let sql = "INSERT INTO ego.ego_family VALUES(null, ?,?,?,?,?,?,?)"
    pool.query(sql, [aspectid, title, subtitle, sold_count, detail_text, product_pic, detail_pic], function(err, result){
        if(err){
            res.json({code: 400, msg: "数据插入失败！"})
            throw err
        }
        else{
            res.json({code:200, msg: "数据插入成功！"})
        }
    })
})

/**
 * API 1.3.1、获取商品表数据
 */
server.get('/egoAdmin/ego_product', function(req, res){
    let sql = "SELECT * FROM ego_product"
    pool.query(sql, function(err,result){
        if(err)
            throw err
        console.log("ego_product查询成功！"+new Date())
        res.json(result)
    })
})

/**
 * API 1.3.2、修改商品表数据
 */
server.post('/egoAdmin/ego_product/updateData', function(req, res){
    returnMsg = {code:200, msg:"数据更新成功！"}
    let sql = "UPDATE ego.ego_product SET price=?, property=?, storage=? WHERE pid=?"
    pool.query(sql, [req.body.price, req.body.property, req.body.storage, req.body.pid], function(err, result){
        if(err){
            res.json({code:400, msg:"数据更新失败！"})
            throw err
        }
        //向客户端输出响应消息
        res.json(returnMsg)
    })
})

/**
 * API 1.3.3、删除商品表数据 
 */
server.get('/egoAdmin/ego_product/deleteData', function(req, res){
    console.log(req.query)
    let pid = req.query.pid;
    //执行数据库操作——DELETE
    let sql = "DELETE FROM ego.ego_product WHERE pid=?"
    pool.getConnection(function (err, connection) {    
        connection.query(sql, [pid], function (err, result) {
            if (err){
                throw err
            }
            else{
                console.log("result is", result)
                if(result.affectedRows==0){
                    res.json({code:400, msg:"删除失败！要删除的数据项不存在"})
                }
                else{
                    res.json({code:200, msg:"删除成功！", ego_product_affetctedRows: result.affectedRows})
                }
            }
        })
        connection.release();//释放链接
    })
})

/**
 * API 1.3.4、新增商品表数据
 */
server.post('/egoAdmin/ego_product/addData', function(req, res){
    let fid = req.body.fid
    let price = req.body.price
    let property = req.body.property
    let storage = req.body.storage
    let sql = "INSERT INTO ego.ego_product VALUES(null,?,?,?,?)"
    pool.query(sql, [fid, price, property, storage], function(err, result){
        if(err){
            res.json({code:400, msg:"数据插入失败！"})
            throw err
        }
        //向客户端输出响应消息
        res.json({code: 200, msg:"数据插入成功！"})
    })
})

/**
 * API 1.4.1、获取商品评价表数据
 */
server.get('/egoAdmin/ego_product_comment', function(req, res){
    let sql = "SELECT * FROM ego_product_comment"
    pool.query(sql, function(err,result){
        if(err)
            throw err
        console.log("ego_product_comment查询成功！"+new Date())
        res.json(result)
    })
})

/**
 * API 1.4.2、修改商品评价表数据
 */
server.post('/egoAdmin/ego_product_comment/updateData', function(req, res){
    let comment = req.body.comment
    let time = req.body.time 
    returnMsg = {code:200, msg:"数据更新成功！"}
    let sql = "UPDATE ego.ego_product_comment SET comment=? WHERE time=?"
    pool.query(sql, [comment, time], function(err, result){
        if(err){
            res.json({code:400, msg:"数据更新失败！"})
            throw err
        }
        //向客户端输出响应消息
        res.json(returnMsg)
    })
})

/**
 * API 1.4.3、删除商品评价表数据 
 */
server.get('/egoAdmin/ego_product_comment/deleteData', function(req, res){
    let time = req.query.time;
    //执行数据库操作——DELETE
    let sql = "DELETE FROM ego.ego_product_comment WHERE time=?"
    pool.getConnection(function (err, connection) {    
        connection.query(sql, [time], function (err, result) {
            if (err){
                throw err
            }
            else{
                if(result.affectedRows==0){
                    res.json({code:400, msg:"删除失败！要删除的数据项不存在"})
                }
                else{
                    res.json({code:200, msg:"删除成功！", ego_product_comment_affetctedRows: result.affectedRows})
                }
            }
        })
        connection.release();//释放链接
    })
})

/**
 * API 2.1.1、获取用户表数据
 */
server.get('/egoAdmin/ego_user', function(req, res){
    let sql = "SELECT * FROM ego_user"
    pool.query(sql, function(err,result){
        if(err)
            throw err
        console.log("ego_user查询成功！"+new Date())
        res.json(result)
    })
})

/**
 * API 2.1.2、修改用户表数据
 */
server.post('/egoAdmin/ego_user/updateData', function(req, res){
    let uid = req.body.uid
    let nickname = req.body.nickname
    let upassword = req.body.upassword
    let time = req.body.time
    let email = req.body.email
    let phone = req.body.phone
    let uname = req.body.uname
    let gender = req.body.gender 
    let sql = "UPDATE ego.ego_user SET nickname=?, upassword=?, time=?, email=?, phone=?, uname=?, gender=? WHERE uid=?"
    pool.query(sql, [nickname, upassword, time, email, phone, uname, gender, uid], function(err, result){
        if(err){
            res.json({code:400, msg:"数据更新失败！"})
            throw err
        }
        //向客户端输出响应消息
        res.json({code:200, msg:"数据更新成功！"})
    })
})

/**
 * API 2.1.3、删除用户表数据 
 */
server.get('/egoAdmin/ego_user/deleteData', function(req, res){
    let uid = req.query.uid
    //执行数据库操作——DELETE
    let sql = "DELETE FROM ego.ego_user WHERE uid=?"
    pool.getConnection(function (err, connection) {    
        connection.query(sql, [uid], function (err, result) {
            if (err){
                throw err
            }
            else{
                if(result.affectedRows==0){
                    res.json({code:400, msg:"删除失败！要删除的数据项不存在"})
                }
                else{
                    res.json({code:200, msg:"删除成功！"})
                }
            }
        })
        connection.release();//释放链接
    })
})

/**
 * API 2.2.1、获取收货地址表数据
 */
server.get('/egoAdmin/ego_user_address', function(req, res){
    let sql = "SELECT * FROM ego_user_address"
    pool.query(sql, function(err,result){
        if(err)
            throw err
        console.log("ego_user_address查询成功！"+new Date())
        res.json(result)
    })
})

/**
 * API 2.2.2、修改收货地址表数据
 */
server.post('/egoAdmin/ego_user_address/updateData', function(req, res){
    let aid = req.body.aid
    let receiver = req.body.receiver
    let phone = req.body.phone
    let province = req.body.province
    let city = req.body.province
    let county = req.body.county
    let address = req.body.address
    let postcode = req.body.postcode
    let is_default = req.body.is_default
    let sql = "UPDATE ego.ego_user_address SET receiver=?, phone=?, province=?, city=?, county=?, address=?, postcode=?, is_default=? WHERE aid=?"
    pool.query(sql, [receiver, phone, province, city, county, address, postcode, is_default, aid], function(err, result){
        if(err){
            res.json({code:400, msg:"数据更新失败！"})
            throw err
        }
        //向客户端输出响应消息
        res.json({code:200, msg:"数据更新成功！"})
    })
})

/**
 * API 2.2.3、删除收货地址表数据 
 */
server.get('/egoAdmin/ego_user_address/deleteData', function(req, res){
    let aid = req.query.aid
    //执行数据库操作——DELETE
    let sql = "DELETE FROM ego.ego_user_address WHERE aid=?"
    pool.getConnection(function (err, connection) {    
        connection.query(sql, [aid], function (err, result) {
            if (err){
                throw err
            }
            else{
                if(result.affectedRows==0){
                    res.json({code:400, msg:"删除失败！要删除的数据项不存在"})
                }
                else{
                    res.json({code:200, msg:"删除成功！"})
                }
            }
        })
        connection.release();//释放链接
    })
})

/**
 * API 2.3.1、获取用户购物车表数据(这个要按用户整合成一个用户的所有)
 */
server.get('/egoAdmin/ego_user_shopping_cart', function(req, res){
    let sql = "SELECT * FROM ego_user_shopping_cart"
    pool.query(sql, function(err,result){
        if(err)
            throw err
        console.log("ego_user_shopping_cart查询成功！"+new Date())
        res.json(result)
    })
})

/**
 * API 2.3.2、修改用户购物车表数据
 */
server.post('/egoAdmin/ego_user_shopping_cart/updateData', function(req, res){
    let cid = req.body.cid
    let pid = req.body.pid
    let count = req.body.count
    let sql = "UPDATE ego.ego_user_shopping_cart SET pid=?,count=? WHERE cid=?"
    pool.getConnection(function (err, connection) {    
        connection.query(sql, [pid, count, cid], function (err, result) {
            if (err){
                throw err
            }
            else{
                if(result.affectedRows==0){
                    res.json({code:400, msg:"修改失败！"})
                }
                else{
                    res.json({code:200, msg:"修改成功！"})
                }
            }
        })
        connection.release();//释放链接
    })
})

/**
 * API 2.3.3、删除用户购物车表数据 
 */
server.get('/egoAdmin/ego_user_shopping_cart/deleteData', function(req, res){
    let cid = req.query.cid
    //执行数据库操作——DELETE
    let sql = "DELETE FROM ego.ego_user_shopping_cart WHERE cid=?"
    pool.getConnection(function (err, connection) {    
        connection.query(sql, [cid], function (err, result) {
            if (err){
                throw err
            }
            else{
                if(result.affectedRows==0){
                    res.json({code:400, msg:"删除失败！要删除的数据项不存在"})
                }
                else{
                    res.json({code:200, msg:"删除成功！"})
                }
            }
        })
        connection.release();//释放链接
    })
})

/**
 * API 2.4.1、获取用户订单表数据
 */
server.get('/egoAdmin/ego_user_order', function(req, res){
    let sql = "SELECT * FROM ego_user_order"
    pool.query(sql, function(err,result){
        if(err)
            throw err
        console.log("ego_user_order查询成功！"+new Date())
        res.json(result)
    })
})

/**
 * API 2.4.2、修改用户订单表数据
 */
server.post('/egoAdmin/ego_user_order/updateData', function(req, res){
    let oid = req.body.oid
    let status = req.body.status
    let sql = "UPDATE ego.ego_user_order SET status=? WHERE oid=?"
    pool.getConnection(function (err, connection) {    
        connection.query(sql, [status, oid], function (err, result) {
            if (err){
                throw err
            }
            else{
                if(result.affectedRows==0){
                    res.json({code:400, msg:"修改失败！"})
                }
                else{
                    res.json({code:200, msg:"修改成功！"})
                }
            }
        })
        connection.release();//释放链接
    })
})

/**
 * API 2.4.3、删除用户购物车表数据 
 */
server.get('/egoAdmin/ego_user_order/deleteData', function(req, res){
    let oid = req.query.oid
    //执行数据库操作——DELETE
    let sql = "DELETE FROM ego.ego_user_order WHERE oid=?"
    pool.getConnection(function (err, connection) {    
        connection.query(sql, [oid], function (err, result) {
            if (err){
                throw err
            }
            else{
                if(result.affectedRows==0){
                    res.json({code:400, msg:"删除失败！要删除的数据项不存在"})
                }
                else{
                    res.json({code:200, msg:"删除成功！"})
                }
            }
        })
        connection.release();//释放链接
    })
})

/**
 * API 2.5.1、获取用户订单详情表数据
 */
server.get('/egoAdmin/ego_user_order_details', function(req, res){
    let sql = "SELECT * FROM ego_user_order_details"
    pool.query(sql, function(err,result){
        if(err)
            throw err
        console.log("ego_user_order_details查询成功！"+new Date())
        res.json(result)
    })
})

/**
 * API 2.5.2、修改用户订单详情表数据
 */
server.post('/egoAdmin/ego_user_order_details/updateData', function(req, res){
    let did = req.body.did
    let count = req.body.count
    let sql = "UPDATE ego.ego_user_order_details SET count=? WHERE did=?"
    pool.getConnection(function (err, connection) {    
        connection.query(sql, [count, did], function (err, result) {
            if (err){
                throw err
            }
            else{
                if(result.affectedRows==0){
                    res.json({code:400, msg:"修改失败！"})
                }
                else{
                    res.json({code:200, msg:"修改成功！"})
                }
            }
        })
        connection.release();//释放链接
    })
})

/**
 * API 2.5.3、删除用户订单详情表数据 
 */
server.get('/egoAdmin/ego_user_order_details/deleteData', function(req, res){
    let did = req.query.did
    //执行数据库操作——DELETE
    let sql = "DELETE FROM ego.ego_user_order_details WHERE did=?"
    pool.getConnection(function (err, connection) {    
        connection.query(sql, [did], function (err, result) {
            if (err){
                throw err
            }
            else{
                if(result.affectedRows==0){
                    res.json({code:400, msg:"删除失败！要删除的数据项不存在"})
                }
                else{
                    res.json({code:200, msg:"删除成功！"})
                }
            }
        })
        connection.release();//释放链接
    })
})