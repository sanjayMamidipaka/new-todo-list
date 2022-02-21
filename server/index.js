require('dotenv').config();
const twilio = require('twilio');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');
const app = express();
const accountSid = 'AC116affc12b53e7b291e63610ac528ecd'; // Your Account SID from www.twilio.com/console
const authToken = 'e7ca4d026e3eba257b038935f14e6695'; // Your Auth Token from www.twilio.com/console
const sgMail = require('@sendgrid/mail');
const client = new twilio(accountSid, authToken);
const clientSendGrid = require('@sendgrid/client');
clientSendGrid.setApiKey(process.env.SENDGRID_API_KEY);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/sendMessage', async (req, res) => {
  // we need to store this todoList
  // add webhooks for display todolist stuff (if message sent);
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
  // add dynamic templates if possible?

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

app.post('/sendReply', (req, res) => {
  const twiml = new MessagingResponse();
  if (req.body.Body === "Todo list") {
    twiml.message("here are your todo Items!");
  } else {
    twiml.message("Hey bitch lol");
  }
  console.log(req.body.Body.toLowerCase())
  res.send(twiml.toString());
})

app.get('/', (req, res) => {
  res.send("Hello World");
})

app.get('/createContact', (req, res) => {
  const data = {
    "contacts": [
      {
        "email": "ryan39@lee-young.com"
      }
    ]
  };
  
  const request = {
    url: `https://api.sendgrid.com/v3/marketing/contacts`,
    method: 'PUT',
    body: data
  }
  
  clientSendGrid.request(request)
    .then((response) => {
      console.log(response);
    })
    .catch(error => {
      console.error(error.response.body);
    });
})

app.get('/createSingleSend', (req, res) => {

  const data = {
    "name": "Miss Christine Morgan",
    send_to: {
      all: true
    },
    email_config: {
      subject: "test Email",
      html_content: "<strong>Today you have haha to do on this date</strong>"
    }
  };

  const request = {
    url: `/v3/marketing/singlesends`,
    method: 'POST',
    body: data
  }

  clientSendGrid.request(request)
    .then((response) => {
      console.log(response);
  
    })
    .catch(error => {
      console.error(error);
    });
  })

app.listen(3000, () => {
  console.log("listening on port 3000");
});





