const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operation');
const clear = document.querySelector('.clear');
const deletebtn = document.querySelector('.delete');
const equals = document.querySelector('.equals');
const previousScore = document.querySelector('.previous-action');
const currentScore = document.querySelector('.current-action');

let currentAction = ''
let process = undefined
let previousAction = ''

const calculate = () => {
  let operation
  if(!previousAction || !currentAction) {
    return
  }

  const previous = parseFloat(previousAction)
  const current = parseFloat(currentAction)

  if(isNaN(previous) || isNaN(current)) {
    return
  }

  switch (process) {
    case '+':
      operation = previous + current
      break
      case '-':
        operation = previous - current
      break
      case '×':
        operation = previous * current
      break
      case '÷':
      if(current === 0)
      {
        clearScore()
        return
      }
        operation = previous / current
      break
      case '^':
        operation = Math.pow(previous, current)
      break
      case '%':
        operation = previous / 100 * current
      break
      case '√':
        operation = Math.pow(previous, 1 / current)
      break
      case 'log':
        operation = Math.log(previous) / Math.log(current)
      break
    default:
      return
  }
  currentAction = operation
  process = undefined
  previousAction = ''

}

const selectOperation = (operator) => {
  if(currentAction === '') {
    return
  }
  if(previousAction !== '') {
    const previous = previousScore.innerText
    if(currentAction.toString() === '0' &&  previous[previous.length - 1] === '÷') {
      clearScore()
      return
    }
    calculate()
  }

  process = operator
  previousAction = currentAction
  currentAction = ''
}

const addNumber = (number) => {
  if(number === '•') {
    if(currentAction.includes('.')) {
      return
    }
    number = '.'
  }

  currentAction = currentAction.toString() + number.toString()
}

const deleteNumber = () => {
  currentAction = currentAction.toString().slice(0, -1)
}

const updateScore = () => {
  currentScore.innerText = currentAction

  if(process != null) {
  previousScore.innerText = previousAction + process
  } else {
    previousScore.innerText = ''
  }
}

const clearScore = () => {
  currentAction = ''
  process = undefined
  previousAction = ''
}

numbers.forEach((number) => {
  number.addEventListener('click', () => {
    addNumber(number.innerText)
    updateScore()
  })
})

operators.forEach((operator) => {
  operator.addEventListener('click', () => {
    selectOperation(operator.innerText)
    updateScore()
  })
})

equals.addEventListener('click', () => {
  calculate()
  updateScore()
})

deletebtn.addEventListener('click', () => {
  deleteNumber()
  updateScore()
})

clear.addEventListener('click', () => {
  clearScore()
  updateScore()
})
