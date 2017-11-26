/* global Zepto JC */
(function($) {
  // 登陆发送请求
  $('#submit').on('touchstart', function() {
    $.ajax({
      type: 'POST',
      dataType: 'json',
      url: '/api/c/sign-in',
      data: { username: $('#username').val(), password: $('#password').val() },
      xhrFields: {
        withCredentials: true
      },
      success: function() {
        location.href = JC.tools.getQueryStringParameterByName('callback') || '/index.html';
      },
      error: function(err) {
        if (err.status === 400) {
          alert('账号密码错误');
        }
      }
    });
  });

  // 删除选中 input 内容
  $('.icon-guanbi').on('tap', function() {
    $(this).siblings('input').val('');
    validateForm();
  });

  // 密码显示和隐藏
  $('#eye').on('tap', function() {
    if ($(this).hasClass('icon-mima-yanjing-guanbi')) {
      $(this).siblings('input').attr('type', 'text');
      $(this).removeClass('icon-mima-yanjing-guanbi').addClass('icon-xianshimima1');
    } else {
      $(this).siblings('input').attr('type', 'password');
      $(this).addClass('icon-mima-yanjing-guanbi').removeClass('icon-xianshimima1');
    }
  });

  function validateForm() {
    var username = $('#username').val().trim();
    var password = $('#password').val().trim();
    var $submit = $('#submit');
    if (username !== '' && password !== '') {
      $submit.addClass('green');
    } else {
      $submit.removeClass('green').addClass('gray');
    }
  }

  $('#username,#password').on('input', validateForm);
})(Zepto);
