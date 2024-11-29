const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
app.use(express.static(path.join(__dirname, 'Frontend')));

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


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
