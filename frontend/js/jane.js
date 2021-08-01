/******************************************** */
/*****************购物车页面****************** */
/******************************************** */
// ajax查询购物车信息
function getCartInfo(){

    let uid=window.sessionStorage.getItem("uid")

    //异步提交用户的输入给后台API,获取购物车所有信息
    $.ajax({
        method:'GET',
        url:'http://127.0.0.1:5050/cart/item/list',
        data:`uid=${uid}`,
        success:function(data,msg,xhr){
            if(data.code==200){
                console.log(data.data)
                let items = data.data
                str = ''
                for(var i=0;i<items.length;i++){
                    // 添加隐藏pid
                    str = str+`<span class="hide" name="pid">${items[i].pid}</span>`
                    // 选择框
                    str = str+`<div name="cartItem" class="wow bounceInUp text-center" style="border-radius: 10px; background-color: white; overflow: hidden; margin-bottom: 10px;padding: 15px;">
                    <div class="col-md-1 col-xs-2">
                    <input type="checkbox" name="selector" onclick="selectNum()"></div>`
                    // 图片
                    str = str+`<div class="col-md-7 col-xs-10">
                    <div class="col-md-3 col-xs-5">
                        <img class="img-responsive" src=".${items[i].product_pic.split(',')[0]}">
                    </div>`
                    // 标题和属性
                    str = str+`<div class="col-md-9 col-xs-7">
                    <div class="text-clamp text-left">
                        <b>${items[i].title}</b>
                    </div>
                    <div class="text-muted text-left" style="padding: 5px;">${items[i].property}</div>
                        </div>
                    </div>`
                    // 数量、价格、删除
                    str = str+`<div class="col-md-1 col-xs-4" style="padding-top: 20px;">
                    <input min="1" type="number" name="count" value="${items[i].count}" style="width: 100%; text-align: center;border-radius: 5px;" oninput="updateTotal()">
                    </div>
                    <div class="col-md-2 col-xs-4" style="padding: 20px;">￥<span name="price">${items[i].price}</span></div>
                    <div class="col-md-1 col-xs-4" style="padding: 20px;">
                        <a href="#" onclick="preDelete(${i},${items[i].cid},${items[i].uid})"><span class="glyphicon glyphicon-remove"></span></a>
                    </div>`
                    str = str+`</div>
                    <div class="clearfix"></div>`
                }
                $('#cartInfo').html(str)
            }
        },
        error:function(xhr,err){
            console.log("fail")
        }
    })
}
//监听选择框
function selectAll(){
    let selectors = document.getElementsByName('selector')

    if(selectors[0].checked==true){
        for(var i=1;i<selectors.length;i++){
            selectors[i].checked=true
        }
        $('#selectNum').html(selectors.length-1)
    }
    else{
        for(var i=1;i<selectors.length;i++){
            selectors[i].checked=false
        }
        $('#selectNum').html(0)
    }
    
    updateTotal()
}
function selectNum(){
    let selectors = document.getElementsByName('selector')
    let select = 0
    //是否全选
    for(var i=1;i<selectors.length;i++){
        if(selectors[i].checked==true){
            select++
        }
    }
    //全选，所有都打勾
    if(select==selectors.length-1){
        selectors[0].checked=true
    }
    else{
        selectors[0].checked=false
    }
    $('#selectNum').html(select)
    updateTotal()
}
//更新总价格
function updateTotal(){
    let selectors = document.getElementsByName('selector')
    let counts = document.getElementsByName('count')
    let prices = document.getElementsByName('price')
    let total = 0;

    for(var i=1;i<selectors.length;i++){
        if(selectors[i].checked==true){
            total=total-(-(counts[i-1].value*prices[i-1].innerText))
        }
    }
    total=total.toFixed(2)
    $('#totalPrice').html(total)
}
// 数据预处理
function preDelete(id,cid,uid){
    //设置id，cid，uid
    $('#id').html(id)
    $('#cid').html(cid)
    $('#uid').html(uid)

    $('#myModal').modal('show')
}
// ajax请求删除数据
function deleteCart(){
    //从一个地方获取id，cid，uid
    var id = $('#id').text()
    var cid = $('#cid').text()
    var uid = $('#uid').text()
    let items = document.getElementsByName('cartItem')
    console.log(id,cid,uid,items)
    $.ajax({
        method:'GET',
        url:'http://127.0.0.1:5050/cart/item/delete',
        data:`cid=${cid}`,
        success:function(data,msg,xhr){
            if(data.code==200){
                console.log(data.msg)
                $(items[id]).animate({marginLeft:"300px"},300).fadeOut("fast")
                
                //假装更新了价格
                document.getElementsByName('price')[id].innerText=0
                updateTotal()

                getCartInfo()
            }
        },
        error:function(xhr,err){
            console.log("fail")
        }
    })
    
}
// 获取必要参数，跳转页面
function getPreOrderParam(){
    console.log('跳转')
    let uid=window.sessionStorage.getItem("uid")
    let selectors = document.getElementsByName('selector')
    let pids = document.getElementsByName('pid')
    let counts = document.getElementsByName('count')
    var pid = ""
    var count = ""
    //0为全选框
    console.log(selectors,pids,counts)
    for(var i=1;i<selectors.length;i++){
        if(selectors[i].checked==true){
            pid=pid+pids[i-1].innerText+','
            count=count+counts[i-1].value+','
        }
    }
    pid = pid.substr(0,pid.length-1)
    count = count.substr(0,count.length-1)
    // console.log(pid,count)
    window.location = './pre_order.html?uid='+uid+'&pids='+pid+'&counts='+count 
}
/******************************************** */
/******************************************** */
/******************************************** */
// 显示地址和订单内容
function getPreOrder(){
    //uid & pids & counts
    params = window.location.search.split('&')
    uid = params[0].split('=')[1]
    pids = params[1].split('=')[1]
    counts = params[2].split('=')[1]
    count = counts.split(',')
    console.log(uid,pids,counts)
    //要删除购物车中的信息
    //获取地址信息
    $.ajax({
        method:'GET',
        url:'http://127.0.0.1:5050/user/address',
        data:`uid=${uid}`,
        success:function(data,msg,xhr){
            if(data.code==200){
                console.log(data.data)
                items = data.data
                str=''
                addressCss=['','choose']
                for(var i=0;i<items.length;i++){
                    if(items[i].is_default==1){
                        $('#aid').html(items[i].aid)
                    }
                    str=str+`<div class="nochoose ${addressCss[items[i].is_default]} col-xs-12" name="address">
                    <a href="#" onclick="chooseAddress(this,${items[i].aid})">
                    <div class="col-xs-3" style="padding: 5px;"><b>${items[i].receiver}</b></div>
                    <div class="col-xs-9" style="padding: 5px;">${items[i].phone}</div>
                    <div class="col-xs-3" style="padding: 5px;">${items[i].province}</div>
                    <div class="col-xs-3" style="padding: 5px;">${items[i].city}</div>
                    <div class="col-xs-3" style="padding: 5px;">${items[i].county}</div>
                    <div class="col-xs-12" style="padding: 5px;">${items[i].address}</div>
                    </a>
                    </div>`
                }
                str=str+`<div class="col-xs-1"></div>
                <a href="/ego_shop_address.html"><div class="text-center col-xs-10" style="background-color: tomato; color: white; padding: 5px; margin-top:15px; border-radius: 10px; font-size: large;">添加新地址</div></a>`
                
                $('#addressInfo').html(str)
            }
            
        },
        error:function(xhr,err){
            console.log("fail")
        }
    })
    //获取商品信息
    $.ajax({
        method:'GET',
        url:'http://127.0.0.1:5050/order/item/prepare',
        data:`uid=${uid}&pids=${pids}`,
        success:function(data,msg,xhr){
            if(data.code==200){
                console.log(data.data)
                items = data.data
                
                str=''
                var total=0
                for(var i=0;i<items.length;i++){
                    total = total+items[i].price*count[i]
                    // 添加隐藏pid
                    str = str+`<span class="hide" name="pid">${items[i].pid}</span>`
                    str = str+`<div name="cartItem" class="wow bounceInUp text-center" style="border-radius: 10px; background-color: white; overflow: hidden; margin-bottom: 10px;padding: 15px;">`
                    // 图片
                    str = str+`<div class="col-md-8 col-xs-10">
                    <div class="col-md-3 col-xs-5">
                        <img class="img-responsive" src=".${items[i].product_pic.split(',')[0]}">
                    </div>`
                    // 标题和属性
                    str = str+`<div class="col-md-9 col-xs-7">
                    <div class="text-clamp text-left">
                        <b>${items[i].title}</b>
                    </div>
                    <div class="text-muted text-left" style="padding: 5px;">${items[i].property}</div>
                        </div>
                    </div>`
                    // 数量、价格
                    str = str+`<div class="col-md-2 col-xs-6" style="padding-top: 20px;"><span class="hidden-md">x</span><span name="count">${count[i]}</span></div>
                    <div class="col-md-2 col-xs-6" style="padding: 20px;">￥<span name="price">${items[i].price}</span></div>`
                    str = str+`</div>
                    <div class="clearfix"></div>`
                }
                total = total.toFixed(2)

                $('#preOrderInfo').html(str)
                $('#totalPrice').html(total)
            }
            
        },
        error:function(xhr,err){
            console.log("fail")
        }
    })
}
// 切换地址时样式改变
function chooseAddress(obj,aid){
    let adds = document.getElementsByName('address')
    for(var i=0;i<adds.length;i++){
        $(adds[i]).removeClass('choose')
    }
    // console.log(obj.parentNode)
    $(obj.parentNode).addClass('choose')
    $('#aid').html(aid)
}
// 获取生成订单的要素，通过ajax创建新订单，跳转页面
function getOrderParam(){
    console.log(window.location)
    //获取uid，aid
    var uid=window.sessionStorage.getItem("uid")
    var aid = $('#aid').text()
    //获取pids
    let pid = document.getElementsByName('pid')
    let pids = ""
    for(var i=0;i<pid.length;i++){
        pids=pids+pid[i].innerText+','
    }
    pids = pids.substr(0,pids.length-1)
    //获取counts
    let count = document.getElementsByName('count')
    let counts = ""
    for(var i=0;i<count.length;i++){
        counts=counts+count[i].innerText+','
    }
    counts = counts.substr(0,counts.length-1)
    console.log(aid,pids,counts)
    //创建订单
    $.ajax({
        method:'GET',
        url:'http://127.0.0.1:5050/order/item/create',
        data:`uid=${uid}&aid=${aid}&pids=${pids}&counts=${counts}`,
        success:function(data,msg,xhr){
            if(data.code==200){
                console.log(data.msg)
                // 删除购物车对应信息
                pp=pids.split(',')
                for(var p=0;p<pp.length;p++){
                    $.ajax({
                        method:'GET',
                        url:'http://127.0.0.1:5050/cart/item/delete',
                        data:`uid=${uid}&pid=${pp[p]}`,
                        success:function(data,msg,xhr){
                            if(data.code==200){
                                console.log(data.msg)
                            }
                        },
                        error:function(xhr,err){
                            console.log("fail")
                        }
                    })
                }
                //跳转到订单页面
                window.location = `./order.html?uid=${uid}`
            }
        },
        error:function(xhr,err){
            console.log("fail")
        }
    })
}
/******************************************** */
/******************************************** */
/******************************************** */
// 载入时启用
function getOrder(){
    //
    params = window.location.search
    uid = params.split('=')[1]
    
    $.ajax({
        method:'GET',
        url:'http://127.0.0.1:5050/order/item/list',
        data:`uid=${uid}`,
        success:function(data,msg,xhr){
            if(data.code==200){
                items = data.data
                console.log(data.data)
                str=''
                let status = new Array("立即付款","催ta发货","确认收货","已完成")
                for(var i=0;i<items.length;i++){
                    first_img = '.'+items[i].product_pic.split(',')[0]
                    // console.log(first_img)
                    if(i==0){
                        str=str+`<div class="panel panel-info"><div class="panel-heading"><div class="col-xs-3 hidden-xs">订单编号:${items[i].oid}</div><div class="col-xs-3 hidden-xs">下单时间:`+timestampToTime(items[i].order_time)+`</div><div class="col-sm-3 col-xs-4"><a href="#" onclick="getDetailParam(${items[i].oid})">订单详情</a></div><div class="text-right"><button class="btn btn-danger" onclick="operate(${items[i].oid},${items[i].status})">${status[items[i].status]}</button><button class="btn btn-default" onclick="deleteOrder(${items[i].oid},this)"><span class="glyphicon glyphicon-trash"></span></button></div></div>`
                    }
                    else if(items[i].oid!=items[i-1].oid){
                        str=str+`</div><div class="panel panel-info"><div class="panel-heading"><div class="col-xs-3 hidden-xs">订单编号:${items[i].oid}</div><div class="col-xs-3 hidden-xs">下单时间:`+timestampToTime(items[i].order_time)+`</div><div class="col-sm-3 col-xs-4"><a href="#" onclick="getDetailParam(${items[i].oid})">订单详情</a></div><div class="text-right"><button class="btn btn-danger" onclick="operate(${items[i].oid},${items[i].status})">${status[items[i].status]}</button><button class="btn btn-default" onclick="deleteOrder(${items[i].oid},this)"><span class="glyphicon glyphicon-trash"></span></button></div></div>`
                    }
                    str=str+'<div class="panel-body">'
                    //图片
                    str=str+`<div class="col-md-2 col-sm-3 col-xs-3"><img class="img-responsive" src="${first_img}"></div>`
                    //标题和属性
                    str=str+`<div class="col-md-5 col-sm-6 col-xs-6"><div class="text-clamp"><b>${items[i].title}</b></div><div class="text-clamp text-muted">${items[i].property}</div class="text-clamp"></div>`
                    //价格
                    str=str+`<div class="col-md-2 col-sm-2 col-xs-3">￥${items[i].price}</div>`
                    //数量
                    str=str+`<div class="col-md-2 col-sm-1 col-xs-3">&nbsp;x${items[i].count}</div>`
                    str=str+'</div>'
                    if(i!=items.length-1&&items[i].oid==items[i+1].oid){
                        str=str+'<hr>'
                    }
                }
                $('#myOrder').html(str)
            }
            
        },
        error:function(xhr,err){
            console.log("fail")
        }
    })
}
// 查看特定类型订单
function changeStatus(obj){
    $('.list-group-item').removeClass('active')
    let uid=window.sessionStorage.getItem("uid")
    obj.classList.add('active')
    status=-1
    if(obj.innerText=="待付款"){
        status=0
    }
    else if(obj.innerText=="待发货"){
        status=1
    }
    else if(obj.innerText=="待收货"){
        status=2
    }
    param=`uid=${uid}`
    if(status!=-1){
        param=param+`&status=${status}`
    }
    console.log(param)
    $.ajax({
        method:'GET',
        url:'http://127.0.0.1:5050/order/item/list',
        // data:`uid=${1}&status=${status}`,
        data: param,
        success:function(data,msg,xhr){
            if(data.code==200){
                items = data.data
                console.log(data.data)
                str=''
                let status = new Array("立即付款","催ta发货","确认收货","已完成")
                for(var i=0;i<items.length;i++){
                    first_img = '.'+items[i].product_pic.split(',')[0]
                    // console.log(first_img)
                    if(i==0){
                        str=str+`<div class="panel panel-info"><div class="panel-heading"><div class="col-xs-3 hidden-xs">订单编号:${items[i].oid}</div><div class="col-xs-3 hidden-xs">下单时间:`+timestampToTime(items[i].order_time)+`</div><div class="col-sm-3 col-xs-4"><a href="#" onclick="getDetailParam(${items[i].oid})">订单详情</a></div><div class="text-right"><button class="btn btn-danger" onclick="operate(${items[i].oid},${items[i].status})">${status[items[i].status]}</button><button class="btn btn-default" onclick="deleteOrder(${items[i].oid},this)"><span class="glyphicon glyphicon-trash"></span></button></div></div>`
                    }
                    else if(items[i].oid!=items[i-1].oid){
                        str=str+`</div><div class="panel panel-info"><div class="panel-heading"><div class="col-xs-3 hidden-xs">订单编号:${items[i].oid}</div><div class="col-xs-3 hidden-xs">下单时间:`+timestampToTime(items[i].order_time)+`</div><div class="col-sm-3 col-xs-4"><a href="#" onclick="getDetailParam(${items[i].oid})">订单详情</a></div><div class="text-right"><button class="btn btn-danger" onclick="operate(${items[i].oid},${items[i].status})">${status[items[i].status]}</button><button class="btn btn-default" onclick="deleteOrder(${items[i].oid},this)"><span class="glyphicon glyphicon-trash"></span></button></div></div>`
                    }
                    str=str+'<div class="panel-body">'
                    //图片
                    str=str+`<div class="col-md-2 col-sm-3 col-xs-3"><img class="img-responsive" src="${first_img}"></div>`
                    //标题和属性
                    str=str+`<div class="col-md-5 col-sm-6 col-xs-6"><div class="text-clamp"><b>${items[i].title}</b></div><div class="text-clamp text-muted">${items[i].property}</div class="text-clamp"></div>`
                    //价格
                    str=str+`<div class="col-md-2 col-sm-2 col-xs-3">￥${items[i].price}</div>`
                    //数量
                    str=str+`<div class="col-md-2 col-sm-1 col-xs-3">&nbsp;x${items[i].count}</div>`
                    str=str+'</div>'
                }
                $('#myOrder').html(str)
            }
            
        },
        error:function(xhr,err){
            console.log("fail")
        }
    })
}
// 更改订单状态
function operate(oid,status){
    console.log(oid,status)
    if(status==3){
        alert('订单已完成')
        return
    }
    //根据当前状态，向上加一级
    $.ajax({
        method:'GET',
        url:'http://127.0.0.1:5050/order/item/update',
        data:`oid=${oid}`,
        success:function(data,msg,xhr){
            if(data.code==200){
                items = data.data
                console.log(data.data)
                alert('操作成功')
                window.location.reload()
            } 
        },
        error:function(xhr,err){
            console.log("fail")
        }
    })
}
// 删除订单
function deleteOrder(oid,obj){
    console.log(oid,obj.parentNode.parentNode.parentNode)

    $.ajax({
        method:'GET',
        url:'http://127.0.0.1:5050/order/item/delete',
        data:`oid=${oid}`,
        success:function(data,msg,xhr){
            if(data.code==200){
                items = data.data
                console.log(data.data)
                let item = obj.parentNode.parentNode.parentNode
                $(item).animate({marginLeft:"300px"},300).fadeOut("fast")
            }  
        },
        error:function(xhr,err){
            console.log("fail")
        }
    })
}
// 获取详情页参数，跳转
function getDetailParam(oid){
    // console.log(obj)
    window.location = './order_detail.html?oid='+oid
}
/******************************************** */
/******************************************** */
/******************************************** */
function showDetail(){
    params = window.location.search
    oid = params.split('=')[1]
    
    $.ajax({
        method:'GET',
        url:'http://127.0.0.1:5050/order/item/detail',
        data:`oid=${oid}`,
        success:function(data,msg,xhr){
            if(data.code==200){
                items = data.data
                console.log(data.data)
                address=''
                str=''
                str3=['待付款','待发货','待收货','已完成']
                bar=[25,50,75,100]
                var total=0
                for(var i=0;i<items.length;i++){
                    if(i==0){
                        address=address+`<div class="col-xs-12" name="address">
                        <a href="#" onclick="chooseAddress(this,${items[i].aid})">
                        <div class="col-xs-3" style="padding: 5px;"><b>${items[i].receiver}</b></div>
                        <div class="col-xs-9" style="padding: 5px;">${items[i].phone}</div>
                        <div class="col-xs-3" style="padding: 5px;">${items[i].province}</div>
                        <div class="col-xs-3" style="padding: 5px;">${items[i].city}</div>
                        <div class="col-xs-3" style="padding: 5px;">${items[i].county}</div>
                        <div class="col-xs-12" style="padding: 5px;">${items[i].address}</div>
                        </a>
                        </div>`
                    }
                    
                    // 商品详情
                    total = total+items[i].price*items[i].count
                    // 添加隐藏pid
                    str = str+`<span class="hide" name="pid">${items[i].pid}</span>`
                    str = str+`<div name="cartItem" class="wow bounceInUp text-center" style="border-radius: 10px; background-color: white; overflow: hidden; margin-bottom: 10px;padding: 15px;">`
                    // 图片
                    str = str+`<div class="col-md-8 col-xs-10">
                    <div class="col-md-3 col-xs-5">
                        <img class="img-responsive" src=".${items[i].product_pic.split(',')[0]}">
                    </div>`
                    // 标题和属性
                    str = str+`<div class="col-md-9 col-xs-7">
                    <div class="text-clamp text-left">
                        <b>${items[i].title}</b>
                    </div>
                    <div class="text-muted text-left" style="padding: 5px;">${items[i].property}</div>
                        </div>
                    </div>`
                    // 数量、价格
                    str = str+`<div class="col-md-2 col-xs-6" style="padding-top: 20px;"><span class="hidden-md">x</span><span name="count">${items[i].count}</span></div>
                    <div class="col-md-2 col-xs-6" style="padding: 20px;">￥<span name="price">${items[i].price}</span></div>`
                    str = str+`</div>
                    <div class="clearfix"></div>`
                }
                total = total.toFixed(2)
                $('.address').html(address)
                $('.orderDetail').html(str)
                
                $('#totalPrice').html(total)
                $('#orderId').html(oid)
                let progress=`<div class="progress-bar progress-bar-success" role="progressbar"aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"style="width: ${bar[items[0].status]}%;"><span>${str3[items[0].status]}</span></div>`
                $('#progressBar').html(progress)
            }
            
        },
        error:function(xhr,err){
            console.log("fail")
        }
    })
}

function timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y+M+D;
}