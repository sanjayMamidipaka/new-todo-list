// Router for singleSend API
const express = require("express");
const { sendEmail,
    createSingleSend,
    getAllSingleSends,
    updateSingleSend, 
    scheduleSingleSend,
    getVerifiedSenders
 } = require("../controllers/SingleSendController");
 
 
const router = express.Router();

router.get('/', (req, res) => {
    res.send("hello world");
})

router.get('/sendEmail', sendEmail);
router.get('/getAllSingleSends', getAllSingleSends);
router.get('/updateSingleSend', updateSingleSend);
router.get('/getVerifiedSenders', getVerifiedSenders);

module.exports = router; 