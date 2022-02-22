const {createContact, getAllContacts} = require('../controllers/ContactController');
const {createList} = require('../controllers/ListController');

// Router for contact API
const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.send("hello world");
})

router.put('/createContact', createList, createContact);
router.get('/getContacts', getAllContacts);


module.exports = router; 