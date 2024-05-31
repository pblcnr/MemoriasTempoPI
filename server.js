const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');

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
})

app.get('/produtos', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Produtos`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
})

app.post()