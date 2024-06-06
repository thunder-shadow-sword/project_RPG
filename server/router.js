import dotenv from "dotenv";
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
const router = express.Router();
const __dirname = path.resolve();

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Configura o middleware para analisar o corpo das requisições
router.use(express.json());

// Configura o middleware para servir arquivos estáticos da pasta 'public'
router.use('/static', express.static(path.join(__dirname, 'static')));

router.get('/', (req, res) => {
    res.redirect(`/login`);
});

// Inicial Rote
router.get('/login', (req, res) => {
    res.status(200);
    res.render(`login`);
});

router.post('/rpg-game', (req, res) => {
    res.status(200);
    res.render(`index`);
});

export default router;