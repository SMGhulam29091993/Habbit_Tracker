const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');
const habbitController  = require('../controllers/habbit_controller');

router.get('/',homeController.home);
router.post('/create-habbit',habbitController.create);


module.exports = router;