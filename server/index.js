const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const SingleSendRouter = require('./routes/SingleSendRouter');
const ContactRouter = require('./routes/ContactRouter');
const SmsRouter = require('./routes/SmsRouter');
const ListRouter = require('./routes/ListRouter');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/sendgrid/api/singleSend', SingleSendRouter);
app.use('/sendgrid/api/contacts', ContactRouter);
app.use('/sendgrid/api/lists/', ListRouter);
app.use('twilio/api/sms', SmsRouter);


app.get('/', (req, res) => {
  res.send("Hello World");
})


app.listen(5000, () => {
  console.log("listening on port 5000");
});





/*
Goal for today: 
  - take email from frontend and add it to contacts
  - allow scheduling tasks 
*/