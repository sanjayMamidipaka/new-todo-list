require('dotenv').config();
const clientSendGrid = require('@sendgrid/mail');
const { validateRequestWithBody } = require('twilio/lib/webhooks/webhooks');
const withinHour = require('../utility/utilityFunctions');
clientSendGrid.setApiKey(process.env.SENDGRID_API_KEY);

async function sendMail(req, res, next) {
   try {
        
        let dateZulu = Math.round((new Date(req.body.dateZulu).getTime() - 3600000) / 1000);
        let time = "In";

        if (withinHour(req.body.dateZulu)) {
            dateZulu = Math.round(Date.now() / 1000);
            time = "Within";
            // console.log("SEND NOW"); 
        } else {
            // console.log("SEND LATER"); 
        }

        const message = {
            personalizations: [
                {

                 to: [
                     {
                         email: req.body.email
                     }
                 ],
                
                 dynamic_template_data: {
                     "task": req.body.currentTitle,
                     "time": time,
                     "tags": req.body.stringifiedTags
                 },

                 send_at: dateZulu // unix timestamp "NOW" in seconds 
                }
            ],

            from: {
                email: "todolist.reminders@gmail.com"
            },

            reply_to: {
                email: "todolist.reminders@gmail.com"
            },

            subject: "Reminder! " + req.body.title + " due in 1hr!",

            template_id: process.env.SENDGRID_DYNAMIC_EMAIL_ID,

            asm: {
                group_id: parseInt(process.env.SENDGRID_UNSUBSCRIBE_GROUP_ID)
            }
        }

        await clientSendGrid.send(message);
    
   } catch(e) {
        let schedulingError = true;

        if (e.response === null) {
            schedulingError = false;
        }

        if (schedulingError) {
            e.response.body.errors.filter(error => {
                if (error.message.includes("Scheduling more than")) {
                    schedulingError = true;
                    console.log("scheduling error")
                    res.send("Cannot schedule event past 72hrs!");
                }
            });
        } else {
            res.send(e);
        }
   }
}

module.exports = {
    sendMail
}
