require('dotenv').config();
const clientSendGrid = require('@sendgrid/client');
clientSendGrid.setApiKey(process.env.SENDGRID_API_KEY);

const createContact = async (req, res, next) => {
    // update email error handling
    const data = {
      "list_ids": [
        res.locals.listId
      ],
      "contacts": [
        {
          "email": req.body.email
        }
      ]
    };

    const request = {
      url: `https://api.sendgrid.com/v3/marketing/contacts`,
      method: 'PUT',
      body: data
    }

    try {
      await clientSendGrid.request(request);
      res.send(res.locals.listId);
    } catch(e) {
      console.log(e);
      res.send(e);
    }    
}

const getAllContacts = async (req, res, next) => {

  const request = {
    url: `/v3/marketing/contacts`,
    method: 'GET',
  }
  
  try {
    const response = await clientSendGrid.request(request);
    console.log(response);
    res.send(response);
  } catch(e) {
    console.log(e);
    res.send(e);
  }
  
    
}

module.exports = {
    createContact,
    getAllContacts
}