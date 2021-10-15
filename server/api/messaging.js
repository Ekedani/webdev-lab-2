import { MessageSender } from '../email-sender/index.js';

const messageSender = new MessageSender();

export default (req, res) => {
  try {
    if (!req.body) {
      throw new Error('Request is empty');
    }
    const formData = JSON.parse(req.body);
    messageSender.sendFormData(formData).then(res.send).catch(function (error) {
      res.send({ error: error.message });
    });
  } catch (error) {
    res.send({ error: error.message });
  }
};
