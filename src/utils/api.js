export const baseUrl = `http://localhost:3000/api`;

export function formatTime(seconds) {
  if (isNaN(seconds)) {
    return `00:00`;
  } else {
    return [parseInt((seconds / 60) % 60), parseInt(seconds % 60)].join(':').replace(/\b(\d)\b/g, '0$1');
  }
}

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
export const ModalHelper = (function(bodyCls) {
  let scrollTop;
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
