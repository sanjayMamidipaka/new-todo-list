require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const clientSendGrid = require('@sendgrid/client');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
clientSendGrid.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Sends an email immidiately to a recipient.
 * @param {*} req 
 * @param {*} res 
 */
const sendEmail = (req, res, next) => {

    const msg = {
      to: 'tkamal8@gatech.edu',
      from: 'tawsifkamal123@gmail.com', 
      subject: 'todo-today',
      text: 'Today',
      html: `<strong>Today you have to do on this date</strong>`,
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
}

const createSingleSend = (req, res, next) => {
  const data = {
    "name": "Miss Christine Morgan",
    send_to: {
      all: true
    },
    email_config: {
      subject: "test Email",
      html_content: "<strong>Today you have haha to do on this date</strong>",
      suppression_group_id: 18085,
      sender_id: 3046677
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
      res.send("Success");
    })
    .catch(error => {
      console.error(error.response.body);
      res.send(error);
    });
}

const getAllSingleSends = (req, res, next) => {
  const request = {
    url: `/v3/marketing/singlesends`,
    method: 'GET',
  }
    
  clientSendGrid.request(request)
    .then((response) => {
      console.log(response[0].body);
      res.send(JSON.stringify(response));
    })
    .catch(error => {
      console.error(error);
      res.send(error);
    });
}

const updateSingleSend = (req, res, next) => {
  const id = "c52f71e5-933e-11ec-b4e4-f62412e742cf";
  const data = {
    "name": "Miss Christine Morgan",
    email_config: {
      "suppression_group_id": 18085,
      "sender_id": 3046677,
      "subject": "test Email",
      "html_content": "<strong>Today you have haha to do on this date</strong>"
    },
    send_to: {
      all: true
    }
  };

  const request = {
    url: `/v3/marketing/singlesends/${id}`,
    method: 'PATCH',
    body: data
  }

  clientSendGrid.request(request)
    .then((response) => {
      console.log(response)
    })
    .catch(error => {
      console.error(error);
    });
}

const scheduleSingleSend = (req, res, next) => {
  const id = "d95d7ffd-933f-11ec-a7ee-823255f80a5a";
  const data = {
  "send_at": "now"
  };

  const request = {
    url: `/v3/marketing/singlesends/${id}/schedule`,
    method: 'PUT',
    body: data
  }

  clientSendGrid.request(request)
    .then((response) => {
      console.log(response);
      console.log(response);
    })
    .catch(error => {
      console.error(error.response.body);
    });
}

const getVerifiedSenders = (req, res, next) => {
  const request = {
    url: `/v3/verified_senders`,
    method: 'GET'
  }

  clientSendGrid.request(request)
    .then(response => {
      console.log(response[0].body.results[0].id);
    })
    .catch(error => {
      console.error(error);
    });
}

module.exports = {
    sendEmail,
    createSingleSend,
    getAllSingleSends,
    updateSingleSend,
    scheduleSingleSend,
    getVerifiedSenders
}