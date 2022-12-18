const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll(
      {
        include: [{ model: Product, through: ProductTag, as: 'tagProducts' }],
    }
    );
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagID = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: 'tagProducts' }],
  });

    if (!tagID) {
        res.status(404).json({ message: 'Error- No tag found with that id!' });
        return;
    }
    res.status(200).json(tagID);
} catch (err) {
    res.status(500).json(err);
}
});

router.post('/', (req, res) => {
  // create a new tag
  Product.create({
    tag_name: req.body.tag_name
})
.then(newtagData => res.json(newtagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
}); 

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update({tag_name: req.body.tag_name,}, 
      {
    where: {
      id: req.params.id
    },
  });
  res.status(200).json(data);
} catch (err) {
  res.status(500).json(err);
}
});

// router.delete('/:id', async (req, res) => {
//   // delete a category by its `id` value
//   try {
//     const categoryDestroy = await Category.destroy({
//       where: {
//         id: req.params.id
//       }
//     });

//     if (!categoryDestroy) {
//       res.status(404).json({ message: 'No category found with this id!' });
//       return;
//     }

//     res.status(200).json(categoryDestroy);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;