import { MessageSender } from '../email-sender/index.js';
import { UserRepository } from '../user-data/user-repository';
import { ApiError } from '../form-processing/ApiError';
import {
    MAXIMUM_REQUESTS_PER_SESSION,
    MINIMUM_REQUESTS_PAUSE
} from '../config';

// For keeping information about user IP
const userRepository = new UserRepository();
const messageSender = new MessageSender();

export default async (req, res) => {
    try {
        const userIP =
            (req.headers['x-forwarded-for'] || '').split(',')[0] ||
            req.connection.remoteAddress;

        const currentDate = new Date();
        // Check if user exceeded the request limit
        const currentUser = userRepository.get(userIP) || {
            requests: 0,
            lastRequestDate: currentDate
        };

        if (
            currentUser.requests >= MAXIMUM_REQUESTS_PER_SESSION &&
            currentDate - new Date(currentUser.lastRequestDate) <
                MINIMUM_REQUESTS_PAUSE
        ) {
            throw new ApiError('You have exceeded the request limit', 429);
        }

        // Update information about user in repo
        userRepository.add(userIP, {
            requests: currentUser.requests + 1,
            lastRequestDate: currentDate
        });

        if (!req.body) {
            throw new ApiError('Request is empty', 204);
        }

        const formData = JSON.parse(req.body);
        const resultData = await messageSender.sendFormData(formData);
        res.send(resultData);
    } catch (error) {
        res.status(error.status || 500).send({ error: error.message });
    }
};
