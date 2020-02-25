'use strict'

const inputBoxEl = document.querySelector('#input-box')
const outputBoxEl = document.querySelector('#output-box')
const partitionEl = document.querySelector('#partition')
inputBoxEl.addEventListener('input', refreshOutput)
partitionEl.addEventListener('click', hideOrShowInputBox)
refreshOutput()

function hideOrShowInputBox () {
  inputBoxEl.style.display = inputBoxEl.style.display === 'none' ? '' : 'none'
}

function refreshOutput () {
  outputBoxEl.innerHTML = inputBoxEl.value === ''
    ? 'Compiled result will be displayed here.'
    : window.marked(inputBoxEl.value)
}
