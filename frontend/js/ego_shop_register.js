    //账号输入栏被选中时
    $('#nickname').focus(function () {
      $('#nicknameJudge').text("")
      //removeClass和addClass应该默认当指定的元素不存在时不会重复执行
      $('#nicknameTrue').removeClass('has-success')
      $('#nicknameSpan').removeClass('glyphicon-ok')
      $('#nicknameTrue').removeClass('has-error')
      $('#nicknameSpan').removeClass('glyphicon-remove')
    })

    //账号输入栏不被选中时
    $('#nickname').blur(function () {
      let nickname = $('#nickname').val() //使用val可以获取输入框的值

      /* 正则表达式 */
      let nicknameReg = /^[a-zA-Z0-9_]{5,16}$/ //账号正则表达式，5到16位（字母，数字，下划线）

      /*判断账号长度是否符合标准*/
      if (nickname.length < 5) {
        //最大长度被限制住了不用判断
        $('#nicknameJudge').text('账号长度太短')
        $('#nicknameTrue').addClass('has-error')
        $('#nicknameSpan').addClass('glyphicon-remove')
        return;
      }

      /*判断账号输入字符是否符合标准*/
      if (!nicknameReg.test(nickname)) {
        $('#nicknameJudge').text('账号只支持数字、字母、下划线')
        $('#nicknameTrue').addClass('has-error')
        $('#nicknameSpan').addClass('glyphicon-remove')
        return;
      }

      /*判断账号是否已经存在*/
      $.ajax({
        method: 'POST',
        url: 'http://127.0.0.1:5050/nickname',
        data: `nickname=${nickname}`,
        success: function (data, msg, xhr) {
          console.log('异步请求注册API成功', data)
          if (data.code === 200) {
            $('#nicknameTrue').addClass('has-success')
            $('#nicknameSpan').addClass('glyphicon-ok')
          } else {
            $('#nicknameJudge').text('账号已存在')
            $('#nicknameTrue').addClass('has-error')
            $('#nicknameSpan').addClass('glyphicon-remove')
          }
        },
        error: function (xhr, err) {
          console.log('异步请求注册API失败：')
          console.log(xhr)
          console.log(err)
        }
      })
    })

    //密码框被选中时
    $('#upassword').focus(function () {
      $('#upasswordJudge').text("")
      //removeClass和addClass应该默认当指定的元素不存在时不会重复执行
      $('#upasswordTrue').removeClass('has-success')
      $('#upasswordSpan').removeClass('glyphicon-ok')
      $('#upasswordTrue').removeClass('has-error')
      $('#upasswordSpan').removeClass('glyphicon-remove')
    })

    //密码框不被选中时
    $('#upassword').blur(function () {
      let upasswordReg = /^[a-zA-Z0-9_]{6,20}$/ //密码正则表达式，6到20位（字母，数字，下划线）
      let upassword = $('#upassword').val()

      /*判断密码的长度是否符合标准*/
      if (upassword.length < 6) {
        //最大长度被限制住了不用判断
        $('#upasswordJudge').text('密码长度太短')
        $('#upasswordTrue').addClass('has-error')
        $('#upasswordSpan').addClass('glyphicon-remove')
        return;
      }

      /*判断密码是否符合格式标准*/
      if (!upasswordReg.test(upassword)) {
        $('#upasswordJudge').text('密码只支持数字、字母、下划线')
        $('#upasswordTrue').addClass('has-error')
        $('#upasswordSpan').addClass('glyphicon-remove')
        return;
      }

      /*判断两次密码输入是否一致*/
      let repassword = $('#repassword').val()
      if (repassword.length != 0) {
        $('#repasswordJudge').text("")
        //removeClass和addClass应该默认当指定的元素不存在时不会重复执行
        $('#repasswordTrue').removeClass('has-success')
        $('#repasswordSpan').removeClass('glyphicon-ok')
        $('#repasswordTrue').removeClass('has-error')
        $('#repasswordSpan').removeClass('glyphicon-remove')
        if (repassword != upassword) {
          $('#repasswordJudge').text('两次输入的密码不一致')
          $('#repasswordTrue').addClass('has-error')
          $('#repasswordSpan').addClass('glyphicon-remove')
        } else {
          $('#repasswordTrue').addClass('has-success')
          $('#repasswordSpan').addClass('glyphicon-ok')
        }
      }

      /*符合标准的密码处理*/
      $('#upasswordTrue').addClass('has-success')
      $('#upasswordSpan').addClass('glyphicon-ok')
    })

    //确认密码框被选中时
    $('#repassword').focus(function () {
      $('#repasswordJudge').text("")
      //removeClass和addClass应该默认当指定的元素不存在时不会重复执行
      $('#repasswordTrue').removeClass('has-success')
      $('#repasswordSpan').removeClass('glyphicon-ok')
      $('#repasswordTrue').removeClass('has-error')
      $('#repasswordSpan').removeClass('glyphicon-remove')
    })

    //确认密码框不被选中时
    $('#repassword').blur(function () {
      let repassword = $('#repassword').val()
      let upassword = $('#upassword').val()
      //判断是否和密码框输入的一致
      if (repassword != upassword) { //js中没有equal方法
        $('#repasswordJudge').text('两次输入的密码不一致')
        $('#repasswordTrue').addClass('has-error')
        $('#repasswordSpan').addClass('glyphicon-remove')
        return
      }
      $('#repasswordTrue').addClass('has-success')
      $('#repasswordSpan').addClass('glyphicon-ok')
    })

    //联系电话框被选中时
    $('#phone').focus(function () {
      $('#phoneJudge').text("")
      //removeClass和addClass应该默认当指定的元素不存在时不会重复执行
      $('#phoneTrue').removeClass('has-success')
      $('#phoneSpan').removeClass('glyphicon-ok')
      $('#phoneTrue').removeClass('has-error')
      $('#phoneSpan').removeClass('glyphicon-remove')
    })

    //联系电话框不被选中时
    $('#phone').blur(function () {
      let phoneReg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/ //手机号正则表达式
      let phone = $('#phone').val()
      if (!phoneReg.test(phone)) {
        $('#phoneJudge').text('请输入正确有效的手机号')
        $('#phoneTrue').addClass('has-error')
        $('#phoneSpan').addClass('glyphicon-remove')
        return
      }

      //判断手机号是否已经被使用
      $.ajax({
        method: 'POST',
        url: 'http://127.0.0.1:5050/phone',
        data: `phone=${phone}`,
        success: function (data, msg, xhr) {
          console.log('异步请求注册API成功', data)
          if (data.code === 201) {
            $('#phoneTrue').addClass('has-success')
            $('#phoneSpan').addClass('glyphicon-ok')
          } else {
            $('#phoneJudge').text('该手机号已被使用')
            $('#phoneTrue').addClass('has-error')
            $('#phoneSpan').addClass('glyphicon-remove')
          }
        },
        error: function (xhr, err) {
          console.log('异步请求注册API失败：')
          console.log(xhr)
          console.log(err)
        }
      })
    })

    //邮箱框被选中时
    $('#email').focus(function () {
      $('#emailJudge').text("")
      //removeClass和addClass应该默认当指定的元素不存在时不会重复执行
      $('#emailTrue').removeClass('has-success')
      $('#emailSpan').removeClass('glyphicon-ok')
      $('#emailTrue').removeClass('has-error')
      $('#emailSpan').removeClass('glyphicon-remove')
    })

    //邮箱框不被选中时
    $('#email').blur(function () {
      let emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/ //邮箱正则表达式
      let email = $('#email').val()
      if (!emailReg.test(email)) {
        $('#emailJudge').text('请输入正确有效的邮箱地址')
        $('#emailTrue').addClass('has-error')
        $('#emailSpan').addClass('glyphicon-remove')
        return
      }

      //判断邮箱是否已经被使用
      $.ajax({
        method: 'POST',
        url: 'http://127.0.0.1:5050/email',
        data: `email=${email}`,
        success: function (data, msg, xhr) {
          console.log('异步请求注册API成功', data)
          if (data.code === 202) {
            $('#emailTrue').addClass('has-success')
            $('#emailSpan').addClass('glyphicon-ok')
          } else {
            $('#emailJudge').text('该邮箱已被使用')
            $('#emailTrue').addClass('has-error')
            $('#emailSpan').addClass('glyphicon-remove')
          }
        },
        error: function (xhr, err) {
          console.log('异步请求注册API失败：')
          console.log(xhr)
          console.log(err)
        }
      })

    })

    //切换验证码
    $('#yzmImg').click(function () {
      $('#yzmImg').attr('src', 'http://127.0.0.1:5050/yzm?' + Math.random())
    })

    //验证码框被选中时
    $('#yzm').focus(function () {
      $('#yzmJudge').text("")
      //removeClass和addClass应该默认当指定的元素不存在时不会重复执行
      $('#yzmTrue').removeClass('has-success')
      $('#yzmSpan').removeClass('glyphicon-ok')
      $('#yzmTrue').removeClass('has-error')
      $('#yzmSpan').removeClass('glyphicon-remove')
    })

    //提交表单按钮
    $('#register').click(function () {
      //再次判断两次输入的密码是否一致
      if ($('#upassword').val() != $('#repassword').val()) {
        $('#repasswordJudge').text('两次输入的密码不一致')
        $('#repasswordTrue').addClass('has-error')
        $('#repasswordSpan').addClass('glyphicon-remove')
        alert('注册条件未满足，请您耐心检查刚才输入的信息')
        return
      }
      //正则表达式
      let nicknameReg = /^[a-zA-Z0-9_]{5,16}$/ //账号正则表达式，5到16位（字母，数字，下划线）
      let upasswordReg = /^[a-zA-Z0-9_]{6,20}$/ //密码正则表达式，6到20位（字母，数字，下划线）
      let phoneReg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/ //手机号正则表达式
      let emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/ //邮箱正则表达式

      //实际输入数据
      let nickname = $('#nickname').val()
      let upassword = $('#upassword').val()
      let phone = $('#phone').val()
      let email = $('#email').val()
      let myyzm = $('#yzm').val()

      //再次判断输入的数据是否符合格式
      if (nicknameReg.test(nickname) && upasswordReg.test(upassword) && phoneReg.test(phone) && emailReg.test(
          email)) {
        //异步请求插入数据库
        $.ajax({
          method: 'POST',
          url: 'http://127.0.0.1:5050/register',
          data: {
            "nickname": nickname,
            "upassword": upassword,
            "phone": phone,
            "email": email,
            "myyzm": myyzm
          },
          dataType: 'json',
          xhrFields: {
            withCredentials: true
          },
          success: function (data, msg, xhr) {
            console.log('异步请求注册API成功', data)
            if (data.code === 505) {
              alert('注册条件未满足，请您耐心检查刚才输入的信息')
              $('#yzmJudge').text('验证码不正确')
              $('#yzmTrue').addClass('has-error')
              $('#yzmSpan').addClass('glyphicon-remove')
              return
            }
            if (data.code === 200) {
              alert('注册成功')
              window.location.href = "ego_shop_login.html"
            }
          },
          error: function (xhr, err) {
            console.log('异步请求注册API失败：')
            console.log(xhr)
            console.log(err)
          }
        })
      } else {
        alert('注册条件未满足，请您耐心检查刚才输入的信息')
      }
    })
