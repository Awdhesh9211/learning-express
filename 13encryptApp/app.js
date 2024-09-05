const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const path=require('path');
const port = 3000;


// bcrypt 
// encryption ==> await bcrypt.hash("password", 10)==>hashedPassword;
// verifying ==>  await bcrypt.compare("password", "hashedPassword");

// Process
// 1. Register store hasPass in db 
// 2. Login    compare enter pass with hashPass which is store in db 

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.render('index', { hashedPassword: '', message: '' });
});

app.post('/hash', async (req, res) => {
  const { password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    res.render('index', { hashedPassword, message: '' });
  } catch (error) {
    res.render('index', { hashedPassword: '', message: 'Error hashing password.' });
  }
});

app.post('/verify', async (req, res) => {
  const { password, hashedPassword } = req.body;
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    const message = match ? 'Password is valid!' : 'Password is invalid.';
    res.render('index', { hashedPassword: '', message });
  } catch (error) {
    res.render('index', { hashedPassword: '', message: 'Error verifying password.' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
