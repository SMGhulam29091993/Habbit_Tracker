const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');
const habbitController  = require('../controllers/habbit_controller');
const updateHabbit_Controller =  require('../controllers/updateHabbit_controller');

router.get('/',homeController.home);
router.post('/create-habbit',habbitController.create);
router.get(`/update/habbit/:id` ,updateHabbit_Controller.update);


module.exports = router;