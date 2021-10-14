import { MessageSender } from '../email-sender/index.js';

const messageSender = new MessageSender();

export default (req, res) => {
  try {
    messageSender.sendFormData().then(res.send).catch(res.send);
  } catch (error) {
    res.send('ERROR');
  }
};
