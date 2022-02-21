const {createContact} = require('../controllers/ContactController');

// Router for contact API
const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.send("hello world");
})

router.get('/createContact', createContact);


module.exports = router; 