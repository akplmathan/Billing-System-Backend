const router = require('express').Router();
const Bill = require('../model/Bill');
const Product = require('../model/ProductModel'); // Make sure to adjust the path to your actual model


router.get('/',(req,res)=>{
    res.send({msg:'hello'})
})
// Route to add a new product
router.post('/add-product', async (req, res) => {
  try {
    const {
      productId,
      name,
      units,
      GST,
      DOM,
      DOE,
      printName,
      pricePerKg,
      price,
      totalStock,
    } = req.body;

    // Check if all required fields are provided
    if (!productId || !name || !units || !price || !totalStock || !DOE || !pricePerKg) {
      return res.json({ msg: 'Fill all required fields' });
    }

    const existingProduct = await Product.findOne({ productId });
    if (existingProduct) {
      return res.json({ msg: 'Product ID already exists' });
    }

    const newProduct = new Product({
      productId,
      name,
      units,
      GST,
      DOM,
      DOE,
      printName,
      pricePerKg,
      price,
      totalStock,
    });

    await newProduct.save();
    res.status(201).json({ msg: 'Product added successfully', product: newProduct });
  } catch (error) {
    res.json({ msg: 'Failed to add product' });
    console.error(error);
  }
});


//get All PRODUCTS
router.get("/getAllProduct", async (req, res) => {
    try {
      const products = await Product.find();
      res.send(products);
    } catch (error) {
      console.log(error.message);
    }
  });


// Route to update a product
router.put('/update-product/:productId', async (req, res) => {
    try {
      const { productId } = req.params;
      const updates = req.body;
  
      // Find the product by productId and update it
      const updatedProduct = await Product.findOneAndUpdate({ productId }, updates, { new: true });
  
      if (!updatedProduct) {
        return res.json({ msg: 'Product not found' });
      }
  
      res.status(201).json({ msg: 'Product updated successfully'});
    } catch (error) {
      res.json({ msg: 'Failed to update product' });
    }
  });



  // Route to delete a product
router.delete('/delete-product/:productId', async (req, res) => {
    try {
      const { productId } = req.params;
  
      // Find the product by productId and delete it
      const deletedProduct = await Product.findOneAndDelete({ productId });
  
      if (!deletedProduct) {
        return res.json({ msg: 'Product not found' });
      }
  
      res.status(200).json({ msg: 'Product deleted successfully' });
    } catch (error) {
      res.json({ msg: 'Failed to delete product'});
    }
  });
  
// Function to generate a random 6-digit bill number
const generateBillNumber = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// POST route to save a bill
router.post('/save', async (req, res) => {
  const { items, totalAmount,customer } = req.body;

  // Generate a unique bill number
  let billNumber;
  let isUnique = false;
  while (!isUnique) {
    billNumber = generateBillNumber();
    const existingBill = await Bill.findOne({ billNumber });
    if (!existingBill) {
      isUnique = true;
    }
  }

  try {
    const newBill = new Bill({
      billNumber,
      items,
      customer,
      totalAmount
    });
    await newBill.save();
    res.status(201).json({msg:'bill saved Successfully',billNumber});
  } catch (error) {
    res.json({msg:error.message });
  }
});


// Fetch billing history
router.get('/history', async (req, res) => {
  try {
    const bills = await Bill.find({}).sort({ date: -1 }); // Sort bills by date, latest first
    res.json({ success: true, bills });
  } catch (error) {
    console.error("Error fetching bills:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
module.exports = router;
