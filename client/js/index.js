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
  try {
    const res = callMessageAPI(formData, 'POST');
  } catch (exception) {
    alert('Unknown error happened');
  }
  changeButtonState(formSubmitButton, true);
  hideBlock(contentBlock);
};

formSubmitButton.addEventListener('click', formSender);
