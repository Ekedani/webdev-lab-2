import { EmailSender } from './index';
import htmlConverter from "../form-processing/html-converter";

export default class MessageSender {
  constructor () {
    this.emailSender = new EmailSender();
  }

  async sendFormData (formData) {
    const message = htmlConverter(formData);
    await this.emailSender.send(message, true);
  }
}
