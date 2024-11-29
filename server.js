const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'Frontend')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/docudemande')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

//user
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  cin: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
}, { timestamps: true });
const User = mongoose.model('User', userSchema);


//Get requests :

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Frontend', 'LandingPage.html')); 
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'Frontend', 'LoginRegister.html')); 
});
app.get('/users', (req, res) => {
    res.sendFile(path.join(__dirname, 'Frontend', 'Users.html')); 
});
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'Frontend', 'Admin.html')); 
});

//Post
// Route to handle registration
app.post('/register', async (req, res) => {
  console.log(req.body);
  const { firstName, lastName, email, address, phone, cin, password, confirmPassword } = req.body;

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).send("Passwords don't match");
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      address,
      phone,
      cin,
      password: hashedPassword
    });

    // Save user to the database
    await newUser.save();

    // Send success response
    res.status(201).send('User registered successfully!');
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).send('Error during registration');
  }
});



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
