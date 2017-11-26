/* global Zepto */
(function($) {
  $.ajax({
    url: '/api/c/ping',
    success: function() {
      console.log('登陆成功');
    },
    error: function(err) {
      if (err.status === 401) {
        let currentHref = encodeURIComponent(location.href);
        location.href = '/login.html?callback=' + currentHref;
      } else {
        alert(err);
      }
    }
  });
})(Zepto);
