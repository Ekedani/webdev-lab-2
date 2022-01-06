import { EmailSender } from './index';
import { ApiError } from '../form-processing/ApiError';
import * as formProcessing from '../form-processing/index';
import sanitizeHtml from 'sanitize-html';

export default class MessageSender {
    constructor(userInformation) {
        this.emailSender = new EmailSender();
        this.userRepository = userInformation;
    }

    async sendFormData(formData, userIP) {
        // Validating data received from the form
        if (
            !formProcessing.isValid(
                formData.firstname,
                formProcessing.NAME_REGEX
            )
        ) {
            throw new ApiError('Invalid first name');
        }
        if (
            !formProcessing.isValid(
                formData.lastname,
                formProcessing.NAME_REGEX
            )
        ) {
            throw new Error('Invalid last name');
        }
        if (
            !formProcessing.isValid(formData.email, formProcessing.EMAIL_REGEX)
        ) {
            throw new Error('Invalid email');
        }
        if (!formData.message.trim().length) {
            throw new Error('Message can not be empty');
        }

        // Generating and sanitizing HTML
        const message = formProcessing.htmlConverter(formData);
        const cleanMessage = sanitizeHtml(message);

        // Sending message
        try {
            await this.emailSender.send(cleanMessage, true);
            return { message: 'Message was successfully sent' };
        } catch (error) {
            throw new ApiError('Sending error', 500);
        }
    }
}
