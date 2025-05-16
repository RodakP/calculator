const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

const clear = document.querySelector(".clear");
const remove = document.querySelector(".remove");
const equal = document.querySelector(".equal");

const previousResult = document.querySelector(".previous-operation");
const currentResult = document.querySelector(".current-operation");

let currentOperation = "";
let previousOperation = "";
let operation = undefined;

// FUNCTIONS

const calculate = () => {
  let math;
  if (!previousOperation || !currentOperation) {
    return;
  }
  const previous = parseFloat(previousOperation);
  const current = parseFloat(currentOperation);

  if (isNaN(previous) || isNaN(current)) {
    return;
  }

  switch (operation) {
    case "+":
      math = previous + current;
      break;
    case "-":
      math = previous - current;
      break;
    case "×":
      math = previous * current;
      break;
    case "÷":
      if(current === 0) {
        clearResult()
        return
      }
      math = previous / current;
      break;
    case "√":
      math = Math.pow(previous, 1 / current);
      break;
    case "%":
      math = (previous / 100) * current;
      break;
    case "²":
      math = Math.pow(previous, current);
      break;
    case "log":
      math = Math.log(previous) / Math.log(current);
      break;

    default:
      return;
  }

  currentOperation = math;
  operation = undefined;
  previousOperation = "";
};

const updateResult = () => {
  currentResult.innerText = currentOperation;
  if (operation != null) {
    previousResult.innerText = previousOperation + operation;
  } else {
    previousResult.innerText = "";
  }
};

const addNumber = (number) => {
  if (number === "•") {
    if (currentOperation.includes(".")) {
      return;
    }
    number = ".";
  }
  currentOperation = currentOperation.toString() + number.toString();
};

const removeNumber = () => {
  currentOperation = currentOperation.toString().slice(0, -1);
};

const selectOperation = (operator) => {
  if (currentOperation === "") {
    return;
  }
  if (previousOperation !== "") {
    const previous = previousResult.innerText
    if(currentOperation.toString() === '0' && previous[previous.length -1] === '÷') {
      clearResult()
      return
    }
    calculate();
  }
  operation = operator;
  previousOperation = currentOperation;
  currentOperation = "";
};

const clearResult = () => {
  currentOperation = "";
  previousOperation = "";
  operation = undefined;
};

// ADDEVENETLISTENERS

numbers.forEach((number) => {
  number.addEventListener("click", () => {
    addNumber(number.innerText);
    updateResult();
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    selectOperation(operator.innerText);
    updateResult();
  });
});

remove.addEventListener("click", () => {
  removeNumber();
  updateResult();
});

equal.addEventListener("click", () => {
  calculate();
  updateResult();
});

clear.addEventListener('click', () => {
    clearResult()
    updateResult()
})