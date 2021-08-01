// 导入其他的包import mysql
let mysql = require('mysql')

// 使用第三方包提供的函数和对象
// 创建数据库连接池
let pool = mysql.createPool({
    host:       '127.0.0.1',
    port:       '3306',
    user:       'root',
    password:   '',
    database:   'ego',
    connectionLimit:  10        //连接池大小限制  
})

// 导入第三方模块：express，创建基于Node.js的web服务器
let express = require('express')

// 调用第三方提供的模块
let server = express()

// 运行web服务器监听特定的端口
let port = 5050
server.listen(port,function(){
    console.log('服务器启动成功，正在监听端口：',port)
})

/**************************************/
/****************后台API***************/
/**************************************/

//处理application/x—www-form-urlencoded类型的请求数据 
server.use(express.urlencoded({
    extended:false //是否是使用扩展工具解析请求主体
}))

// 自定义中间件：允许指定客户端的跨域访问
server.use(function(req,res,next){
    res.set('Access-Control-Allow-Origin','*')//当前服务器允许来自任何客户端的跨域访问
    next() //放行，让后续的请求处理方法继续处理
})


/**
 * 1. 商品家族信息
 */
server.get('/goods_detail',function(req,res){
    console.log(req)
    let fid = req.query.fid
    let output = {
        goods_family:[],
        product:[]
    }
    let loadcount =0   //加loadcount的目的，因为以下多个sql语句是并发进行的，为了确保能够成功并发，因此加上loadcount，并在每个query中进行判断，判断是否结束
    // let output=null
    let sql1 = "select * from ego_family where fid = ?"  //获取family内容
    pool.query(sql1,[fid],function(err,result){
        if(err) throw err
        if(result.length>0){
            output.goods_family=result[0]
        }
        loadcount++
        if(loadcount==2){  //所有的四类数据全部加载完成
            res.json(output)
        }
        
    })

    let sql2 = "select * from ego_product where fid = ?"  //获取family下每个product内容
    //可是这里如何能够一次性获取多个product呢
    pool.query(sql2,[fid],function(err,result){
        if(err) throw err
        if(result.length>0){
            output.product=result
        }
        loadcount++
        if(loadcount==2){  //所有的四类数据全部加载完成
            res.json(output)
        }
    })
})

// 添加商品到购物车
server.get('/addToCart',function(req,res){
    console.log(req)
    let uid = req.query.uid
    // let pid = req.query.pid
    // let num = req.query.num
    let pid=1
    let num=1
    // let output = {
    //     goods_family:[],
    //     product:[]
    // }
    //let loadcount =0   //加loadcount的目的，因为以下多个sql语句是并发进行的，为了确保能够成功并发，因此加上loadcount，并在每个query中进行判断，判断是否结束
    let sql1 = "INSERT INTO ego_user_shopping_cart(cid,uid, pid, count) VALUES (?,?,?,?)"  //获取family内容
    pool.query(sql1,[null,uid,pid,num],function(err,result){
        if(err) throw err
        res.json(1)
    })
})