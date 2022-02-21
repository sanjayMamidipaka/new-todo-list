const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const SingleSendRouter = require('./routes/SingleSendRouter');
const ContactRouter = require('./routes/ContactRouter');
const SmsRouter = require('./routes/SmsRouter');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/sendgrid/api/singleSend', SingleSendRouter);
app.use('/sendgrid/api/contacts', ContactRouter);
app.use('twilio/api/sms', SmsRouter);


app.get('/', (req, res) => {
  res.send("Hello World");
})


app.listen(3000, () => {
  console.log("listening on port 3000");
});






