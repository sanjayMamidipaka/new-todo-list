const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MailSendRouter = require('./routes/MailSendRouter');


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/sendgrid/api/mailSend', MailSendRouter)


app.get('/', (req, res) => {
  res.send("Hello World");
})


app.listen(5000, () => {
  console.log("listening on port 5000");
});





/*
Goal for today: 
  - errors to watch out for (email handling) make sure correct email. 
*/