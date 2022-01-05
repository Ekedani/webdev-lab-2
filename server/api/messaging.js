import { MessageSender } from '../email-sender/index.js';
import { UserRepository } from '../user-data/user-repository';
import { ApiError } from '../form-processing/ApiError';

// For keeping information about user IP
const userInformation = new UserRepository();
const messageSender = new MessageSender(userInformation);

export default (req, res) => {
    try {
        const userIP =
            (req.headers['x-forwarded-for'] || '').split(',')[0] ||
            req.connection.remoteAddress;
        if (!req.body) {
            throw new ApiError('Request is empty');
        }
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
