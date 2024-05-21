const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'memorias_do_tempo'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

app.post('/addProduct', (req, res) => {
    const { name, description, category, price, stock } = req.body;
    const image = req.file; // Assume that image upload is handled separately

    const query = 'INSERT INTO products (name, description, category, price, stock, image) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [name, description, category, price, stock, image], (err, result) => {
        if (err) throw err;
        res.send('Product added successfully');
    });
});

app.get('/products', (req, res) => {
    const query = 'SELECT * FROM products';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
