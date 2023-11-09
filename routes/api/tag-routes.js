const router = require('express').Router();
const {tagController} = require('../../controllers');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  await tagController.getTags(req, res);
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  await tagController.getTagByID(req, res);
});

router.post('/', async (req, res) => {
  // create a new tag
  await tagController.postTag(req, res);
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  await tagController.updateTag(req, res);
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  await tagController.deleteTag(req, res);
});

module.exports = router;
