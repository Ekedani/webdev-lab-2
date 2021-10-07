const form = document.querySelector('.contact-form');
const formSubmitButton = form.querySelector('button');
//const formMessage = form.querySelector('textarea');
const contentBlock = document.querySelector('.content-block');

const changeButtonState = (button, isActive) => {
    button.disabled = !isActive;
};

const showBlock = (block) => {
    block.style.visibility = 'visible';
};

const hideBlock = (block) => {
    block.style.visibility = 'hidden';
};

const formSender = async () => {
    changeButtonState(formSubmitButton, false);
    showBlock(contentBlock);
};

formSubmitButton.addEventListener('click', formSender);
