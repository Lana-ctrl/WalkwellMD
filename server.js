const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root', 
  database: 'Web_project',
  port: 8889
});

// Connect to database
db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));

// Handle form submit (POST)
app.post('/submit-appointment', (req, res) => {
  const { first_name, last_name, email, phone_number, service, message } = req.body;

  const sql = 'INSERT INTO appointments (first_name, last_name, email, phone_number, service, message) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [first_name, last_name, email, phone_number, service, message];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error inserting into DB:', err);
      return res.status(500).send('error');
    }
    res.send('success');
  });
});

// Handle contact form submission (POST)
app.post('/submit-contact', (req, res) => {
    console.log('Received body:', req.body); // <--- ADD THIS LINE

    const { firstName, lastName, gender, language, phoneNumber, email, dob, message } = req.body;
  
    const sql = 'INSERT INTO contact_us (first_name, last_name, gender, language, phone_number, email, dob, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [firstName, lastName, gender, language, phoneNumber, email, dob, message];
    
  
    db.query(sql, values, (err, results) => {
      if (err) {
        console.error('Error inserting into DB:', err);
        return res.status(500).send('error');
      }
      res.send('success');
    });
});


  
  
// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
