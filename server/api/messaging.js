import { MessageSender } from '../email-sender/index.js';
import { UserRepository } from '../user-data/user-repository';
import { ApiError } from '../form-processing/ApiError';
import {
    MAXIMUM_REQUESTS_PER_SESSION,
    MINIMUM_REQUESTS_PAUSE
} from '../config';

// For keeping information about user IP
const userInformation = new UserRepository();
const messageSender = new MessageSender(userInformation);

export default (req, res) => {
    const userIP =
        (req.headers['x-forwarded-for'] || '').split(',')[0] ||
        req.connection.remoteAddress;

    const currentDate = new Date();
    // Check if user exceeded the request limit
    let currentUser = userInformation.get(userIP);
    if (!currentUser) {
        this.userRepository.add(userIP, {
            requests: 0,
            lastRequestDate: currentDate
        });
        currentUser = this.userRepository.get(userIP);
    }

    try {
        if (!req.body) {
            throw new ApiError('Request is empty', 204);
        }

        if (
            currentUser.requests >= MAXIMUM_REQUESTS_PER_SESSION &&
            currentDate - new Date(currentUser.lastRequestDate) <
                MINIMUM_REQUESTS_PAUSE
        ) {
            throw new ApiError('You have exceeded the request limit', 429);
        }

        // Update information about user in repo
        this.userRepository.add(userIP, {
            requests: currentUser.requests + 1,
            lastRequestDate: currentDate
        });

        const formData = JSON.parse(req.body);
        messageSender
            .sendFormData(formData, userIP)
            .then(res.send)
            .catch(function (error) {
                res.status(error.status).send({ error: error.message });
            });
    } catch (error) {
        res.status(error.status).send({ error: error.message });
    }
};
