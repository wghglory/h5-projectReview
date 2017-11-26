/* global Zepto JC */

(function($) {
  var $add = $('.add');
  var $minus = $('.minus');
  var $greenBar = $('.review-scorebar-current');
  var $score = $('.score');

  // 初始化加载数据
  function initLoad() {
    var problemCategorys = reviewConfig.map(function(f) {
      return `<article class="review-item">
      <div class="review-item-header">
        <span class="iconfont icon-gouxuan"></span>
        ${f.problemCategory}
      </div>
      <ul>
        ${f.problems
          .map(function(problem) {
            return `<li>
            <span class="iconfont icon-gouxuan"></span>
            <a href="javascript:">${problem}</a>
            </li>`;
          })
          .join('')}
      </ul>
    </article>`;
    });
    $('.review-list').append(problemCategorys);

    bindProblemCategoryListEvent();
  }

  initLoad();

  /* ----------------------------- 问题列表 开始 --------------------------------- */

  // 绑定列表点击
  // problemCategory 3 status: 黑色，灰色，黑色+对勾，控制显示隐藏
  function bindProblemCategoryListEvent() {
    // 点击每个 problemCategory
    $('.review-item-header').on('tap', function() {
      // 出去当前点击的 problemCategory，其他 header 删除 class active
      $('.review-item-header').each(
        function(index, item) {
          if (item !== this) {
            item.classList.remove('active');
          }
        }.bind(this)
      );

      // 隐藏所有 ul（每个 problemCategory 下面 problems）
      $('.review-item ul').removeClass('show');

      // 当前 problemCateogory active toggle，所以里面 ul 可以根据 active 判断是否隐藏显示
      $(this).toggleClass('active');

      // problemCategory active 决定了同级 ul 是否显隐
      if ($(this).hasClass('active')) {
        $(this).siblings('ul').addClass('show');
      } else {
        $(this).siblings('ul').removeClass('show');
      }
    });

    // 点击每个 problemCategory 下面的 problem
    $('.review-item li').on('tap', function() {
      $(this).toggleClass('active'); // 每个 problem 选中和取消。也要设置 a active
      $(this).parent().siblings('.review-item-header').removeClass('valueMoreThanOne');

      var lis = $(this).siblings().concat($(this));
      var len = lis.length;
      for (var i = 0; i < len; i++) {
        // 只要有一个 li 选中，header 就是 active
        if (lis[i].classList.contains('active')) {
          $(this).parent().siblings('.review-item-header').addClass('valueMoreThanOne');
          break;
        }
      }
    });
  }

  /* ----------------------------- 问题列表 结束 --------------------------------- */

  /* ----------------------------- 滚动条分数区域 开始 --------------------------------- */

  // 根据分数更新绿色滚动宽度
  function updateScorebar(target, score) {
    target.css({
      width: score + '%'
    });
  }

  // 点击加减号 更新绿色滚动条宽度、分数更新
  // todo: Tap continuously add
  $add.on('tap', function() {
    var newScore = parseInt($score.html()) + 1;
    if (newScore > 100) newScore = 100;
    $score.html(newScore);
    updateScorebar($greenBar, newScore);
  });
  $minus.on('tap', function() {
    var newScore = parseInt($score.html()) - 1;
    if (newScore < 0) newScore = 0;
    $score.html(newScore);
    updateScorebar($greenBar, newScore);
  });

  // 拖动绿色滚动条，宽段改变、分数更新
  dragScoreBar(
    document.querySelector('.review-scorebar-current'),
    document.querySelector('.review-scorebar'),
    $score[0]
  );

  function dragScoreBar(obj, parentNode, scoreObj) {
    var pWidth = parentNode.clientWidth;

    // 按下：改变绿条宽度、得分
    obj.addEventListener('touchstart', function(event) {
      if (event.touches.length !== 1) {
        event.preventDefault();
      }
      var touch = event.targetTouches[0];
      var prevClientX = touch.clientX; // 初始按下位置

      // 按下瞬间绿条宽度变化，其右侧和鼠标按下位置一齐
      obj.style.width = prevClientX - parentNode.offsetLeft + 'px';

      // 按下瞬间计算当前位置的分数
      scoreObj.innerHTML = Math.floor(obj.offsetWidth / pWidth * 100);

      function moving(event) {
        var touch = event.targetTouches[0];

        // 如果鼠标滑动到 parentNode 之外，阻止之后代码
        if (touch.clientX < parentNode.offsetLeft || touch.clientX > parentNode.offsetLeft + pWidth) {
          return false;
        }

        obj.style.width = touch.clientX - parentNode.offsetLeft + 'px'; // 绿色宽度 = 鼠标位置 - 滚动条左侧到屏幕左侧距离

        // 左侧边界
        if (obj.offsetWidth <= 0) {
          obj.style.width = 0;
          scoreObj.innerHTML = 0;
        }
        // 右侧边界
        if (obj.offsetWidth >= pWidth) {
          obj.style.width = pWidth + 'px';
          scoreObj.innerHTML = 100;
        }

        // 更新分数
        scoreObj.innerHTML = Math.floor(obj.offsetWidth / pWidth * 100);
      }

      obj.addEventListener('touchmove', moving);

      obj.addEventListener('touchend', function() {
        obj.removeEventListener('touchmove', moving);
        obj.removeEventListener('touchend', moving);
      });
    });
  }

  /* ----------------------------- 滚动条分数区域 结束 --------------------------------- */

  /* -----------------------------  modal 开始 --------------------------------- */

  // 要提交，打开 modal
  $('.review-submit').on('tap', function() {
    $('.modal').removeClass('hide');
    JC.tools.ModalHelper.afterOpen();
  });

  // modal 关闭
  $('.close').on('tap', function() {
    $('.modal').addClass('hide');
    JC.tools.ModalHelper.beforeClose();
  });

  // 确定提交
  $('.confirm').on('tap', function() {
    // 获取得分，problems，主评论区
    var score = $score.html();
    var comment = $('textarea').val();
    var problems = [];

    // 所有 active li 里面的 a
    $('li.active a', '.review-item').each(function(index, item) {
      problems.push($(item).html());
    });
    // post api call
    var projectId = JC.tools.getQueryStringParameterByName('id');
    $.ajax({
      type: 'post',
      data: { score: score, comment: comment, problems: problems },
      url: '/api/jc/review-projects/' + projectId,
      success: function(res) {
        console.log(res);
        $('.modal').addClass('hide');
        JC.tools.ModalHelper.beforeClose();
        window.location.href = '/index.html';
      },
      error: function() {
        console.log('fail');
      }
    });
  });
  /* ----------------------------- modal 结束 --------------------------------- */
})(Zepto);
