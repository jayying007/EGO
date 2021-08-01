 //基本信息按钮被点击时
 $('#ego_personal').click(function () {
    window.location.href = 'ego_shop_personal.html'
  })
  //收货地址按钮被点击时
  $('#ego_address').click(function () {
    window.location.href = 'ego_shop_address.html'
  })

  //页面刚显示时
  let uid = window.sessionStorage.getItem('uid')
  $.ajax({
    method: 'POST',
    url: 'http://127.0.0.1:5050/show_personal',
    data: {
      "uid": uid
    },
    dataType: 'json',
    xhrFields: {
      withCredentials: true
    },
    success: function (data, msg, xhr) {
      console.log('异步请求基本信息数据成功', data)
      if (data.code === 200) {
        let nickname = data.allData[0].nickname
        let upassword = data.allData[0].upassword
        let phone = data.allData[0].phone
        let email = data.allData[0].email
        let uname = data.allData[0].uname
        let gender = data.allData[0].gender
        if (gender == 1) {
          $('#male').prop("checked", true)
        } else {
          $('#female').prop("checked", true)
        }
        $('#edit_uname').val(uname)
        $('#disable_edit_nickname').attr('placeholder', `${nickname}`)
        $('#edit_upassword').val(upassword)
        $('#disable_edit_phone').attr('placeholder', `${phone}`)
        $('#disable_edit_email').attr('placeholder', `${email}`)
      }

    },
    error: function (xhr, err) {
      console.log('异步请求地址API失败：')
      console.log(xhr)
      console.log(err)
    }
  })

  //判断密码框的友好交互
  $('#edit_upassword').focus(function () {
    $('#edit_upassword').attr('placeholder', '')
    $('#upasswordTrue').removeClass('has-error')
    $('#upasswordSpan').removeClass('glyphicon-remove')
  })

  $('#edit_repassword').focus(function () {
    $('#edit_repassword').attr('placeholder', '')
    $('#repasswordTrue').removeClass('has-error')
    $('#repasswordSpan').removeClass('glyphicon-remove')
  })


  //保存被点击时（保存新的数据）
  $('#edit_save').click(function () {
    let upassword = $('#edit_upassword').val()
    let repassword = $('#edit_repassword').val()
    //判断密码是否符合标准
    let upasswordReg = /^[a-zA-Z0-9_]{6,20}$/ //密码正则表达式，6到20位（字母，数字，下划线）
    if (!upasswordReg.test(upassword)) {
      $('#edit_upassword').val('')
      $('#edit_upassword').attr('placeholder', '密码格式不正确')
      $('#upasswordTrue').addClass('has-error')
      $('#upasswordSpan').addClass('glyphicon-remove')
      return
    }
    //判断密码是否一致
    if (repassword != upassword) {
      $('#edit_repassword').val('')
      $('#edit_repassword').attr('placeholder', '两次输入的密码不一致')
      $('#repasswordTrue').addClass('has-error')
      $('#repasswordSpan').addClass('glyphicon-remove')
      return
    }

    let gender = $("input[name='gender']:checked").val()
    let uname = $('#edit_uname').val()
    console.log(uname)
    if (gender == 'male') {
      gender = 1
    } else {
      gender = 0
    }
    $.ajax({
      method: 'POST',
      url: 'http://127.0.0.1:5050/save_personal',
      data: {
        "uid": uid,
        "upassword": upassword,
        "uname": uname,
        "gender": gender
      },
      dataType: 'json',
      xhrFields: {
        withCredentials: true
      },
      success: function (data, msg, xhr) {
        console.log('异步请求修改信息数据成功', data)
        if (data.code === 200) {
          $('#changeModal').modal()
        }
      },
      error: function (xhr, err) {
        console.log('异步请求地址API失败：')
        console.log(xhr)
        console.log(err)
      }
    })
  })

  //取消被点击时（重置）
  $('#edit_cancel').click(function(){
    window.location.reload()
  })