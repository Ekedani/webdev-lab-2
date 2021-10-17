import { createTransport } from 'nodemailer';
import {
    EMAIL_CONFIG,
    EMAIL_USER_CONFIG,
    EMAIL_ADMIN_CONFIG
} from '../config/index.js';

class EmailSender {
    constructor() {
        this.config = EMAIL_CONFIG;
        this.user_config = EMAIL_USER_CONFIG;
        this.transporter = createTransport(this.config);
    }

    send(text, isHtml = false) {
        return this.transporter.sendMail({
            from: `"Nodemailer Form" <${this.user_config.user}>`,
            to: EMAIL_ADMIN_CONFIG,
            subject: 'Contact Form',
            [`${isHtml ? 'html' : 'text'}`]: text
        });
    }
}

export default EmailSender;
