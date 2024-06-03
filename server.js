const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');
const multer = require('multer');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const dbConfig = {
    user: 'username',
    password: 'senha',
    server: 'localhost',
    database: 'bancoDeDados',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};

sql.connect(dbConfig, (err) => {
    if (err) console.log(err);
    else console.log('Conectado ao banco de dados!')
});

// Configurar multer para upload de arquivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Rota para cadastrar usuário
app.post('/registerUser', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, password)
            .query('INSERT INTO Users (Username, Email, Password) VALUES (@username, @email, @password)');
        res.send('Usuário cadastrado com sucesso!');
    } catch (err) {
        console.error('SQL error', err);
        res.status(500).send('Erro ao cadastrar usuário');
    }
});

// Rota para cadastrar produto
app.post('/addProduct', upload.single('image'), async (req, res) => {
    const { name, description, category, price, stock } = req.body;
    const image = req.file;
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('name', sql.VarChar, name)
            .input('description', sql.VarChar, description)
            .input('category', sql.VarChar, category)
            .input('price', sql.Decimal, price)
            .input('stock', sql.Int, stock)
            .input('image', sql.VarBinary, image.buffer)
            .query('INSERT INTO Products (Name, Description, Category, Price, Stock, Image) VALUES (@name, @description, @category, @price, @stock, @image)');
        res.send('Produto cadastrado com sucesso!');
    } catch (err) {
        console.error('SQL error', err);
        res.status(500).send('Erro ao cadastrar produto');
    }
});

// Rota para listar produtos
app.get('/produtos', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Produtos`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});