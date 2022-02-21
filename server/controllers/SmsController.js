require('dotenv').config();
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const twilio = require('twilio');
const clientTwilio = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendMessage = async (req, res) => {
    // we need to store this todoList
    // add webhooks for display todolist stuff (if message sent);
    try {
      console.log(req.body);
      const message = await clientTwilio.messages.create({
        body: 'bitch',
        to: '+16783739202', // Text this number
        from: '+16787306018', // From a valid Twilio number
      })
      res.send(message);
    } catch(e) {
      console.log(e);
    } 
}

const replyToMessage = (req, res, next) => {
    const twiml = new MessagingResponse();
    if (req.body.Body === "Todo list") {
      twiml.message("here are your todo Items!");
    } else {
      twiml.message("Hey bitch lol");
    }
    console.log(req.body.Body.toLowerCase())
    res.send(twiml.toString());
}

module.exports = {
    sendMessage,
    replyToMessage
}