   //账号框正在输入时
   $('#nickname').focus(function () {
     $('#nicknameJudge').text("")
     $('#upasswordTrue').removeClass('has-error')
     $('#upasswordSpan').removeClass('glyphicon-remove')
   })
   //密码框正在输入时
   $('#upassword').focus(function () {
     $('#nicknameJudge').text("")
     $('#upasswordTrue').removeClass('has-error')
     $('#upasswordSpan').removeClass('glyphicon-remove')
   })

   //点击登录按钮后
   $('#login').click(function () {
     let nickname = $('#nickname').val()
     let upassword = $('#upassword').val()
     //用来判断是普通用户还是超级用户
     let user = $("input[name='loginuserJudge']:checked").val()
     //判断是普通用户还是超级用户
     $.ajax({
       method: 'POST',
       url: 'http://127.0.0.1:5050/login',
       data: {
         "nickname": nickname,
         "upassword": upassword,
         "user": user
       },
       dataType: 'json',
       xhrFields: {
         withCredentials: true
       },
       success: function (data, msg, xhr) {
         console.log('异步请求登录API成功', data)
         if (data.code === 506) {
           $('#nicknameJudge').text('账号或密码不正确')
           $('#upasswordTrue').addClass('has-error')
           $('#upasswordSpan').addClass('glyphicon-remove')
           $('#upassword').val("")
           return
         }
         if (data.code === 200) {
           window.sessionStorage.setItem('uid',data.uid)
           window.sessionStorage.setItem('nickname',data.nickname)
           window.location.href = "/index.html"   //跳转到首页推荐
         }
         if (data.code === 201) {
           window.location.href = "/egoAdmin/index.html"   //跳转到后台管理
         }
       },
       error: function (xhr, err) {
         console.log('异步请求登录API失败：')
         console.log(xhr)
         console.log(err)
       }
     })
   })
