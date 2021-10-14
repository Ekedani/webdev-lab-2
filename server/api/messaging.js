import { MessageSender } from '../email-sender/index.js';

const messageSender = new MessageSender();

export default (req, res) => {
  try {
    const formData = JSON.parse(req.body);
    messageSender.sendFormData(formData).then(res.send).catch(res.send);
  } catch (error) {
    res.send('ERROR');
  }
};
