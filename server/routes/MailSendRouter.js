const express = require("express");
const {sendMail} = require('../controllers/mailSendController')

const router = express.Router();

router.get('/', (req, res) => res.send("hello world"))
router.post('/sendMail', sendMail);
module.exports = router;
