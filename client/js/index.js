import '../css/index.css';
const API_ROUTE = process.env.API_ROUTE;

const callMessageAPI = (data, method) => {
    return fetch(`${API_ROUTE}/messaging`, {
        method,
        'Content-Type': 'application/json',
        body: JSON.stringify(data)
    }).then((response) => response.json());
};

const form = document.querySelector('.contact-form');
const formSubmitButton = form.querySelector('button');
const contentBlock = document.querySelector('.content-blocker');
const spinner = contentBlock.querySelector('.spinner');
const messageBox = contentBlock.querySelector('.message-box');
const messageBoxCloser = messageBox.querySelector('span');

const changeButtonState = (button, isActive) => {
    button.disabled = !isActive;
};

const showBlock = (block) => {
    block.classList.remove('hidden');
};

const showMessage = (message) => {
    hideBlock(spinner);
    const text = messageBox.querySelector('p');
    text.innerHTML = message;
    messageBox.classList.remove('hidden');
};

messageBoxCloser.onclick = function () {
    hideBlock(messageBox);
    hideBlock(contentBlock);
};

const hideBlock = (block) => {
    block.classList.add('hidden');
};

const parseForm = (form) => {
    return Array.from(form.elements).reduce(
        (FormData, { name, value }) => ({ ...FormData, [name]: value }),
        {}
    );
};

const formSender = async (event) => {
    // Prevents the default behaviour when the submit type button is pressed
    event.preventDefault();

    changeButtonState(formSubmitButton, false);
    showBlock(spinner);
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
            showMessage(res.message);
            form.reset();
        }
    } catch (exception) {
        showMessage('Error: ' + exception.message);
    }

    changeButtonState(formSubmitButton, true);
};

formSubmitButton.addEventListener('click', formSender);
