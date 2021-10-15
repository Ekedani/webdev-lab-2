import { EmailSender } from './index';
import * as formProcessing from '../form-processing/index';
import sanitizeHtml from 'sanitize-html';

export default class MessageSender {
  constructor () {
    this.emailSender = new EmailSender();
  }

  async sendFormData (formData) {
    // Validating data received from the form
    if (formProcessing.isValid(formData.firstname, formProcessing.NAME_REGEX)) {
      throw new Error('Invalid Firstname');
    }
    if (formProcessing.isValid(formData.lastname, formProcessing.NAME_REGEX)) {
      throw new Error('Invalid Lastname');
    }
    if (formProcessing.isValid(formData.email, formProcessing.EMAIL_REGEX)) {
      throw new Error('Invalid Email');
    }

    // Generating and sanitizing HTML
    const message = formProcessing.htmlConverter(formData);
    const cleanMessage = sanitizeHtml(message);

    // Sending message
    try {
      await this.emailSender.send(cleanMessage, true);
    } catch (error) {
      throw new Error('Sending error');
    }
  }
}
