const bill = document.getElementById("bill");
const tipPercentages = document.getElementsByClassName("tip-percentage");
const customTip = document.getElementById("custom");
let percentage;
const people = document.getElementById("people");
const tip = document.getElementById("result-tip");
const total = document.getElementById("result-total");
const resetBtn = document.getElementById("reset");

//enter bill amount
bill.addEventListener("change", () => {
    amount = parseInt(bill.value);
  if (amount > 0) {
    bill.classList.remove("cantzero");
    removeError("bill")
    calculate();
  } else {
    noResult()
    displayError("bill");
    bill.classList.add("cantzero");
  }
  });

//select tip %
for (btn of tipPercentages) {
  btn.addEventListener("click", (e) => {
    removeSelection();
    percentage = parseInt(e.target.id) / 100;
    choice = e.target
    choice.classList.add("clicked");
    customTip.value = "";
    customTip.classList.remove("cantzero");
    customTip.classList.remove("customtip");
    removeError("tip")
    calculate();
  });
}
//select custom tip
customTip.addEventListener("change", () => {
    percentage = parseInt(customTip.value) / 100;
    if (percentage > 0) {
        customTip.classList.remove("cantzero");
        customTip.classList.add("customtip");
        removeError("tip")
        calculate();
        removeSelection();
      } else {
        noResult()
        displayError("tip");
        customTip.classList.add("cantzero");
        customTip.classList.remove("customtip");

      }
    
})


//remove tips selection
function removeSelection() {
    for (btn of tipPercentages) {
        btn.classList.remove("clicked");
    }
}

//enter people amount
people.addEventListener("change", () => {
  amount = parseInt(people.value);
  if (amount > 0) {
    people.classList.remove("cantzero");
    removeError("people")
    calculate();
  } else {
    noResult()
    displayError("people");
    people.classList.add("cantzero");
  }
});

//calculate
function calculate() {
  if (bill.value && percentage && people.value) {
    let resultTip = calculateTip();
    calculateTotal(resultTip);}
}

//calculate tip
function calculateTip() {
    tip.textContent = "";
    let resultTip = ((parseInt(bill.value) * percentage) / parseInt(people.value)).toFixed(2);
    if (resultTip > 0) {
    tip.textContent = "$" + resultTip;
    return resultTip;
    }
    else {
        noResult()
    }
}

//calculate total
function calculateTotal(resultTip) {
    total.textContent = "";
    let resultTotal = (parseInt(bill.value) / parseInt(people.value) + parseInt(resultTip)).toFixed(2);
    if (resultTotal > 0) {
    total.textContent = "$" + resultTotal;}
    else {
        noResult()
    }
}

// reset
resetBtn.addEventListener("click", () => {
    reset();
  });
  
function reset() {
  bill.value = "";
  people.value = "";
  customTip.value = "";
  tip.textContent = "$0.00";
  total.textContent = "$0.00";
  removeSelection();
}

function noResult() {
    tip.textContent = "$0.00";
    total.textContent = "$0.00";
}

function displayError(id) {
 let error = document.getElementById(`${id}-error`)
error.textContent = "Can't be less or equal to 0";
}

function removeError(id) {
    let error = document.getElementById(`${id}-error`)
   error.textContent = "";
   }