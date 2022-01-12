import 'normalize.css';
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
const formSubmitButton = form.querySelector('.submit');
const contentBlock = document.querySelector('.content-blocker');
const spinner = contentBlock.querySelector('.spinner');
const messageBox = contentBlock.querySelector('.message-box');
const messageBoxCloser = messageBox.querySelector('span');

messageBoxCloser.onclick = function () {
    hideBlock(messageBox, contentBlock);
};

const showMessage = (message) => {
    hideBlock(spinner);
    const text = messageBox.querySelector('p');
    text.textContent = message;
    showBlock(messageBox);
};

const showBlock = (...block) => {
    block.forEach((x) => {
        x.classList.remove('hidden');
    });
};

const hideBlock = (...block) => {
    block.forEach((x) => {
        x.classList.add('hidden');
    });
};

const parseForm = (form) => {
    return Array.from(form.elements).reduce(
        (FormData, { name, value }) => ({ ...FormData, [name]: value }),
        {}
    );
};

const formSender = async (event) => {
    showBlock(spinner, contentBlock);
    const formData = parseForm(form);
    try {
        const res = await callMessageAPI(formData, 'POST');
        if (res.error) {
            // Error
            throw new Error(res.error);
        }
        // Success
        showMessage(res.message);
        form.reset();
    } catch (exception) {
        showMessage('Error: ' + exception.message);
    }
};

formSubmitButton.addEventListener('click', formSender);
