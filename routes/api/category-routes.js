const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll(
    { include: [{
      model: Product, as: 'products'
    }],}
    );
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryID = await Category.findByPk(req.params.id, {
      include: [{ model: Product, as: 'products' }]
    });

    if (!categoryID) {
      res.status(404).json({ message: 'Error- No categories found with this id!' });
      return;
    }

    res.status(200).json(categoryID);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryPost = await Category.create(req.body);
    res.status(200).json(categoryPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async(req, res) => {
  try {
    const categoryUpdate  = await Category.update ({
      category_name: req.body.category_name,
    }, {
      where: {
        id: req.params.id
      },
    });
   if (!categoryUpdate ) {
      res.status(404).json({ message: 'Error-No categories with this id!'});
      return;
   }
    res.status(200).json(categoryUpdate);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryDestroy = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryDestroy) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryDestroy);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;