const con = require('../db')

const cadastrar = (req, res) => {
    const { id, usuarioId, cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto } = req.body
    try {
        const sql = 'INSERT INTO evento (id, usuarioId, cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto) VALUES(?, ?, ?, ?, ?, ?, ?)'
        con.query(sql, [id, usuarioId, cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto], (err, results) => {
            if (err) {
                console.error(err)
                res.status(500).json({ error: 'Erro ao cadastrar Evento' })
            } else {
                const novoEvento = req.body
                novoEvento.id = results.insertId
                res.status(201).json({ message: 'Evento cadastrado com sucesso', user: novoEvento })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Erro ao cadastrar evento', details: 'Informe { id, usuarioId, cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto}' })
    }
}

const listar = (req, res) => {
    const sql = 'SELECT * FROM evento;'
    con.query(sql, (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ error: 'Erro ao buscar evento' })
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
            res.status(500).json({ error: 'Erro ao excluir o evento' });
        }else{
        res.status(200).json({ message: 'Evento excluído com sucesso!' })};
    });
};

const atualizar = (req, res) => {
    const { id } = req.params;
    const { usuarioId, cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto } = req.body;
    const sql = 'UPDATE evento SET usuarioId = ?, cidade = ?, tipoEvento = ?, temperaturaMaxima = ?, data = ?, nivelImpacto = ? WHERE id = ?';
    con.query(sql, [usuarioId, cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto, id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao atualizar o evento' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Evento não encontrado' });
        }

        res.status(200).json({ 
            message: 'Evento atualizado com sucesso!',
            id: id,
            eventoAtualizado: req.body 
        });
    });
};

module.exports = {
    cadastrar,
    listar, 
    excluir,
    atualizar
}