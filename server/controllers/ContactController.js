require('dotenv').config();
const clientSendGrid = require('@sendgrid/client');
clientSendGrid.setApiKey(process.env.SENDGRID_API_KEY);

const createContact = (req, res, next) => { 
    const data = {
      "contacts": [
        {
          "email": "tkamal8@gatech.edu"
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
}

module.exports = {
    createContact
}