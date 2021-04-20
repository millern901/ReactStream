const { Router } = require('express');
const orderController = require('../../controllers/orderControllers');
const router = Router();

router.post('/',orderController.checkout);

module.exports = router;