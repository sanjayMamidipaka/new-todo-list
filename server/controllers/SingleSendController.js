require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const clientSendGrid = require('@sendgrid/client');
const withinHour = require('../utility/utilityFunctions');
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

const createSingleSend = async (req, res, next) => {
  const dateZulu = req.body.dateZulu;
  let html_content;
  if (withinHour(dateZulu)) {
    html_content = `<strong>You have to do ${req.body.currentTitle} within an hour!</strong>`
  } else {
    html_content = `<strong>You have to do ${req.body.currentTitle} in an hour!</strong>`;
  }
  
  const data = {
    "name": "TodoItem:" + req.body.title,
    send_to: {
      list_ids: [req.body.listId]
    },
    email_config: {
      subject: "Reminder!" + req.body.currentTitle,
      html_content: html_content,
      suppression_group_id: 18085,
      sender_id: 3046677
    }
  };

  const request = {
    url: `/v3/marketing/singlesends`,
    method: 'POST',
    body: data
  }

  console.log(req.body.dateZulu);

  try {
    const response = await clientSendGrid.request(request);
    res.locals.singleSendId = response[0].body.id;
    next();
  } catch(e) {
    console.log(e);
  } 
}

const getAllSingleSends = (req, res, next) => {
  const request = {
    url: `/v3/marketing/singlesends`,
    method: 'GET',
  }
    
  clientSendGrid.request(request)
    .then((response) => {
      console.log(response[0].body.id);
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

// const scheduleSingleSend = async (req, res, next) => {
//   try {
//     const dateZulu = req.body.dateZulu
//     let send_at;


//     console.log(dateZulu);
//     if (withinHour(dateZulu)) {
//       send_at = "now";
//       console.log("SEND NOW!!!");
//     } else {
//       // send an hour before ()
//       send_at = new Date(new Date(dateZulu).getTime() - 3600000).toISOString();
//       console.log("SEND LATER!!!");
//     }

//     data = {
//       "send_at": send_at
//       };
     
    
//     const request = {
//       url: `/v3/marketing/singlesends/${res.locals.singleSendId}/schedule`,
//       method: 'PUT',
//       body: data
//     }
    
//     const response = await clientSendGrid.request(request); 
//     console.log(response);
//   } catch(e) {
//     console.log(e);
//   }
 
// }

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
    getVerifiedSenders
}