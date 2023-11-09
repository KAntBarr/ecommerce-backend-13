const router = require('express').Router();
const { productController } = require('../../controllers');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  await productController.getProducts(req, res);
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  await productController.getProductByID(req, res);
});

// create new product
router.post('/', async (req, res) => {
  await productController.postProduct(req, res);
});

// update product
router.put('/:id', async (req, res) => {
  await productController.updateProduct(req, res);
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  await productController.deleteProduct(req, res);
});

module.exports = router;
