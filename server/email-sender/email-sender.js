import { createTransport } from 'nodemailer';
import {
  EMAIL_CONFIG,
  EMAIL_USER_CONFIG,
  EMAIL_ADMIN_CONFIG
} from '../config/index.js';

class EmailSender {
  constructor () {
    this.config = EMAIL_CONFIG;
    this.user_config = EMAIL_USER_CONFIG;
    this.transporter = createTransport(this.config);
  }

  send (text, isHtml = false) {
    const from = this.user_config.user;
    return this.transporter.sendMail({
      from,
      to: EMAIL_ADMIN_CONFIG,
      [`${isHtml ? 'html' : 'text'}`]: text
    });
  }
}

export default EmailSender;
