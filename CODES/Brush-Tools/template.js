function calcOffset(dom) {
  let parentNode = dom.offsetParent
  const style = {
    left: dom.offsetLeft,
    top: dom.offsetTop,
    fixed: getComputedStyle(dom, null).position === 'fixed'
  }
  while (parentNode) {
    style.left += parentNode.offsetLeft
    style.top += parentNode.offsetTop
    parentNode = parentNode.offsetParent
  }
  return style
}
function getScroll(val) {
  return document.documentElement['scroll' + val] || document.body['scroll' + val]
}
export default class Draw {
  constructor(option = {}) {
    const { event = () => {} } = option
    this.canvas = null
    this.ctx = null
    this.event = event
    this.initOption = {}
  }
  resetOption = () => {
    this.targetFixed = null
    this.targetTop = 0
    this.targetLeft = 0
    this.isEraser = false
    this.historyData = []
    this.painting = false
    this.lastPoint = { x: 0, y: 0 }
  }
  init = (option = this.initOption) => {
    let { parentNode = document.documentElement, target, type = 'scroll', className = '', style = {}, lineStyle = {} } = option
    if (!target) target = parentNode
    this.resetOption()
    this.clear()
    this.initOption = option
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
    const { left, top, fixed } = calcOffset(target)
    this.targetFixed = fixed
    this.targetLeft = left
    this.targetTop = top
    this.canvas.width = target[type + 'Width']
    this.canvas.height = target[type + 'Height']
    this.canvas.style.position = fixed ? 'fixed' : 'absolute'
    this.canvas.style.top = top + 'px'
    this.canvas.style.left = left + 'px'
    this.canvas.style.zIndex = '9999'
    Object.keys(style).forEach((item) => {
      this.canvas.style[item] = style[item]
    })
    this.canvas.setAttribute('class', className)
    this.ctx.strokeStyle = 'red'
    this.ctx.lineWidth = '3'
    this.ctx.fillStyle = 'rgba(0,0,0,0)'
    Object.keys(lineStyle).forEach((item) => {
      this.ctx[item] = lineStyle[item]
    })
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    parentNode.appendChild(this.canvas)
    this.canvas.addEventListener('touchstart', this.start, { passive: false })
    this.canvas.addEventListener('touchmove', this.move, { passive: false })
    this.canvas.addEventListener('touchend', this.end, { passive: false })
    this.canvas.addEventListener('mousedown', this.start)
    this.canvas.addEventListener('mousemove', this.move)
    this.canvas.addEventListener('mouseup', this.end)
    this.canvas.addEventListener('mouseleave', this.end)
    this.event({ type: 'init', ...this.initOption })
  }
  empty = () => {
    if (this.canvas) {
      this.historyData = []
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.event({ type: 'empty' })
    }
  }
  clear = () => {
    if (this.canvas) {
      this.canvas.parentNode.removeChild(this.canvas)
      this.canvas = null
      this.ctx = null
      this.event({ type: 'clear' })
    }
  }
  undo = () => {
    if (this.canvas) {
      if (!this.historyData.length) return false
      this.ctx.putImageData(this.historyData[this.historyData.length - 1], 0, 0)
      this.historyData.pop()
      this.event({ type: 'undo' })
    }
  }
  eraser = () => {
    this.isEraser = !this.isEraser
    this.event({ type: 'eraser' })
  }
  saveAsImg = () => {
    const a = document.createElement('a')
    document.body.appendChild(a)
    a.href = this.canvas.toDataURL('image/png')
    a.download = 'zspic' + new Date().getTime()
    a.target = '_blank'
    a.click()
  }
  drawCircle = (x, y, radius) => {
    this.ctx.save()
    this.ctx.beginPath()
    this.ctx.arc(x, y, radius, 0, Math.PI * 2)
    this.ctx.fill()
    if (this.isEraser) {
      this.ctx.clip()
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.restore()
    }
  }
  drawLine = (x1, y1, x2, y2) => {
    this.ctx.lineCap = 'round'
    this.ctx.lineJoin = 'round'
    if (this.isEraser) {
      this.ctx.save()
      this.ctx.globalCompositeOperation = 'destination-out'
      this.ctx.moveTo(x1, y1)
      this.ctx.lineTo(x2, y2)
      this.ctx.stroke()
      this.ctx.closePath()
      this.ctx.clip()
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.restore()
    } else {
      this.ctx.moveTo(x1, y1)
      this.ctx.lineTo(x2, y2)
      this.ctx.stroke()
      this.ctx.closePath()
    }
  }
  start = (e) => {
    this.painting = true
    let x = 0
    let y = 0
    if (e.customEvent) {
      x = e.x
      y = e.y
    } else {
      e.stopPropagation()
      e.preventDefault()
      if (e.type.indexOf('touch') !== -1) {
        x = e.touches[0].pageX
        y = e.touches[0].pageY
      } else {
        x = e.pageX
        y = e.pageY
      }
      x = x - this.targetLeft - (this.targetFixed ? getScroll('Left') : 0)
      y = y - this.targetTop - (this.targetFixed ? getScroll('Top') : 0)
    }
    this.event({ x, y, type: 'start' })
    this.canvas.firstDot = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
    this.historyData.push(this.canvas.firstDot)
    this.lastPoint = { x, y }
    this.drawCircle(x, y, 0)
  }
  move = (e) => {
    if (this.painting) {
      let x = 0
      let y = 0
      if (e.customEvent) {
        x = e.x
        y = e.y
      } else {
        e.stopPropagation()
        e.preventDefault()
        if (e.type.indexOf('touch') !== -1) {
          x = e.touches[0].pageX
          y = e.touches[0].pageY
        } else {
          x = e.pageX
          y = e.pageY
        }
        x = x - this.targetLeft - (this.targetFixed ? getScroll('Left') : 0)
        y = y - this.targetTop - (this.targetFixed ? getScroll('Top') : 0)
      }
      const newPoint = { x, y }
      this.event({ x, y, type: 'move' })
      this.drawLine(this.lastPoint.x, this.lastPoint.y, newPoint.x, newPoint.y)
      this.lastPoint = newPoint
    }
  }
  end = (e) => {
    if (!e.customEvent) {
      e.stopPropagation()
      e.preventDefault()
    }
    this.event({ x: this.lastPoint.x, y: this.lastPoint.y, type: 'end' })
    this.painting = false
  }
}
