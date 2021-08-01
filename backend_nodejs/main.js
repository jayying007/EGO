//Node中无需指定package

//导入其他的包
let mysql = require('mysql')

//使用第三方包提供的函数和对象
//创建数据库连接池
let pool = mysql.createPool({
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'',
    database:'ego',
    connectionLimit:10  //连接池大小限制
})

//导入第三方模块：express，创建基于Node.js的Web服务器
let express = require('express')

//调用第三方模块提供的功能
let server = express()

//运行Web服务器监听特定的端口
let port = 5050
server.listen(port, function(req,rsp){
    console.log('服务器启动成功，正在监听端口：',port)
})

/************************************************** */
/********************后台API*********************** */
/************************************************** */

//使用Express提供的中间件：处理POST请求中的主体数据，保存在req.body属性中
//处理application/x-www-form-urlencoded类型的请求数据
server.use(express.urlencoded({
    extended: false //是否使用扩展工具解析请求主体
}))
//自定义中间件：允许指定客户端跨域访问
server.use(function(req,res,next){
    res.set('Access-Control-Allow-Origin','http://127.0.0.1:5500')
    // res.set('Access-Control-Allow-Origin','*')
    next()//放行，让后续的请求处理方法继续处理
})


/**
 * 1.获取用户地址
 */
server.get('/user/address',function(req, res){
    let uid = req.query.uid
    if(!uid){
        res.json({})
        return
    }
    let sql = 'select * from ego_user_address where uid=?'
    pool.query(sql,[uid],function(err,result){
        if(err)throw err
        res.json({
            "code":200,
            "data":result
        })
    })
})
/**
 * 1.添加购物车购买项
 */
server.get('/cart/item/add',function(req, res){
    //读取客户端请求消息传来的参数
    let uid = req.query.uid
    let pid = req.query.pid
    let buyCount = req.query.buyCount
    if(!uid||!pid||!buyCount){
        res.json({})//把JS数据转换为JSON格式字符串，并发送给客户端
        return
    }
    //向数据库查询记录
    let sql = 'select * from ego_user_shopping_cart where uid=? and pid=?'
    pool.query(sql,[uid,pid],function(err,result){
        if(err)throw err
        if(result.length>0){
            //说明已存在该商品，则需要加，无需创建新数据
            let sql2 = 'update ego_user_shopping_cart set count=count+? where uid=? and pid=?'
            pool.query(sql2,[buyCount,uid,pid],function(err,result){
                if(err)throw err
                res.json({
                    "code":200,
                    "msg":"add succ"
                })
            })
        }
        else{
            //不存在该商品，要插入一条新数据
            let sql2 = 'insert into ego_user_shopping_cart values(null,?,?,?);'
            pool.query(sql2,[uid,pid,buyCount],function(err,result){
                if(err)throw err
                res.json({
                    "code":200,
                    "msg":"add succ"
                })
            })
        }
    })
})
/**
 * 2.购物车项列表
 */
server.get('/cart/item/list',function(req,res){
    //读取客户端请求消息传来的请求数据uid
    let uid = req.query.uid
    if(!uid){
        res.json({})  //把JS数据转换为JSON格式字符串，并发送给客户端
        return
    }
    //向数据库查询指定uid的用户记录
    let sql = 'select cid,uid,ego_product.pid,title,property,price,count,product_pic from ego_user_shopping_cart,ego_product,ego_family where ego_user_shopping_cart.uid=? and ego_user_shopping_cart.pid=ego_product.pid and ego_product.fid=ego_family.fid order by ego_product.pid'
    pool.query(sql,[uid],function(err,result){
        if(err)throw err
        res.json({
            "code":200,
            "data":result
        })
    })
})
/**
 * 3.删除购物车项
 */
server.get('/cart/item/delete',function(req,res){
    //读取客户端请求消息传来的请求数据cid
    let cid = req.query.cid
    let uid = req.query.uid
    let pid = req.query.pid
    if((!cid)&&(!uid||!pid)){
        res.json({})  //把JS数据转换为JSON格式字符串，并发送给客户端
        return
    }
    if(cid){
        let sql = 'delete from ego_user_shopping_cart where cid=?'
        pool.query(sql,[cid],function(err,result){
            if(err)throw err
            res.json({
                "code":200,
                "msg":"delete succ"
            })
        })
    }
    else{
        let sql = 'delete from ego_user_shopping_cart where uid=? and pid=?'
        pool.query(sql,[uid,pid],function(err,result){
            if(err)throw err
            res.json({
                "code":200,
                "msg":"delete succ"
            })
        })
    }
    
})
/**
 * 4.修改购物车条目中的购买数量
 */
server.get('/cart/item/updatecount',function(req,res){
    let cid = req.query.cid
    let count = req.query.count
    if(!cid||!count){
        res.json({})  //把JS数据转换为JSON格式字符串，并发送给客户端
        return
    }
    let sql = 'update ego_user_shopping_cart set count=? where cid=?'
    pool.query(sql,[count,cid],function(err,result){
        if(err)throw err
        res.json({
            "code":200,
            "msg":"delete succ"
        })
    })
})
/**
 * 1.预生成的订单
 */
server.get('/order/item/prepare',function(req,res){
    let uid = req.query.uid
    let pids = req.query.pids
    if(!uid||!pids){
        res.json({})  //把JS数据转换为JSON格式字符串，并发送给客户端
        return
    }
    
    pids = pids.replace('"','')
    pids = pids.replace('"','')
    pids = pids.split(',')
    let sql = 'select ego_product.pid,title,property,price,product_pic from ego_product,ego_family where ego_product.fid=ego_family.fid and ('
    for(var i=0;i<pids.length;i++){
        sql = sql+'ego_product.pid=?'
        if(i!=pids.length-1){
            sql=sql+' or '
        }
    }
    // params=[]
    // params[0]=uid
    // for(var i=0;i<pids.length;i++){
    //     params[i+1]=pids[i]
    // }
    sql=sql+')'
    pool.query(sql,pids,function(err,result){
        if(err)throw err
        res.json({
            "code":200,
            "data":result
        })
    })
})
/**
 * 2.创建新订单
 */
server.get('/order/item/create',function(req,res){
    let uid = req.query.uid
    let aid = req.query.aid
    let pids = req.query.pids
    let counts = req.query.counts
    if(!uid||!aid||!pids||!counts){
        res.json({})  //把JS数据转换为JSON格式字符串，并发送给客户端
        return
    }
    pids = pids.replace('"','')
    pids = pids.replace('"','')
    pids = pids.split(',')
    counts = counts.replace('"','')
    counts = counts.replace('"','')
    counts = counts.split(',')
    if(pids.length!=counts.length){//商品数和商品数量不匹配
        res.json({})  
        return
    }
    let flag=0
    let sql = 'insert into ego_user_order values(null,?,?,0,'+(new Date()).getTime()+',null,null,null)'
    pool.query(sql,[uid,aid],function(err,result){
        if(err)throw err
        let oid = result.insertId
        for(var i=0;i<pids.length;i++){
            let sql2 = 'insert into ego_user_order_details values(null,?,?,?)'
            pool.query(sql2,[oid,pids[i],counts[i]],function(err,result){
                if(err)throw err
                flag++
                if(flag==pids.length+1){
                    res.json({
                        "code":200,
                        "msg":"delete succ"
                    })
                }
            })
        }
        flag++
        if(flag==pids.length+1){
            res.json({
                "code":200,
                "msg":"delete succ"
            })
        }
    })
})
/**
 * 3.查看所有订单
 */
server.get('/order/item/list',function(req,res){
    let uid = req.query.uid
    let status = req.query.status
    let sql = 'select order_time,aid,ego_user_order.oid,title,property,price,count,product_pic,status from ego_product,ego_family,ego_user_order,ego_user_order_details where ego_user_order.uid=? and ego_user_order.oid=ego_user_order_details.oid and ego_user_order_details.pid=ego_product.pid and ego_product.fid=ego_family.fid'
    if(!uid){
        res.json({})  //把JS数据转换为JSON格式字符串，并发送给客户端
        return
    }
    if(status){//只要求查询特定状态的订单
        sql = sql+' and status=? order by ego_user_order.oid desc'
        pool.query(sql,[uid,status],function(err,result){
            if(err)throw err
            res.json({
                "code":200,
                "data":result
            })
        })
    }
    else{
        sql = sql +' order by ego_user_order.oid desc'
        pool.query(sql,[uid],function(err,result){
            if(err)throw err
            res.json({
                "code":200,
                "data":result
            })
        })
    }
})
/**
 * 4.订单详情
 */
server.get('/order/item/detail',function(req,res){
    let oid = req.query.oid
    if(!oid){
        res.json({})  //把JS数据转换为JSON格式字符串，并发送给客户端
        return
    }
    let sql = 'select ego_user_order.aid,receiver,phone,postcode,province,city,county,address,title,property,price,count,product_pic,status from ego_family,ego_product,ego_user_address,ego_user_order_details,ego_user_order where ego_user_order_details.pid = ego_product.pid and ego_user_order.aid=ego_user_address.aid and ego_product.fid=ego_family.fid and ego_user_order.oid=? and ego_user_order.oid=ego_user_order_details.oid'
    pool.query(sql,[oid],function(err, result){
        if(err)throw err
        //查询到的数据发送给客户端
        if(result.length>0){
            res.json({
                "code":200,
                "data":result
            })
        }
        else{
            res.json({})
        }
    })
})
/**
 * 5.更新订单状态
 */
server.get('/order/item/update',function(req,res){
    let oid = req.query.oid
    if(!oid){
        res.json({})  //把JS数据转换为JSON格式字符串，并发送给客户端
        return
    }
    //订单更新状态只可能逐渐加1    0付款--1发货--2收货
    let sql = 'update ego_user_order set status=status+1 where oid=?'
    pool.query(sql,[oid],function(err,result){
        if(err)throw err
        res.json({
            "code":200,
            "msg":"delete succ"
        })
    })
})
/**
 * 6.删除订单
 */
server.get('/order/item/delete',function(req,res){
    let oid = req.query.oid
    if(!oid){
        res.json({})  //把JS数据转换为JSON格式字符串，并发送给客户端
        return
    }
    flag=0
    let sql = 'delete from ego_user_order_details where oid=?'
    pool.query(sql,[oid],function(err,result){
        if(err)throw err
        let sql2 = 'delete from ego_user_order where oid=?'
        pool.query(sql2,[oid],function(err,result){
            if(err)throw err
            flag++
            if(flag==2){
                res.json({
                    "code":200,
                    "msg":"delete succ"
                })
            }
        })
        flag++
        if(flag==2){
            res.json({
                "code":200,
                "msg":"delete succ"
            })
        }
    })
})