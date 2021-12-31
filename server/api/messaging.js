import { MessageSender } from '../email-sender/index.js';
import { UserRepository } from '../user-data/user-repository';

// For keeping information about user IP
const userInformation = new UserRepository();
const messageSender = new MessageSender(userInformation);

export default (req, res) => {
    try {
        const userIP =
            (req.headers['x-forwarded-for'] || '').split(',')[0] ||
            req.connection.remoteAddress;
        if (!req.body) {
            throw new Error('Request is empty');
        }
        const formData = JSON.parse(req.body);
        messageSender.sendFormData(formData, userIP).then(res.send);
    } catch (error) {
        res.send({ error: error.message });
    }
};
