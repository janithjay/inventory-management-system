import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import e from 'express';

const app = express();
const PORT = 5000;
const JWT_SECRET = "your_secret_key";

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://phdbahasuru:qlZfdD77IUx3xj8G@cluster0.1omwaw2.mongodb.net/InventoryManagementSystem', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Registration Route
app.post('/register', async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isvaildemail = emailRegex.test(email);

  try {
    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }
    else if (isvaildemail == false) {
      return res.status(400).json({ error: "Email is not valid" });
    }
    else if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: "User registration failed" });
    console.log(error);
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid username" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  description: { type: String },
});

const Product = mongoose.model('Product', productSchema);

// Add a Product Route
app.post('/products', async (req, res) => {
  const { name, category, price, quantity, description, update } = req.body;

  try {
    // Check if Product already exists
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({ error: "Product already exists" });

    }
    const newProduct = new Product({ name, category, price, quantity, description });
    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully', product: newProduct });

  } catch (error) {
    console.error('Error saving product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }


});


app.put('/products/:name', async (req, res) => {
  const { name : oldname } = req.params; // Get the current product name from the URL
  const { name, category, price, quantity, description} = req.body;
  console.log("oldname", oldname);
  console.log('Received PUT request for:', req.params);
  try {
    // Check if the product with oldName exists
    const existingProduct = await Product.findOne({ name : oldname });
    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if the new product name already exists (if name is being updated)
    if (name && name !== oldname) {
      const nameConflict = await Product.findOne({ name });
      if (nameConflict) {
        return res.status(400).json({ error: "Product already exists" });
      }
    }

    // Update the fields of the product
    existingProduct.name = name || existingProduct.name;
    existingProduct.category = category || existingProduct.category;
    existingProduct.price = price || existingProduct.price;
    existingProduct.quantity = quantity || existingProduct.quantity;
    existingProduct.description = description || existingProduct.description;

    // Save the updated product    
    const updatedProduct = await existingProduct.save();

    res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct,
    });

    console.log('Product updated successfully:', updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }


});

// Delete a Product Route
app.delete('/products/:name', async (req, res) => {
  const { name } = req.params; // Get the product name from the URL
  
  try {
    // Find the product by name
    const productToDelete = await Product.findOneAndDelete({ name });
    
    if (!productToDelete) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});


// Get all products Route
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from the database
    res.status(200).json(products); // Send the products as a response
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});