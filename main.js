const inputs = document.querySelectorAll('.input');
const percentageBtns = document.querySelectorAll('.percentage');
const customTipInput = document.querySelector('.tips input');
const totalBill = document.getElementById('bill');
const peopleInput = document.getElementById('people');
const tipAmount = document.getElementById('tipAmount');
const totalAmount = document.getElementById('totalAmount');
const resetBtn = document.getElementById('reset');

let selectedTip = 0;

// styles depending on input values + alert messages
const handleChange = () => {
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            const value = input.value;
            let alertMsg = input.parentNode.querySelector('.alert');

            if(!alertMsg){
                alertMsg = document.createElement('div');
                alertMsg.classList.add('alert');
                input.parentNode.appendChild(alertMsg);
            }

            if(value === ''){
                input.classList.add('invalid');
                input.classList.remove('valid');
                alertMsg.textContent = "Can't be empty";
            } else if(Number(value) === 0){
                input.classList.add('invalid');
                input.classList.remove('valid');
                alertMsg.textContent = "Can't be zero";
            } else if(Number(value) < 0){
                input.classList.add('invalid');
                input.classList.remove('valid');
                alertMsg.textContent = "Can't be negative";
            } else {
                reset.classList.add('onInput');
                input.classList.add('valid');
                input.classList.remove('invalid');
                alertMsg.textContent = '';
            }

            calculateTotal();
        });
    })
}

// select the button and apply correct styling -> except custom
const handleButtons = () => {
    percentageBtns.forEach(percent => 
        percent.addEventListener('click', (e) => {
            e.preventDefault();

            if(percent.tagName === 'INPUT') return;

            percentageBtns.forEach(btn => btn.classList.remove('selected'));
            percent.classList.add('selected');
            selectedTip = parseFloat(percent.textContent) / 100;
            customTipInput.value = '';
            calculateTotal();
        })
    );
} 

// get values for bill, tip and number of people values
const getValues = () => {
    const bill = parseFloat(totalBill.value) || 0;
    const people = parseInt(peopleInput.value) || 1;
    const tip = isNaN(selectedTip) ? 0 : selectedTip;
    return { bill, people, tip };
};

// divide bill and people
const division = (bill, people) => {
    const result = bill / people;
    return result;
}

// calculate tip and total for the correct fields
const calculateTotal = () => {
    const { bill, people, tip } = getValues();
    const tipPerPerson = division(bill, people) * tip;
    const totalPerPerson = division(bill, people) + tipPerPerson;

    tipAmount.textContent = tipPerPerson.toFixed(2);
    totalAmount.textContent = totalPerPerson.toFixed(2);
}

// custom tip input
customTipInput.addEventListener('input', () => {
    percentageBtns.forEach(btn => btn.classList.remove('selected'));
    selectedTip = parseFloat(customTipInput.value) / 100;
    calculateTotal();
});

resetBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const allInputs = document.querySelectorAll('input');
    allInputs.forEach(input => {
        const alertMsg = input.parentNode.querySelector('.alert');
        if (alertMsg) {
            alertMsg.remove();
        }
        input.value = '';
        input.classList.add('valid');
        input.classList.remove('invalid');
        input.style.outline = 'none';
        selectedTip = 0;
        customTipInput.value = '';
        percentageBtns.forEach(btn => btn.classList.remove('selected'));
        tipAmount.textContent = '0.00';
        totalAmount.textContent = '0.00';
    });
});

handleChange();
handleButtons();