const form = document.querySelector('.contact-form');
const formSubmitButton = form.querySelector('button');
// const formMessage = form.querySelector('textarea');
const contentBlock = document.querySelector('.content-block');

const changeButtonState = (button, isActive) => {
  button.disabled = !isActive;
};

const showBlock = (block) => {
  block.style.visibility = 'visible';
};

/* const hideBlock = (block) => {
  block.style.visibility = 'hidden'
} */

const parseForm = (form) => {
  const formDataJSON = {};
  new FormData(form).forEach((value, key) => {
    formDataJSON[key] = value;
  });
  return formDataJSON;
};

const formSender = async (event) => {
  // Prevents the default behaviour when the submit type button is pressed
  event.preventDefault();

  changeButtonState(formSubmitButton, false);
  showBlock(contentBlock);

  const formData = parseForm(form);
};

formSubmitButton.addEventListener('click', formSender);
