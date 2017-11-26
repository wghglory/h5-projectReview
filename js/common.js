(function(doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function() {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = 16 * (clientWidth / 375) + 'px';
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

var JC = {
  tools: {}
};

JC.tools.getQueryStringParameterByName = function(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

JC.tools.getStyle = function(obj, attr) {
  if (obj.currentStyle) {
    return obj.currentStyle[attr]; // IE
  } else {
    return getComputedStyle(obj, false)[attr]; // standard
  }
};

/**
 * 移动端拖拽
 * 元素绝对定位，父级相对定位
 * 如果父级为window，则可以只传一个参数，物体相对于window范围拖动
 * 传2个参数，则父级为第二个参数，物体相对于父级范围拖动
 * 参数为id值
 * @param {node} obj drag target
 * @param {node} parentNode
 */
JC.tools.drag = function(obj, parentNode) {
  var pWidth, pHeight;
  if (arguments.length == 1) {
    parentNode = window.self;
    pWidth = parentNode.innerWidth;
    pHeight = parentNode.innerHeight;
  } else {
    pWidth = parentNode.clientWidth;
    pHeight = parentNode.clientHeight;
  }
  obj.addEventListener('touchstart', function(event) {
    //当只有一个手指时              .
    if (event.touches.length === 1) {
      event.preventDefault();
    }
    var touch = event.targetTouches[0];
    var disX = touch.clientX - obj.offsetLeft,
      disY = touch.clientY - obj.offsetTop;
    var oWidth = obj.offsetWidth,
      oHeight = obj.offsetHeight;

    function moving(event) {
      var touch = event.targetTouches[0];
      obj.style.left = touch.clientX - disX + 'px';
      obj.style.top = touch.clientY - disY + 'px';
      //左侧
      if (obj.offsetLeft <= 0) {
        obj.style.left = 0;
      }
      //右侧
      if (obj.offsetLeft >= pWidth - oWidth) {
        obj.style.left = pWidth - oWidth + 'px';
      }
      //上面
      if (obj.offsetTop <= 0) {
        obj.style.top = 0;
      }
      //下面
      if (obj.offsetTop >= pHeight - oHeight) {
        obj.style.top = pHeight - oHeight + 'px';
      }
    }

    obj.addEventListener('touchmove', moving);

    obj.addEventListener('touchend', function() {
      obj.removeEventListener('touchmove', moving);
      obj.removeEventListener('touchend', moving);
    });
  });
};

/**
 * 移动端 modal 窗口
 *
body.modal-open {
  position: fixed;
  width: 100%;
}
.modal {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.3);

  .modal-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: px2rem(264);
    background: white;
    border-radius: 4px;
  }
}
 * 打开 modal 时：ModalHelper.afterOpen();并设置.modal display block
 * 关闭 modal 时：ModalHelper.beforeClose();并设置.modal display none
 */
JC.tools.ModalHelper = (function(bodyCls) {
  var scrollTop;
  return {
    afterOpen: function() {
      scrollTop = document.scrollingElement.scrollTop;
      document.body.classList.add(bodyCls);
      document.body.style.top = -scrollTop + 'px';
    },
    beforeClose: function() {
      document.body.classList.remove(bodyCls);
      // scrollTop lost after set position:fixed, restore it back.
      document.scrollingElement.scrollTop = scrollTop;
    }
  };
})('modal-open');
