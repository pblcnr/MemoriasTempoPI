const { createClient } =  require('@supabase/supabase-js')

// Create a single supabase client for interacting with your database
const supabase = createClient('https://kdpudcopdpacbpqpkdci.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkcHVkY29wZHBhY2JwcXBrZGNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgxMzgwOTUsImV4cCI6MjAzMzcxNDA5NX0.eJtCmT9luu5f2kJujZl9BMmatRrqULL69N5UpUj7xTs')

// MemoriaTempo12345678$
// postgres://postgres.kdpudcopdpacbpqpkdci:[YOUR-PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres
// project URL:  https://kdpudcopdpacbpqpkdci.supabase.co
// Ano public key:  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkcHVkY29wZHBhY2JwcXBrZGNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgxMzgwOTUsImV4cCI6MjAzMzcxNDA5NX0.eJtCmT9luu5f2kJujZl9BMmatRrqULL69N5UpUj7xTs

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const multer = require('multer');
const sharp = require('sharp');
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
//const storage = multer.memoryStorage();
//const upload = multer({ storage: storage });
const upload = multer({ dest: 'imgs/' });

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

// app.post('v2/addProduct')...

// Rota para cadastrar produto
app.post('/addProduct', upload.single('image'), async (req, res) => {
    const { name, description, category, price, stock } = req.body;
    //const image = req.file;
    //const ext = req.file.mimetype.split('/')[1];
    const filename = req.file.filename; 
    const optimizedImageBuffer = null;
    try {
        const result = await pool.query(
            'INSERT INTO Products (Name, Description, Category, Price, Stock, Image, imageURL) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [name, description, category, price, stock, optimizedImageBuffer, filename]
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

// Rota para conexão on-line - supabase
app.get('/supabase', async (req, res) => {
    try {
        const { data, error } = await supabase
        .from('products')
        .select();
    res.status(200).send(data)
        console.log(data)
    } catch (error) {
        res.status(500).send(error.message)
    }
});

// Rota para servir imagens - ANTIGO
/* app.get('/img/:id', async (req, res) => {
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
}); */

// Rota para servir imagens
app.get('/img/:id', async (req, res) => {
    const { id } = req.params;
    try {
        //const result = await pool.query('SELECT encode(image::bytea, "base64") FROM products WHERE id = $1', [id]);
        const result = await pool.query('SELECT imageurl FROM products WHERE id = $1', [id]);
/*        if (result.rows.length > 0) {
            const image = result.rows[0].image;
            if (Buffer.isBuffer(image)) {
                const imageBase64 = `data:image/jpeg;base64,${image.toString('base64')}`;
                res.send(imageBase64);
            } else {
                console.error(`Erro: a imagem do produto ${id} não é um Buffer.`);
                res.status(500).send('Erro ao converter a imagem para base64');
            }
        } else {
            res.status(404).send('Imagem não encontrada');
        }*/
       res.send(result.rows[0].imageurl);
       console.log(result.rows.im);
    } catch (err) {
        console.error('Erro ao buscar a imagem:', err);
        res.status(500).send('Erro ao buscar a imagem');
    }
});


// Rota para servir o frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
