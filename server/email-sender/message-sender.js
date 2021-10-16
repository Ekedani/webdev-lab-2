import { EmailSender } from './index';
import * as formProcessing from '../form-processing/index';
import sanitizeHtml from 'sanitize-html';
import {
    MINIMUM_REQUESTS_PAUSE,
    MAXIMUM_REQUESTS_PER_SESSION,
} from '../config/index';

export default class MessageSender {
    constructor(userInformation) {
        this.emailSender = new EmailSender();
        this.userRepository = userInformation;
    }

    async sendFormData(formData, userIP) {
        // Check if user exceeded the request limit
        let currentUser = this.userRepository.get(userIP);
        if (!currentUser) {
            this.userRepository.add(userIP, {
                requests: 0,
                lastRequestDate: new Date(),
            });
            currentUser = this.userRepository.get(userIP);
        }

        if (
            currentUser.requests >= MAXIMUM_REQUESTS_PER_SESSION &&
            new Date() - new Date(currentUser.lastRequestDate) <
            MINIMUM_REQUESTS_PAUSE
        ) {
            throw new Error('You have exceeded the request limit');
        }

        // Validating data received from the form
        if (
            !formProcessing.isValid(
                formData.firstname,
                formProcessing.NAME_REGEX
            )
        ) {
            throw new Error('Invalid first name');
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

        // Generating and sanitizing HTML
        const message = formProcessing.htmlConverter(formData);
        const cleanMessage = sanitizeHtml(message);

        // Sending message
        try {
            await this.emailSender.send(cleanMessage, true);
            return { message: 'Message was successfully sent' };
        } catch (error) {
            throw new Error('Sending error');
        }
    }
}
