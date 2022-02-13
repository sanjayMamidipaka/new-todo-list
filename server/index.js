const twilio = require('twilio');
const express = require('express');
const app = express();


const accountSid = 'AC116affc12b53e7b291e63610ac528ecd'; // Your Account SID from www.twilio.com/console
const authToken = '60a25493c1a48207a514d0f61f9866a0'; // Your Auth Token from www.twilio.com/console
const client = new twilio(accountSid, authToken);

app.get('/', (req, res) => {

  
  client.messages
  .create({
    body: 'bitch',
    to: '+17017400406', // Text this number
    from: '+18647326530', // From a valid Twilio number
  })
  .then((message) => console.log(message))
  .catch(message => console.log(message));
  res.send("hello world");
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});



