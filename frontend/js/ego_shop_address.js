let uid = window.sessionStorage.getItem('uid')
//基本信息按钮被点击时
$('#ego_personal').click(function () {
  window.location.href = 'ego_shop_personal.html'
})
//收货地址按钮被点击时
$('#ego_address').click(function () {
  window.location.href = 'ego_shop_address.html'
})

//新增收货地址被点击时
$('#make_addModal').click(function () {
  $('#addressModal').modal()
})

//添加收货地址的保存被点击时
$('#saveAddress').click(function () {
  let postcodeInput = $('#add_postcode').val()
  let phoneInput = $('#add_phone').val()
  let postcodeReg = /[1-9]\d{5}(?!\d)/ //邮政编码的正则表达式
  let phoneReg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/ //手机号正则表达式
  //验证手机号的正确性

  let receiver = $('#add_receiver').val()
  let province = $('#add_province').val()
  let city = $('#add_city').val()
  let county = $('#add_county').val()
  let address = $('#add_address').val()
  let phone = $('#add_phone').val()
  let postcode = $('#add_postcode').val()

  if (!phoneReg.test(phoneInput)) {
    $('#add_phone').val('')
    $('#add_phone').attr('placeholder', '格式有误')
    $('#phoneTrue').addClass('has-error')
    $('#phoneSpan').addClass('glyphicon-remove')
    return
  }
  //验证postcode的正确性
  if (!postcodeReg.test(postcodeInput)) {
    $('#add_postcode').val('')
    $('#add_postcode').attr('placeholder', '格式有误')
    $('#postcodeTrue').addClass('has-error')
    $('#postcodeSpan').addClass('glyphicon-remove')
    return
  }

  $.ajax({
    method: 'POST',
    url: 'http://127.0.0.1:5050/add_address',
    data: {
      "uid": uid,
      "receiver": receiver,
      "province": province,
      "city": city,
      "county": county,
      "address": address,
      "phone": phone,
      "postcode": postcode
    },
    dataType: 'json',
    xhrFields: {
      withCredentials: true
    },
    success: function (data, msg, xhr) {
      if (data.code === 200) {
        let aid = data.aid
        let newInsert = `<div class="row">
                                  <div class="col-md-9 myaddress" id="whole_${aid}">
                                    <div class="myinner">
                                      <div class="row">
                                        <div class="col-xs-12 col-md-2 col-md-pull-1 myright">收货人:</div>
                                        <div class="col-xs-12 col-md-6 col-md-pull-1 myleft" id="receiver_${aid}">${receiver}</div>
                                      </div>
                                      <div class="row">
                                        <div class="col-xs-12 col-md-2 col-md-pull-1 myright">所在地区:</div>
                                        <div class="col-xs-12 col-md-6 col-md-pull-1 myleft" id="prefecture_${aid}">${province}${city}${county}</div>
                                      </div>
                                      <div class="row">  
                                        <div class="col-xs-12 col-md-2 col-md-pull-1 myright">地址:</div>
                                        <div class="col-xs-12 col-md-6 col-md-pull-1 myleft" id="address_${aid}">${address}</div>
                                      </div>  
                                      <div class="row">  
                                        <div class="col-xs-12 col-md-2 col-md-pull-1 myright">手机:</div>  
                                        <div class="col-xs-12 col-md-6 col-md-pull-1 myleft" id="phone_${aid}">${phone}</div>
                                      </div>  
                                      <div class="row">
                                        <div class="col-xs-12 col-md-2 col-md-pull-1 myright">邮政编码:</div>
                                        <div class="col-xs-12 col-md-6 col-md-pull-1 myleft" id="postcode_${aid}">${postcode}</div>
                                        <div class=" col-md-4">
                                          <button class="btn-mine-edit" onclick="myEdit(${aid})">编辑</button>
                                          <button class="btn-mine-delete" onclick="myDelete(${aid})">删除</button>
                                          <button class="btn-mine-defaultaddress" onclick="mySet(${aid})">设置为默认地址</button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>`
        $('#waitingInsert').append(newInsert)
      }
    },
    error: function (xhr, err) {
      console.log('异步请求地址API失败：')
      console.log(xhr)
      console.log(err)
    }
  })

  //关闭模态框
  $('#addressModal').modal('hide')
})

//邮政编码框被选中时
$('#add_postcode').focus(function () {
  $('#add_postcode').attr('placeholder', '')
  $('#postcodeTrue').removeClass('has-error')
  $('#postcodeSpan').removeClass('glyphicon-remove')
})

//联系电话框被选中时
$('#add_phone').focus(function () {
  $('#add_phone').attr('placeholder', '')
  $('#phoneTrue').removeClass('has-error')
  $('#phoneSpan').removeClass('glyphicon-remove')
})

//编辑邮政编码框被选中时
$('#edit_postcode').focus(function () {
  $('#edit_postcode').attr('placeholder', '')
  $('#EditpostcodeTrue').removeClass('has-error')
  $('#EditpostcodeSpan').removeClass('glyphicon-remove')
})

//编辑联系电话框被选中时
$('#edit_phone').focus(function () {
  $('#edit_phone').attr('placeholder', '')
  $('#EditphoneTrue').removeClass('has-error')
  $('#EditphoneSpan').removeClass('glyphicon-remove')
})


//获取用户的所有地址
$.ajax({
  method: 'POST',
  url: 'http://127.0.0.1:5050/address',
  data: {
    "uid": uid
  },
  dataType: 'json',
  xhrFields: {
    withCredentials: true
  },
  success: function (data, msg, xhr) {
    console.log('异步请求管理地址API成功', data)
    if (data.code === 200) {
      let defaultaid = data.defaultaid
      let count = data.allAddress.length
      for (let i = 0; i < count; i++) {
        let aid = data.allAddress[i].aid
        let insertData = `<div class="row">
                                  <div class="col-md-9 myaddress" id="whole_${aid}">
                                    <div class="myinner">
                                      <div class="row">
                                        <div class="col-xs-12 col-md-2 myfontweight">收货人:</div>
                                        <div class="col-md-6 col-md-pull-1 myleft" id="receiver_${aid}">${data.allAddress[i].receiver}</div>
                                      </div>
                                      <div class="row">
                                        <div class="col-md-2 myfontweight">所在地区:</div>
                                        <div class="col-md-6 col-md-pull-1 myleft" id="prefecture_${aid}">${data.allAddress[i].province}${data.allAddress[i].city}${data.allAddress[i].county}</div>
                                      </div>
                                      <div class="row">  
                                        <div class="col-md-2 myfontweight">地址:</div>
                                        <div class="col-md-6 col-md-pull-1 myleft" id="address_${aid}">${data.allAddress[i].address}</div>
                                      </div>  
                                      <div class="row">  
                                        <div class="col-md-2  myfontweight">手机:</div>  
                                        <div class="col-md-6 col-md-pull-1 myleft" id="phone_${aid}">${data.allAddress[i].phone}</div>
                                      </div>  
                                      <div class="row">
                                        <div class="col-md-2  myfontweight">邮政编码:</div>
                                        <div class="col-md-6 col-md-pull-1 myleft" id="postcode_${aid}">${data.allAddress[i].postcode}</div>
                                        <div class="col-md-4">
                                          <button class="btn-mine-edit" onclick="myEdit(${data.allAddress[i].aid})">编辑</button>
                                          <button class="btn-mine-delete" onclick="myDelete(${data.allAddress[i].aid})">删除</button>
                                          <button class="btn-mine-defaultaddress" onclick="mySet(${data.allAddress[i].aid})">设置为默认地址</button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>`

        $('#waitingInsert').append(insertData)
        if(aid == defaultaid){
          $(`#whole_${aid}`).addClass('defaultADbg')
        }
      }
    }
    else{}
  },
  error: function (xhr, err) {
    console.log('异步请求地址API失败：')
    console.log(xhr)
    console.log(err)
  }
})

//直接写function是为了响应直接onclick，绕过选取不到id或要锁定很多id的麻烦,同时还要往func里面传参数
//编辑收货地址(这个是用来显示的)
function myEdit(aid) {
  $.ajax({
    method: 'POST',
    url: 'http://127.0.0.1:5050/show_edit_address',
    data: {
      "aid": aid
    },
    dataType: 'json',
    xhrFields: {
      withCredentials: true
    },
    success: function (data, msg, xhr) {
      console.log('异步请求模态框数据成功', data)
      if (data.code === 200) {
        let receiver = data.result[0].receiver
        let province = data.result[0].province
        let city = data.result[0].city
        let county = data.result[0].county
        let address = data.result[0].address
        let phone = data.result[0].phone
        let postcode = data.result[0].postcode
        $('#edit_receiver').val(receiver)
        $('#edit_province').val(province)
        $('#edit_city').val(city)
        $('#edit_county').val(county)
        $('#edit_address').val(address)
        $('#edit_phone').val(phone)
        $('#edit_postcode').val(postcode)
        $('#saveEdit').attr('onclick', `saveEdit(${aid})`)
      }
    },
    error: function (xhr, err) {
      console.log('异步请求地址API失败：')
      console.log(xhr)
      console.log(err)
    }
  })
  $('#editModal').modal()
}

//编辑收货地址(这个是用来修改的)
function saveEdit(aid) {
  let receiver = $('#edit_receiver').val()
  let province = $('#edit_province').val()
  let city = $('#edit_city').val()
  let county = $('#edit_county').val()
  let address = $('#edit_address').val()
  let phone = $('#edit_phone').val()
  let postcode = $('#edit_postcode').val()

  let postcodeReg = /[1-9]\d{5}(?!\d)/ //邮政编码的正则表达式
  let phoneReg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/ //手机号正则表达式


  //验证手机号的正确性
  if (!phoneReg.test(phone)) {
    $('#edit_phone').val('')
    $('#edit_phone').attr('placeholder', '格式有误')
    $('#EditphoneTrue').addClass('has-error')
    $('#EditphoneSpan').addClass('glyphicon-remove')
    return
  }
  //验证postcode的正确性
  if (!postcodeReg.test(postcode)) {
    $('#edit_postcode').val('')
    $('#edit_postcode').attr('placeholder', '格式有误')
    $('#EditpostcodeTrue').addClass('has-error')
    $('#EditpostcodeSpan').addClass('glyphicon-remove')
    return
  }

  $.ajax({
    method: 'POST',
    url: 'http://127.0.0.1:5050/edit_address',
    data: {
      "aid": aid,
      "receiver": receiver,
      "province": province,
      "city": city,
      "county": county,
      "address": address,
      "phone": phone,
      "postcode": postcode
    },
    dataType: 'json',
    xhrFields: {
      withCredentials: true
    },
    success: function (data, msg, xhr) {
      console.log('异步请求模态框数据成功', data)
      if (data.code === 200) {
        console.log("编辑成功")
        let prefecture = `${province}${city}${county}`
        let receiverId = `receiver_${aid}`
        let prefectureId = `prefecture_${aid}`
        let addressId = `address_${aid}`
        let phoneId = `phone_${aid}`
        let postcodeId = `postcode_${aid}`
        console.log(receiverId)
        console.log(receiver)
        $(`#${receiverId}`).html(receiver)
        $(`#${prefectureId}`).html(prefecture)
        $(`#${addressId}`).html(address)
        $(`#${phoneId}`).html(phone)
        $(`#${postcodeId}`).html(postcode)
        $('#editModal').modal('hide')
      }

    },
    error: function (xhr, err) {
      console.log('异步请求地址API失败：')
      console.log(xhr)
      console.log(err)
    }
  })
}

//删除收货地址
function myDelete(aid) {
  window.sessionStorage.setItem('Delaid',aid)
  $('#deleteModal').modal()
}

$('#delete_sure').click(function () {
  let aid = window.sessionStorage.getItem('Delaid')
  $.ajax({
    method: 'POST',
    url: 'http://127.0.0.1:5050/delete',
    data: {
      "aid": aid,
    },
    dataType: 'json',
    xhrFields: {
      withCredentials: true
    },
    success: function (data, msg, xhr) {
      console.log('异步请求模态框数据成功', data)
      if (data.code === 200) {
        console.log("删除成功")
        $(`#whole_${aid}`).hide()
        $('#deleteModal').modal('hide')
      }

    },
    error: function (xhr, err) {
      console.log('异步请求地址API失败：')
      console.log(xhr)
      console.log(err)
    }
  })
})


//设置默认地址
function mySet(aid) {
  window.sessionStorage.setItem('Setaid', aid)
  $('#setDefaultModal').modal()
}

$('#setDefault_sure').click(function () {
  let aid = window.sessionStorage.getItem('Setaid')
  let uid = window.sessionStorage.getItem('uid')
  $.ajax({
    method: 'POST',
    url: 'http://127.0.0.1:5050/setDefaultAddress',
    data: {
      "aid": aid,
      "uid": uid
    },
    dataType: 'json',
    xhrFields: {
      withCredentials: true
    },
    success: function (data, msg, xhr) {
      console.log('异步请求设置默认地址成功', data)
      if (data.code === 200) {
        console.log("设置成功")
        $(`#whole_${aid}`).addClass('defaultADbg')
        for(let i = 0; i < data.NotDefaultaid.length; i++){
          $(`#whole_${data.NotDefaultaid[i].aid}`).removeClass('defaultADbg')
        }
      }
      $('#setDefaultModal').modal('hide')
    },
    error: function (xhr, err) {
      console.log('异步请求设置默认地址失败：')
      console.log(xhr)
      console.log(err)
    }
  })
})
