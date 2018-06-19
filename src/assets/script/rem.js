/**
 * Created by Chen Kai on 2017/7/12.
 */
(function (window) {
  let doc = window.document
  let docEl = doc.documentElement
  let reCalc = function () {
    let clientWidth = docEl.clientWidth
    if (!clientWidth) return
    // 假设设计稿宽度750px，根元素字体大小为100px （chrome最小10px）
    docEl.style.fontSize = 100 * (clientWidth / 750) + 'px'
  }

  if (!doc.addEventListener) return
  window.addEventListener('resize', reCalc, true)
  doc.addEventListener('DOMContentLoaded', reCalc, true)
})(window)
