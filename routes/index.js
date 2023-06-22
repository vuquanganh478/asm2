var express = require('express');
const ToyModel = require('../models/ToyStore');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
})
/*get admin page. */
router.get('/adminpage', async(req, res) => {
  var toystore = await ToyModel.find({});
  res.render('adminpage', { toystore: toystore });
})

/*get shopping page. */
router.get('/shoppingnow', async(req, res) => {
  var toystore = await ToyModel.find({});
  res.render('shoppingnow', { toystore: toystore });
})
router.get('/detail/:id', async (req, res) => {
  var toystore = await ToyModel.findById(req.params.id);
  res.render('toy_detail', { toystore : toystore })
})

//delete product
 router.get('/delete/:id', async (req, res) => {
   var id = req.params.id;
   //SQL: DELETE * FROM Book WHERE id = 'id'
   await ToyModel.findByIdAndDelete(id)
     .then(() => { console.log("Delete product succeed !") })
     .catch((err) => { console.log(err) });
   res.redirect('/adminpage');
 })

 //delete all
router.get('/deleteall', async (req, res) => {
   await ToyModel.deleteMany({})
     .then(() => { console.log("Delete all product succeed !") })
     .catch((err) => { console.log(err) });
   res.redirect('/adminpage');
})

//add
router.get('/add', (req, res) => {
  res.render('add');
})

router.post('/add', async (req, res) => {
  var toystore = req.body;
  await ToyModel.create(toystore)
  .then(() => { console.log ('Add new product succeed !')});
  res.redirect('/adminpage');
})

//edir
router.get('/edit/:id', async (req, res) => {
  var toystore = await ToyModel.findById(req.params.id);
  res.render('edit', { toystore : toystore });
})

router.post('/edit/:id', async (req, res) => {
  var id = req.params.id;
  await ToyModel.findByIdAndUpdate(id, {
     name: req.body.name, category: req.body.category, age: req.body.age,
     price: req.body.price, image: req.body.image
  })
     .then(() => { console.log('Edit toy succeed!') });
  res.redirect('/adminpage');
})

router.post('/order', async (req, res) => {
  var id = req.body.id;
  var toystore = await ToyModel.findById(id);
  var order_quantity = req.body.order_quantity;
  var price = req.body.price;
  var total_price = price * order_quantity;
  res.render('order_confirm', { toystore: toystore, order_quantity : order_quantity, total_price : total_price});
})

module.exports = router;
