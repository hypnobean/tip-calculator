// Define the input and calc variables
let bill = 0;
let tipButtonValue = 0;
let customTipValue = 0;
let totalBillTipPerPerson = 0;
let totalTipAmount = 0;
let noOfPeople = 1;
// Define the inputs
const theForm = document.forms["tipCalc"];
const billInput = theForm.elements["bill"];
const tipButton = theForm.elements["tip-btn"];
const customTipInput = theForm.elements["customPerCent"];
const noOfPeopleInput = theForm.elements["noOfPeople"];
// Define the screen update containers
const displayTotalTip = document.getElementById("tipTotal");
const displayTotalPerPerson = document.getElementById("totalPerPerson");
const billCannotBeZero = document.getElementsByClassName("zero")[0];
const noOfPeopleCannotBeZero = document.getElementsByClassName("zero")[1];


// Bill total input value
billInput.addEventListener("input", function() {
    bill = Number(billInput.value);
    console.log(bill);
    billError();
    noOfPeopleError();
});



// Get value of button clicked, clear custom tip input
for (var i = 0; i < tipButton.length; i++)    {
    tipButton[i].addEventListener("input", function() {
        tipButtonValue = Number((this.value) / 100);
        console.log(tipButtonValue);
        console.log(this.checked);
        billError();
        noOfPeopleError();

    })
    tipButton[i].addEventListener("click", function() {
        theForm.elements["customPerCent"].value = "";
        customTipValue = 0;
        billError();
        noOfPeopleError();
    })
}

// Toggle tip buttons


// Get Value of Custom Tip
theForm.elements["customPerCent"].addEventListener("input", function() {
    customTipValue = Number((theForm.elements["customPerCent"].value) / 100);
    console.log(customTipValue);
});


// When custom tip is clicked, clear tip buttons
customTipInput.addEventListener("click", function() {
    for (var i = 0; i < document.querySelectorAll('input[type="radio"]').length; i++) {
        document.querySelectorAll('input[type="radio"]')[i].checked = false;
        tipButtonValue = 0;
    }
});



// Number of People
noOfPeopleInput.addEventListener("input", function() {
    noOfPeople = Number(noOfPeopleInput.value);
    console.log(noOfPeople);
});



// Update the totals on screen
// Make sure that custom tip zero value still calculates 
// MAKE SURE THAT CUSTOM TIP IS ZERO'D WHEN EVERYTHING IN IT IS DELETED
function updateTipTotal() {
    if (customTipInput && customTipInput.value) { // check this
        totalTipAmount = bill * customTipValue;
    }
    else if (tipButtonValue > 0) {
        totalTipAmount = bill * tipButtonValue;
    }
    displayTotalTip.innerHTML = "$" + parseFloat(totalTipAmount).toFixed(2);
    billError();
    noOfPeopleError();
    customTipError();
}


function updateTotalPerPerson() {
    totalBillTipPerPerson = (bill + totalTipAmount) / noOfPeople;
    displayTotalPerPerson.innerHTML = "$" + parseFloat(totalBillTipPerPerson).toFixed(2);
    billError();
    noOfPeopleError();
    customTipError();
}



for (i = 0; i < theForm.elements.length; i++) {
    theForm.elements[i].addEventListener("input", updateTipTotal, false);
}

for (i = 0; i < theForm.elements.length; i++) {
    theForm.elements[i].addEventListener("input", updateTotalPerPerson, false);
}




// Highlight text in text boxes for easy overwriting on mobile
for (i = 0; i < document.querySelectorAll('input[type="text"]').length; i++) {
    document.querySelectorAll('input[type="text"]')[i].addEventListener("click" , function () {
        this.select();
    })
}

// Get reset button to clear all values and update innerHTML back to $0.00
function clearAll() {
    bill = 0;
    tipButtonValue = 0;
    customTipValue = 0;
    totalBillTipPerPerson = 0;
    totalTipAmount = 0;
    noOfPeople = 1;
    displayTotalTip.innerHTML = "$0.00";
    displayTotalPerPerson.innerHTML = "$0.00";
}


theForm.elements["reset"].addEventListener("click", clearAll);

// Get error message when bill input is anything but numbers
function billError() {
    if (bill < 1) {
        billCannotBeZero.innerHTML = "Can't be zero";
        billInput.style.border = "2px solid red";
        displayTotalPerPerson.innerHTML = "$0.00";
        displayTotalTip.innerHTML = "$0.00";
    }
    else if (isNaN(bill)) {
        billCannotBeZero.innerHTML = "Please input numbers only";
        displayTotalPerPerson.innerHTML = "Error";
        displayTotalTip.innerHTML = "Error";
    }
    else {
        billCannotBeZero.innerHTML = "";
        billInput.style.border = "";
    }
}

// Error for: Number of people can't be zero or letters
function noOfPeopleError() {
    if (noOfPeople < 1) {
        noOfPeopleCannotBeZero.innerHTML = "Can't be zero";
        noOfPeopleInput.style.border = "2px solid red";
        displayTotalPerPerson.innerHTML = "Error";
    }
    else if (isNaN(noOfPeople)) {
        noOfPeopleCannotBeZero.innerHTML = "Please input numbers only";
        displayTotalPerPerson.innerHTML = "Error";
    }
    else {
        noOfPeopleCannotBeZero.innerHTML = "";
        noOfPeopleInput.style.border = "";
    }
}

// Error if letter is entered in custom tip input
function customTipError() {
    if (isNaN(customTipValue)) {
        customTipInput.style.border = "2px solid red";
        displayTotalPerPerson.innerHTML = "Error";
        displayTotalTip.innerHTML = "Error";
    } else {
        customTipInput.style.border = "";
    }
}
