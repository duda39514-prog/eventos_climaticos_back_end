const express = require("express")
const router = express.Router()

const Usuario = require('./controllers/usuario')
const Evento = require('./controllers/evento')

const rotaInicial = (req, res) => {
    res.json("Back-end Eventos Climáticos respondendo")
}

router.get('/',rotaInicial)
router.post('/usuarios/login', Usuario.login)
router.post('/usuarios', Usuario.cadastrar)
router.get('/usuarios', Usuario.listar)
router.put('/usuarios/:id', Usuario.alterar)
router.delete('/usuarios/:id', Usuario.excluir)

router.post('/eventos', Evento.cadastrar)
router.get('/eventos', Evento.listar)
router.patch('/eventos/:id', Evento.alterar)
router.delete('/eventos/:id', Evento.excluir)
router.get('/eventos/resumo', Evento.resumo)

module.exports = router