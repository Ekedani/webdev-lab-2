const API_ROUTE = 'https://webdev-lab-2-messaging.vercel.app/api';

const callMessageAPI = (data, method) => {
    return fetch(`${API_ROUTE}/messaging`, {
        method,
        'Content-Type': data ? 'application/json' : null,
        body: data ? JSON.stringify(data) : null
    }).then((response) => response.json());
};

const form = document.querySelector('.contact-form');
const formSubmitButton = form.querySelector('button');
const contentBlock = document.querySelector('.content-blocker');

const changeButtonState = (button, isActive) => {
    button.disabled = !isActive;
};

const showBlock = (block) => {
    block.style.visibility = 'visible';
};

const hideBlock = (block) => {
    block.style.visibility = 'hidden';
};

const parseForm = (form) => {
    const formDataJSON = {};
    // Last element in form.elements is submit button
    for (let number = 0; number < form.elements.length - 1; number++) {
        const key = form.elements[number].name;
        formDataJSON[key] = form.elements[number].value;
    }
    return formDataJSON;
};

const formSender = async (event) => {
    // Prevents the default behaviour when the submit type button is pressed
    event.preventDefault();

    changeButtonState(formSubmitButton, false);
    showBlock(contentBlock);

    const formData = parseForm(form);
    try {
        const res = await callMessageAPI(formData, 'POST');
        console.log(res);
        if (res.error) {
            // Error
            throw new Error(res.error);
        } else {
            // Success
            alert(res.message);
            form.reset();
        }
    } catch (exception) {
        alert('Error: ' + exception.message);
    }

    changeButtonState(formSubmitButton, true);
    hideBlock(contentBlock);
};

formSubmitButton.addEventListener('click', formSender);
