export const hassClass = (el, className) => {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export const addClass = (el, className) => {
  if (hassClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export const remClass = (el, className) => {
  if (!hassClass(el, className)) {
    return
  }
  let rmCl = el.className.split(' ')
  rmCl.splice(rmCl.indexOf(className), 1)
  el.className = rmCl.join(' ')
}

export const touchDoms = (dom, type) => {
  if (typeof dom !== 'object') {
    return
  }
  // 列表样式
  let liDom = null
  for (let i = 0; i < dom.path.length; i++) {
    if (dom.path[i].nodeName === 'LI') {
      liDom = dom.path[i]
    }
    continue
  }
  if (liDom) {
    if (type === 'add') {
      addClass(liDom, 'home-li_click')
    } else {
      remClass(liDom, 'home-li_click')
    }
  }
}

export const getDate = () => {
  var d = new Date()
  var str = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
  return str
}
