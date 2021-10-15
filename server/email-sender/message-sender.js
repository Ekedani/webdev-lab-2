import { EmailSender } from './index';
import htmlConverter from "../form-processing/html-converter";
import sanitizeHtml from 'sanitize-html'

export default class MessageSender {
  constructor () {
    this.emailSender = new EmailSender();
  }

  async sendFormData (formData) {
    const message = htmlConverter(formData);
    const cleanMessage = sanitizeHtml(message);
    await this.emailSender.send(cleanMessage, true);
  }
}
