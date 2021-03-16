const messageBox = {}

messageBox.eList = {}
messageBox.on = function (key, callback) {
  if (this.eList[key] === undefined) {
    this.eList[key] = new Set()
  }
  this.eList[key].add(callback)
}
messageBox.emit = function (key, ...infoList) {
  if (this.eList[key] === undefined) {
    return false
  }
  let cakkback = false
  for (let func of this.eList[key].values()) {
    cakkback = func(...infoList)
  }
  return cakkback
}
messageBox.un = function (key, func) {
  this.eList[key].delete(func)
}
messageBox.off = function (key, func) {
  this.eList[key].delete(func)
}
messageBox.ondom = function (dom, eventType, callback) {
  if (document.addEventListener) {
    dom.addEventListener(eventType, callback)
  } else {
    dom.attachEvent('on' + eventType, callback)
  }
}

messageBox.offdom = function (dom, eventType, callback) {
  if (document.addEventListener) {
    dom.removeEventListener(eventType, callback)
  } else {
    dom.detachEvent('on' + eventType, callback)
  }
}

export default messageBox
