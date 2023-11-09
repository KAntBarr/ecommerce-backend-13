const router = require('express').Router();
const { productController } = require('../../controllers');

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  productController.getProducts(req, res);
});

// get one product
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  productController.getProductByID(req, res);
});

// create new product
router.post('/', (req, res) => {
  productController.postProduct(req, res);
});

// update product
router.put('/:id', (req, res) => {
  productController.updateProduct(req, res);
});

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
  productController.deleteProduct(req, res);
});

module.exports = router;
