const router = require('express').Router();
const { categoryController } = require('../../controllers');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  await categoryController.getCategories(req, res);

});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  await categoryController.getCategoryByID(req, res);
});

router.post('/', async (req, res) => {
  // create a new category
  await categoryController.postCategory(req, res);
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  await categoryController.updateCategory(req, res);
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  await categoryController.deleteCategory(req, res);
});

module.exports = router;
