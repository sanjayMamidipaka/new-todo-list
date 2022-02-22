const clientSendGrid = require('@sendgrid/client');
clientSendGrid.setApiKey(process.env.SENDGRID_API_KEY);


const createList = async (req, res, next) => {
    const data = {
        "name": req.body.email
      };
      
      const request = {
        url: `/v3/marketing/lists`,
        method: 'POST',
        body: data
      }
    try {
        const response = await clientSendGrid.request(request);
        res.locals.listId = response[0].body.id;
        next()
    } catch(e) {
        res.send(e);
    }
}

const getLists = async (req, res, next) => {
    const request = {
        url: `/v3/marketing/lists`,
        method: 'GET'
      }

    try {
        const response = await clientSendGrid.request(request);
        res.send(response);
    } catch(e) {
        res.send(e);
    }
}

module.exports = {
    createList,
    getLists
}


