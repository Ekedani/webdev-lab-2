import { EmailSender } from './index';

export default class MessageSender {
  constructor () {
    this.emailSender = new EmailSender();
  }

  async sendFormData () {
    this.emailSender.send('<h1>Hello World!</h1>', true);
  }
}
