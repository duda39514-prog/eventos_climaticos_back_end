const con = require('../db')

const cadastrar = (req, res) => {
    const { nome, email, senha } = req.body
    try {
        const sql = 'INSERT INTO usuario (nome, email, senha) VALUES (?, ?, password(?));'
        con.query(sql, [nome, email, senha], (err, results) => {
            if (err) {
                console.error(err)
                res.status(500).json({ error: 'Erro ao cadastrar usuário' })
            } else {
                const novoUsuario = req.body
                novoUsuario.id = results.insertId
                res.status(201).json({ message: 'Usuário cadastrado com sucesso', user: novoUsuario })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Erro ao cadastrar usuário', details: 'Informe { nome, email, senha }' })
    }
}

const listar = (req, res) => {
    const sql = 'SELECT * FROM usuario;'
    con.query(sql, (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ error: 'Erro ao buscar usuários' })
        } else {
            res.json(results)
        }
    })
}

const excluir = (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM evento WHERE id = ?'
    con.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao excluir o usuario' });
        }else{
        res.status(200).json({ message: 'Usuario excluído com sucesso!' })};
    });
};

const atualizar = (req, res) => {
    const { id } = req.params;
    const {nome, email, senha} = req.body;
    const sql = 'UPDATE evento SET nome = ?, email = ?, senha = ? = ? WHERE id = ?';
    con.query(sql, [nome, email, senha, id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao atualizar o usuario' });
        }else{
        res.status(200).json({ 
            message: 'Usuario atualizado com sucesso!',
            id: id,
            usuarioAtualizado: req.body 
        })};
    });
};
module.exports = {
    cadastrar,
    listar, 
    excluir,
    atualizar
}

