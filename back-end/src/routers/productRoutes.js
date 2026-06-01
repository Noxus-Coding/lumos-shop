const express = require('express');
const productController = require('../controllers/productController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.post('/', authMiddleware, productController.create);
router.get('/', productController.index);
router.get('/:id', productController.show);
router.put('/:id', authMiddleware, productController.update);
router.delete('/:id', authMiddleware, productController.remove);

module.exports = router;