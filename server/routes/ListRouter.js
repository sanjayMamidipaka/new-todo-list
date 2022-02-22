const express = require('express');
const {getLists, createList} = require('../controllers/ListController');
const router = express.Router();

router.get('/', (req, res) => res.send("hello world"));
router.get('/getLists', getLists);
router.post('/createList', createList);

module.exports = router;