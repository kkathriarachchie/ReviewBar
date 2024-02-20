const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

mongoose.connect(`mongodb+srv://admin:ABYesaaw1IKHe1yQ@cluster1.ulmqg9d.mongodb.net/?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const reviewSchema = new mongoose.Schema({
  review_id: String,
  rating: String,
  email: String,
  comment: String,
});

const productSchema = new mongoose.Schema({
  upc: String,
  reviews: [reviewSchema],
});

const ProductModel = mongoose.model('Product', productSchema);

app.use(express.json());

// Add a review for a specific product (by UPC)
app.post('/api/add-review/:upc', async (req, res) => {
  try {
    const { upc } = req.params; // Get the UPC from the URL parameter
    const reviewData = req.body; // Review data from the request body

    // Find the product by UPC
    let product = await ProductModel.findOne({ upc: upc });

    if (!product) {
      // If the product with the specified UPC doesn't exist, create a new product
      product = new ProductModel({ upc: upc, reviews: [] });
    }

    // Add the review to the product's reviews array
    product.reviews.push(reviewData);

    // Save the product with the new review
    await product.save();

    // Respond with the updated product
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Retrieve reviews for a specific product (by UPC)
app.get('/api/reviews/:upc', async (req, res) => {
  try {
    const { upc } = req.params; // Get the UPC from the URL parameter

    // Find the product by UPC and return its reviews
    const product = await ProductModel.findOne({ upc: upc });

    if (!product) {
      // Handle the case where the product with the specified UPC doesn't exist
      res.status(404).json({ message: 'Product not found' });
    } else {
      // Respond with the product's reviews
      res.json(product.reviews);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
