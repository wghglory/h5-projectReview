/* global Zepto */
(function($) {
  var toReviewList = [];

  var reviewedList = [];

  var $toReviewLink = $('.to-review-link');
  var $reviewedLink = $('.reviewed-link');
  var $toReviewUl = $('.to-review-ul');
  var $reviewedUl = $('.reviewed-ul');

  // 控制审阅和为审阅颜色，列表显示和隐藏
  $toReviewLink.on('tap', function() {
    $toReviewLink.addClass('active');
    $reviewedLink.removeClass('active');
    $reviewedUl.hide();
    $toReviewUl.show();
  });

  $reviewedLink.on('tap', function() {
    $reviewedLink.addClass('active');
    $toReviewLink.removeClass('active');
    $toReviewUl.hide();
    $reviewedUl.show();
  });

  function initLoad() {
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: '/api/jc/review-projects?todo=true',
      success: function(res) {
        res.page.forEach(function(item, index) {
          toReviewList.push({ id: item._id, imgUrl: `./img/${index % 3 + 1}@2x.png`, content: item.name || '' });
        });

        buildHtml();
      },
      error: function(err) {
        console.log(err, 'project list error');
      }
    });

    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: '/api/jc/review-projects?todo=false',
      success: function(res) {
        res.page.forEach(function(item, index) {
          reviewedList.push({ id: item._id, imgUrl: `./img/${index % 3 + 1}@2x.png`, content: item.name || '' });
        });

        buildHtml();
      },
      error: function(err) {
        console.log(err, 'project list error');
      }
    });

    buildHtml();
  }

  function bindProjectTouch() {
    $('.to-review-ul li').on('tap', function() {
      var projectId = $(this).data('id');
      var projectName = $(this).data('name');
      location.href = '/project.html?id=' + projectId + '&name=' + projectName;
    });
  }

  function buildHtml() {
    var toReviewUlContent = toReviewList.map(function(r) {
      return `<li data-name=${r.content} data-id=${r.id}>
      <span style="background:url(${r.imgUrl}) no-repeat center;background-size:contain;"></span>
      <span>${r.content}</span>
      <span class="icon-zhankai iconfont" data-name=${r.content} data-id=${r.id}></span>
      </li>`;
    });

    $toReviewUl.html(toReviewUlContent);

    var reviewedUlContent = reviewedList.map(function(r) {
      return `<li data-name=${r.content} data-id=${r.id}>
      <span style="background:url(${r.imgUrl}) no-repeat center;background-size:contain;"></span>
      <span>${r.content}</span>
      <span class="icon-zhankai iconfont" data-name=${r.content} data-id=${r.id}></span>
      </li>`;
    });

    $reviewedUl.html(reviewedUlContent);

    bindProjectTouch();
  }

  initLoad();
})(Zepto);
