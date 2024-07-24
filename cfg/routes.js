const express = require('express')
const routes = express.Router()

let users = [
    { id: '1', email: 'usuario1@email.com', senha: 'senha123' },
    { id: '2', email: 'usuario2@email.com', senha: 'senha456' },
];

// Listar todos os usuários
routes.get('/usuarios', (req, res) => {
    res.json(users);
});

// Obter um usuário por ID
routes.get('/usuario/:id', (req, res) => {
    const id = req.params.id;
    const user = users.find(u => u.id === id);
    if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.json(user);
});

// Criar um novo usuário
routes.post('/usuario/register', (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    const newUser = {
        id: (users.length + 1).toString(),
        email,
        senha
    };

    users.push(newUser);
    res.status(201).json({ message: 'Usuário cadastrado com sucesso', user: newUser });
});

// Atualizar dados de um usuário
routes.put('/usuario/alterar/:id', (req, res) => {
    const id = req.params.id;
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    let userUpdated = false;
    users = users.map(user => {
        if (user.id === id) {
            user.email = email;
            user.senha = senha;
            userUpdated = true;
        }
        return user;
    });

    if (!userUpdated) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json({ message: 'Usuário atualizado com sucesso', user: { id, email, senha } });
});

// Excluir um usuário
routes.delete('/usuario/excluir/:id', (req, res) => {
    const id = req.params.id;
    const initialLength = users.length;

    users = users.filter(user => user.id !== id);

    if (users.length === initialLength) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json({ message: 'Usuário excluído com sucesso' });
});

module.exports = routes