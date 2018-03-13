
var doc = document.documentElement
var psd = 375
var dpr = 1
var scale = 1 / dpr
var resize = 'orientationchange' in window ? 'orientationchange' : 'resize'
var meta = document.createElement('meta')

meta.name = 'viewport'
meta.content = 'width=device-width, user-scalable=no, initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale

doc.appendChild(meta)

function recalc () {
  var width = doc.clientWidth

  if (width / dpr > psd) {
    width = psd * dpr
  }
  doc.dataset.width = width
  doc.dataset.persent = 100 * (width / psd)
  doc.style.fontSize = 100 * (width / psd) + 'px'
}

recalc()

if (document.addEventListener) {
  window.addEventListener(resize, recalc, false)
}
