const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
  router.get('/', async(req, res) => {
    try {
        const tagData = await Tag.findAll({
            include: [{ model: Product, through: ProductTag}],
        });
        res.status(200).json(tagData);
    } catch (err) {
        res.status(500).json(err);
    }
  });
//   try {
//     const rawTagData = await Tag.findAll({ 
//       include: [{ model: Product, through: ProductTag}],
//     });
//     const tagData = rawTagData.map((tag) => tag.get({plain: true}));
//     res.statusCode(200).json(tagData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/:id', async(req, res) => {
  try {
      const tagId = await Tag.findByPk(req.params.id, {
          include: [{ model: Product, through: ProductTag}],
      });

      if (!tagId) {
          res.status(404).json({ message: 'None found!' });
          return;
      }
      res.status(200).json(tagId);
  } catch (err) {
      res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const { tagName } = req.body;
    await Tag.create({ tag_name: tagName});
    res.status(200).json({message: "tag created successfully"});

  } catch (err) {
    res.status(500).json(err);
  }
});
router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const { tagName } = req.body;
    const updatedTag = await Tag.update({ tag_name: tagName},
       {where: {id: req.params.id}});
       if (!updatedTag[0]) {
        res.json(404).json({ message: "tag not found"});
        return;
       }
       response.status(200).json({ message: "tag updated"});
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedTag = await Tag.destroy(
      {where: {id: req.params.id }}
    );
    if (!deletedTag) {
      request.status(404).json({message: "nothing to delete"});
    }
    res.status(200).json({message: "Deleted successfully"});
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;