'use strict'

const svgContent = document.querySelector('#svg-content')
const svgViewer = document.querySelector('#svg-viewer')
let svgStr = ''
svgContent.value = window.location.href
refreshQRCode()

function refreshQRCode () {
  svgViewer.innerHTML = svgStr = new window.QRCode(svgContent.value, 'L').toSvg(10)
}

function downloadSvg () {
  downloadTextContent(`QRCode_${Date.now()}.svg`, svgStr)
}

function downloadTextContent (name, contentStr) {
  const blob = new window.Blob([contentStr])
  const href = URL.createObjectURL(blob)
  URL.revokeObjectURL(blob)
  const aTag = document.createElement('a')
  aTag.download = name
  aTag.href = href
  aTag.click()
}

document.querySelector('#refresh-qrcode-btn').addEventListener('click', refreshQRCode)

document.querySelector('#download-qrcode-btn').addEventListener('click', downloadSvg)
