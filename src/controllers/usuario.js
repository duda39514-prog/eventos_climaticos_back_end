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

const atualizar = (req, res) => {
    const { id } = req.params
    const { nome, email, senha } = req.body

    if (!nome || !email || !senha) {
        return res.status(400).json({
            error: 'Informe nome, email e senha'
        })
    }
    const sql = `
        UPDATE usuario SET nome = ?, email = ?, senha = PASSWORD(?) WHERE id = ?`
    con.query(sql, [nome, email, senha, id], (err, results) => {
        if (err) {
            console.error(err)
            return res.status(500).json({
                error: 'Erro ao atualizar usuário'
            })
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({
                error: 'Usuário não encontrado'
            })
        }

        res.status(200).json({
            message: 'Usuário atualizado com sucesso!',
            id,
            usuarioAtualizado: { nome, email }
        })
    })
}

const excluir = (req, res) => {
    const { id } = req.params

    const sql = 'DELETE FROM usuario WHERE id = ?'

    con.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err)
            return res.status(500).json({
                error: 'Erro ao excluir usuário'
            })
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({
                error: 'Usuário não encontrado'
            })
        }

        res.status(200).json({
            message: 'Usuário excluído com sucesso!'
        })
    })
}

const login = (req, res) => {
    const { email, senha } = req.body

    if (!email || !senha) {
        return res.status(400).json({
            error: 'Informe email e senha'
        })
    }
    const sql = `
        SELECT id, nome, email FROM usuario WHERE email = ? AND senha = PASSWORD(?)`

    con.query(sql, [email, senha], (err, results) => {
        if (err) {
            console.error(err)
            return res.status(500).json({
                error: 'Erro ao realizar login'
            })
        }
        if (results.length === 0) {
            return res.status(404).json({
                error: 'Email ou senha incorretos'
            })
        }
        res.status(200).json({
            message: 'Login realizado com sucesso!',
            usuario: results[0]
        })
    })
}

module.exports = {
    cadastrar,
    listar,
    atualizar,
    excluir,
    login
}