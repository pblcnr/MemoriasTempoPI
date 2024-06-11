const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname))); // Serve arquivos estáticos no mesmo diretório

const dbConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'Memorias',
    password: '123456',
    port: 5432,
};

const pool = new Pool(dbConfig);

pool.connect((err) => {
    if (err) console.error('Erro ao conectar ao banco de dados', err);
    else console.log('Conectado ao banco de dados!');
});

// Configurar multer para upload de arquivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Rota para cadastrar usuário
app.post('/registerUser', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO Users (Username, Email, Password) VALUES ($1, $2, $3)',
            [username, email, password]
        );
        res.send('Usuário cadastrado com sucesso!');
    } catch (err) {
        console.error('Erro no SQL', err);
        res.status(500).send('Erro ao cadastrar usuário');
    }
});

// Rota para Login
app.post('/loginUser', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE username = $1 AND password = $2',
            [username, password]
        );
        if (result.rows.length > 0) {
            res.send('Login realizado com Sucesso.');
        } else {
            res.status(401).send('Credenciais inválidas.');
        }
    } catch (err) {
        console.error('Erro no SQL', err);
        res.status(500).send('Erro ao realizar login');
    }
})

// Rota para cadastrar produto
app.post('/addProduct', upload.single('image'), async (req, res) => {
    const { name, description, category, price, stock } = req.body;
    const image = req.file;
    try {
        const result = await pool.query(
            'INSERT INTO Products (Name, Description, Category, Price, Stock, Image) VALUES ($1, $2, $3, $4, $5, $6)',
            [name, description, category, price, stock, image.buffer]
        );
        res.send('Produto cadastrado com sucesso!');
    } catch (err) {
        console.error('Erro no SQL', err);
        res.status(500).send('Erro ao cadastrar produto');
    }
});

// Rota para listar produtos
app.get('/produtos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        const produtos = result.rows.map(produto => ({
            ...produto,
            imageUrl: `/img/${produto.id}`
        }));
        res.json(produtos);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Rota para servir imagens
app.get('/img/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT Image FROM products WHERE id = $1', [id]);
        if (result.rows.length > 0) {
            const image = result.rows[0].image;
            res.writeHead(200, {
                'Content-Type': 'image/jpeg',
                'Content-Length': image.length
            });
            res.end(image);
        } else {
            res.status(404).send('Imagem não encontrada');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Rota para servir o frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
