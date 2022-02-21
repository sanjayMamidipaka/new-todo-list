const express = require('express');
const router = express.Router();

const {sendMessage, replyToMessage} = require('../controllers/SmsController');

router.get('/', (req, res) => {
    res.send("hello world");
})

router.post('/sendMessage', sendMessage);
router.post('/replyToMessage', replyToMessage);
  
module.exports = router;