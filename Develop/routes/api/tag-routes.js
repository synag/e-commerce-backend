const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);

  } catch (err) {
    res.status(500).json(err);
  
  }
});

router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);

  } catch (err) {
    res.status(500).json(err);
  
  }
});

router.post('/', async(req, res) => {
  // create a new tag
  try{
    const tagData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(tagData);

  } catch (err) {
    res.status(500).json(err);
  
  }
});

router.put('/:id',async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const categoryData = await Tag.update(
      {
        tag_name: req.body,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

  } catch (err) {
    res.status(500).json(err);
  
  }
});

router.delete('/:id',async(req, res) => {
  // delete on tag by its `id` value
  try{
    const selectedRow = await Tag.destroy({
      where: {
          id: req.params.id,
      }
  });
  if (!selectedRow) {
      res.status(404).json({ message: 'Unsuccessful delete.' });
      return;
  }
  res.status(200).json(selectedRow);


  } catch (err) {
    res.status(500).json(err);
  
  }
});

module.exports = router;
