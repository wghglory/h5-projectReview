/* global Zepto JC */
(function($) {
  var audio = document.getElementById('audio');
  var $PPTImgList = $('.ppt-img-list');

  function formatTime(seconds) {
    return [parseInt((seconds / 60) % 60), parseInt(seconds % 60)].join(':').replace(/\b(\d)\b/g, '0$1');
  }

  let projectId = JC.tools.getQueryStringParameterByName('id');

  let projectName = JC.tools.getQueryStringParameterByName('name');

  document.title = projectName || '';

  var getImgList = function(pptPages) {
    for (let i = 0; i < pptPages; i++) {
      $PPTImgList.append(
        `<div class="img-item"><img src="http://estartup.hilab.net/r/ppt-images/${projectId}/slide-${i}.jpg" alt=""></div>`
      );
    }
  };

  var pptPages = 0;

  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: `/api/jc/review-projects/${projectId}`,
    success: function(res) {
      pptPages = res.pptPages;
      getImgList(pptPages);
    },
    error: function(err) {
      console.error(err);
    }
  });

  function play() {
    audio.play();
  }

  function pause() {
    audio.pause();
  }

  var count = 0;
  $('.player-btn').on('touchstart', function() {
    if (count++ % 2 === 0) {
      play();
    } else {
      pause();
    }
    $('.player-btn').toggleClass('play');
  });

  //获取项目的ID传递给下个页面

  let getId = JC.tools.getQueryStringParameterByName('id');

  $('.to-report-btn').attr('href', '/review.html?id=' + getId);

  setInterval(function() {
    $('.start-time').text(formatTime(parseInt(audio.currentTime)));
    $('.all-time').text(formatTime(parseInt(audio.duration)));
    $('.play-progress').css('width', parseInt(audio.currentTime) * 100 / parseInt(audio.duration) + '%');
  }, 1000);
})(Zepto);
