const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./cfg/routes');  // Importação de rotas

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Rota principal de teste
app.get('/', (req, res) => {
    res.send('API de cadastro está funcionando');
});

// Rota para as rotas de usuários
app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado em http://localhost:${PORT}`);
});