const cardNameDisplay = document.querySelector('.card-name-display');
const cardNumberDisplay = document.querySelector('.card-number-display');
const cardExpMonthDisplay = document.querySelector('.card-exp-month-display');
const cardExpYearDisplay = document.querySelector('.card-exp-year-display');
const cardCvcDisplay = document.querySelector('.card-cvc-display');

const cardForm = document.getElementById('card-form');
const nameInput = document.getElementById('cardholder-name');
const numberInput = document.getElementById('card-number');
const expMonthInput = document.getElementById('exp-month');
const expYearInput = document.getElementById('exp-year');
const cvcInput = document.getElementById('cvc');

const completedState = document.querySelector('.completed-state');
const continueBtn = document.getElementById('continue-btn');

function showError(inputElement, message) {
    const formGroup = inputElement.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    inputElement.classList.add('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearError(inputElement) {
    const formGroup = inputElement.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    inputElement.classList.remove('error');
    errorElement.style.display = 'none';
}

function formatCardNumber(value) {
    return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
}


nameInput.addEventListener('input', () => {
    cardNameDisplay.textContent = nameInput.value || 'Jane Appleseed';
});

numberInput.addEventListener('input', () => {
    numberInput.value = formatCardNumber(numberInput.value);
    cardNumberDisplay.textContent = numberInput.value || '0000 0000 0000 0000';
});

expMonthInput.addEventListener('input', () => {
    cardExpMonthDisplay.textContent = expMonthInput.value || '00';
});

expYearInput.addEventListener('input', () => {
    cardExpYearDisplay.textContent = expYearInput.value || '00';
});

cvcInput.addEventListener('input', () => {
    cardCvcDisplay.textContent = cvcInput.value || '000';
});


cardForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    if (nameInput.value.trim() === '') {
        showError(nameInput, "Can't be blank");
        isValid = false;
    } else {
        clearError(nameInput);
    }

    const numberRegex = /^[0-9\s]+$/;
    if (numberInput.value.trim() === '') {
        showError(numberInput, "Can't be blank");
        isValid = false;
    } else if (!numberRegex.test(numberInput.value)) {
        showError(numberInput, "Wrong format, numbers only");
        isValid = false;
    } else if (numberInput.value.replace(/\s/g, '').length !== 16) {
        showError(numberInput, "Must be 16 digits");
        isValid = false;
    } else {
        clearError(numberInput);
    }
    
    let expDateValid = true;
    const month = expMonthInput.value.trim();
    const year = expYearInput.value.trim();
    const dateRegex = /^[0-9]{2}$/;
    if (month === '' || year === '') {
        showError(expMonthInput, "Can't be blank");
        expDateValid = false;
        isValid = false;
    } else if (!dateRegex.test(month) || !dateRegex.test(year) || month < 1 || month > 12) {
        showError(expMonthInput, "Invalid date");
        expDateValid = false;
        isValid = false;
    }
    
    if (expDateValid) {
        clearError(expMonthInput);
    }


    if (cvcInput.value.trim() === '') {
        showError(cvcInput, "Can't be blank");
        isValid = false;
    } else if (!/^[0-9]{3}$/.test(cvcInput.value.trim())) {
        showError(cvcInput, "Must be 3 digits");
        isValid = false;
    } else {
        clearError(cvcInput);
    }

    if (isValid) {
        cardForm.style.display = 'none';
        completedState.style.display = 'flex';
        completedState.style.flexDirection = 'column';
    }
});


continueBtn.addEventListener('click', () => {
    cardForm.reset(); 
    
    cardNameDisplay.textContent = 'Jane Appleseed';
    cardNumberDisplay.textContent = '0000 0000 0000 0000';
    cardExpMonthDisplay.textContent = '00';
    cardExpYearDisplay.textContent = '00';
    cardCvcDisplay.textContent = '000';

    clearError(nameInput);
    clearError(numberInput);
    clearError(expMonthInput);
    clearError(cvcInput);

    completedState.style.display = 'none';
    cardForm.style.display = 'block';
});

