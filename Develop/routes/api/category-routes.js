const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
try{
  const categoryData = await Category.create({
    category_name: req.body.category_name,
  });
  res.status(200).json(categoryData);

} catch (err) {
  res.status(500).json(err);

}

});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const categoryData = await Category.update(
      {
        category_name: req.body,
      },
      {
        where: {
          category_id: req.params.category_id,
        },
      }
    );
  } catch (err) {
    res.status(500).json(err);
  
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const selectedRow = await Category.destroy({
      where: {
          id: req.params.id,
      }
  });
  if (!selectedRow) {
      res.status(404).json({ message: 'None of that stock is owned by this account.' });
      return;
  }
  res.status(200).json(selectedRow);

  } catch (err) {
    res.status(500).json(err);
  
  }
});

module.exports = router;
