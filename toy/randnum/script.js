'use strict'

const minimumInputBox = document.querySelector('#config-minimum')
const maximumInputBox = document.querySelector('#config-maximum')
const quantityInputBox = document.querySelector('#config-quantity')
const numbersList = document.querySelector('#numbers-list tbody')
const creatNumberBtn = document.querySelector('#creat-number-btn')
const recreatNumberBtn = document.querySelector('#recreat-number-btn')
const emptyListBtn = document.querySelector('#empty-list-btn')

function randomInRange (min, max) {
  return Math.round(Math.random() * (max - min)) + min
}

function getTimeStr () {
  const zeroPad = (num, len = 3) => ('000' + num).substr(-len, len)
  const date = new Date()
  const timeStr = `${date.toTimeString().substr(0, 8)}.${zeroPad(date.getMilliseconds())}`
  return timeStr
}

function emptyList () {
  numbersList.innerHTML = ''
}

function creatNumber () {
  const minimum = Number(minimumInputBox.value)
  const maximum = Number(maximumInputBox.value)
  const quantity = Number(quantityInputBox.value)
  const creatTime = getTimeStr()
  let htmlStr = ''
  for (let i = 0; i < quantity; i++) {
    const randomNumber = randomInRange(minimum, maximum)
    htmlStr += `<tr><td>${creatTime}</td><td>${randomNumber}</td></tr>`
  }
  numbersList.insertAdjacentHTML('beforeend', htmlStr)
  window.requestAnimationFrame(() => {
    if (numbersList.childElementCount > 0) {
      numbersList.lastElementChild.scrollIntoView({ behavior: 'smooth' })
    }
  })
}

creatNumberBtn.addEventListener('click', creatNumber)

recreatNumberBtn.addEventListener('click', () => {
  emptyList()
  creatNumber()
})

emptyListBtn.addEventListener('click', emptyList)
