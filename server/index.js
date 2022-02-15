require('dotenv').config();
const twilio = require('twilio');
const express = require('express');
const app = express();


const accountSid = 'AC116affc12b53e7b291e63610ac528ecd'; // Your Account SID from www.twilio.com/console
const authToken = 'e7ca4d026e3eba257b038935f14e6695'; // Your Auth Token from www.twilio.com/console
const sgMail = require('@sendgrid/mail');
const { response } = require('express');
const client = new twilio(accountSid, authToken);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(express.json());

app.post('/sendMessage', async (req, res) => {
  // we need to store this todoList
  try {
    console.log(req.body);
    const message = await client.messages.create({
      body: 'bitch',
      to: '+16783739202', // Text this number
      from: '+16787306018', // From a valid Twilio number
    })
    res.send(message);
  } catch(e) {
    console.log(e);
  } 
});

app.post('/sendEmail', async (req, res) => {
  console.log(req.body);
  // add scheduling 
  // 
  const msg = {
    to: 'tkamal8@gatech.edu', // Change to your recipient
    from: 'tawsifkamal123@gmail.com', // Change to your verified sender
    subject: 'todo-today ' + req.body.title,
    text: 'Today',
    html: `<strong>Today you have ${req.body.title} to do on ${req.body.date} this date</strong>`,
  }
  sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent');
  })
  .catch((error) => {
    console.error(error)
  })

  res.send("email sent");
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});



