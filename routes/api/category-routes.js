const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const rawCategoryData = await Category.findAll({
       include: [{model: Product }]
      });

      const categoryData = rawCategoryData.map((category) =>
      category.get({plain: true}));

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const rawCategoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product}]
    });

    if (!rawCategoryData) {
      res.status(404).json({ message: "Not FOUND" });
      return;
    }
    const categoryData = rawCategoryData.get({plain: true});
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const { categoryName } = req.body;
    await Category.create({category_name: categoryName});
    res.status(200).json({message: "Category created successfully"});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async(req, res) => {
  try {
    const {categoryName} = req.body;
    const updatedCategory = await Category.update(
      {category_name: categoryName},{
      where: {id: req.params.id}
       }
    );
    res.status(200).json({message: "Category updated successfully}"});
  } catch (err) {
    res.status(500).json(err);
  }
});


router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deletedCategory) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json({message: "Category deleted successfully}"});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;