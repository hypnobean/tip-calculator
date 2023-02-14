const theForm = document.forms["tipCalc"];
let bill = 0;
let tipButtonValue = 0;
let customTipValue = 0;
let totalBillTipPerPerson = 0;
let totalTipAmount = 0;
let noOfPeople = 1;


// Bill total input value
theForm.elements["bill"].addEventListener("input", function() {
    bill = Number(theForm.elements[0].value);
    console.log(bill);
});





// Get value of button clicked, clear custom tip input
for (var i = 0; i < theForm.elements["tip-btn"].length; i++)    {
    theForm.elements["tip-btn"][i].addEventListener("input", function() {
        tipButtonValue = Number((this.value) / 100);
        console.log(tipButtonValue);

    })
    theForm.elements["tip-btn"][i].addEventListener("click", function() {
        theForm.elements["customPerCent"].value = "";
        customTipValue = 0;
        })
}



// Get Value of Custom Tip
theForm.elements["customPerCent"].addEventListener("input", function() {
    customTipValue = Number((theForm.elements["customPerCent"].value) / 100);
    console.log(customTipValue);
});


// When custom tip is clicked, clear tip buttons
theForm.elements["customPerCent"].addEventListener("click", function() {
    for (var i = 0; i < document.querySelectorAll('input[type="radio"]').length; i++) {
        document.querySelectorAll('input[type="radio"]')[i].checked = false;
        tipButtonValue = 0;
    }
});





// Number of People
theForm.elements["noOfPeople"].addEventListener("input", function() {
    noOfPeople = Number(theForm.elements["noOfPeople"].value);
    console.log(noOfPeople);
});






// Update the totals on screen
function updateTipTotal() {
    if (customTipValue > 0) {
        totalTipAmount = bill * customTipValue;
    }
    else if (tipButtonValue > 0) {
        totalTipAmount = bill * tipButtonValue;
    }

    document.getElementById("tipTotal").innerHTML = "$" + parseFloat(totalTipAmount).toFixed(2);
}


function updateTotalPerPerson() {
    totalBillTipPerPerson = (bill + totalTipAmount) / noOfPeople;
    document.getElementById("totalPerPerson").innerHTML = "$" + parseFloat(totalBillTipPerPerson).toFixed(2);
}



for (i = 0; i < theForm.elements.length; i++) {
    theForm.elements[i].addEventListener("input", updateTipTotal, false);
}

for (i = 0; i < theForm.elements.length; i++) {
    theForm.elements[i].addEventListener("input", updateTotalPerPerson, false);
}




// Get reset button to clear all values and update innerHTML back to $0.00
theForm.elements["reset"].addEventListener("click", function() {
    bill = 0;
    tipButtonValue = 0;
    customTipValue = 0;
    totalBillTipPerPerson = 0;
    totalTipAmount = 0;
    noOfPeople = 1;
    document.getElementById("tipTotal").innerHTML = "$0.00";
    document.getElementById("totalPerPerson").innerHTML = "$0.00";
})

// Error for: Number of people can't be zero or letters
theForm.elements["noOfPeople"].addEventListener("input", function() {
    if (noOfPeople < 1) {
        document.getElementsByClassName("zero")[1].innerHTML = "Can't be zero";
        theForm.elements["noOfPeople"].style.border = "2px solid red";
        document.getElementById("totalPerPerson").innerHTML = "Error";
    }
    else if (isNaN(noOfPeople)) {
        document.getElementsByClassName("zero")[1].innerHTML = "Please input numbers only";
        document.getElementById("totalPerPerson").innerHTML = "Error";
    }
    else {
        document.getElementsByClassName("zero")[1].innerHTML = "";
        theForm.elements["noOfPeople"].style.border = "";
    }
})

// Get error message when bill input is anything but numbers
theForm.elements["bill"].addEventListener("input", function() {
    if (bill < 1) {
        document.getElementsByClassName("zero")[0].innerHTML = "Can't be zero";
        theForm.elements["bill"].style.border = "2px solid red";
        document.getElementById("totalPerPerson").innerHTML = "Error";
        document.getElementById("tipTotal").innerHTML = "Error";
    }
    else if (isNaN(bill)) {
        document.getElementsByClassName("zero")[0].innerHTML = "Please input numbers only";
        document.getElementById("totalPerPerson").innerHTML = "Error";
        document.getElementById("tipTotal").innerHTML = "Error";
    }
    else {
        document.getElementsByClassName("zero")[0].innerHTML = "";
        theForm.elements["bill"].style.border = "";
    }
})