'use strict'

const inputFileEl = document.querySelector('#input-file>input')
const outputImgEl = document.querySelector('#viewer>img')
const typeSwitchEl = document.querySelector('#convert-config-type')
const sizeSwitchEl = document.querySelector('#convert-config-size')

inputFileEl.addEventListener('change', ({ target: { files } }) => {
  const selectedValueArr = typeSwitchEl.value.split(' ')
  const meta = selectedValueArr[0]
  const quality = Number(selectedValueArr[1])
  const fileReader = new window.FileReader()
  fileReader.onload = async ({ target: { result: srcDataurl } }) => {
    const resultDataurl = await convertImageAsync(srcDataurl, meta, quality)
    outputImgEl.src = resultDataurl
    inputFileEl.value = ''
  }
  fileReader.readAsDataURL(files[0])
})

typeSwitchEl.addEventListener('change', () => {
  const selectedOption = typeSwitchEl.selectedOptions[0]
  if (selectedOption.classList.contains('modify-quality')) {
    const qualityPercent = window.prompt('图片压缩质量（0 ~ 100）', 75)
    const quality = (qualityPercent / 100).toFixed(2)
    selectedOption.value = selectedOption.value.split(' ')[0] + ' ' + quality
    selectedOption.textContent = selectedOption.textContent.split('(')[0] + '(' + qualityPercent + '%质量) (自定义)'
  }
})

// sizeSwitchEl.addEventListener('change', () => {
//   const selectedOption = sizeSwitchEl.selectedOptions[0]
//   if (selectedOption.classList.contains('modify-size')) {
//     const size = window.prompt('图片宽高', '800x600')
//     selectedOption.value = size
//     selectedOption.textContent = selectedOption.textContent.split('(')[0] + '(' + qualityPercent + '%质量) (自定义)'
//   }
// })

/**
     * Convert image format
     * @param {string}    dataurl    Source image base64 dataurl
     * @param {string}    meta       Target image meta
     * @param {number}    quality    Target image compress quality
     * @param {number}    width      Target image width (optional)
     * @param {number}    height     Target image height (optional)
     * @return {string}              Converted image base64 dataurl
     */
async function convertImageAsync (dataurl, meta, quality, width, height) {
  return new Promise(resolve => {
    const canvas = document.createElement('canvas')
    const image = new window.Image()
    image.onload = () => {
      canvas.width = width || image.width
      canvas.height = height || image.height
      canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height)
      resolve(canvas.toDataURL(meta, quality))
    }
    image.src = dataurl
  })
}
