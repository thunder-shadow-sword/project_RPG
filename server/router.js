import dotenv from "dotenv";
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { FieldValue } from 'firebase-admin/firestore';
import { db } from './firebaseConexao.js';

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

router.get('/', async (req, res) => {
    const peopleRef = db.collection('Users').doc('user')
    const doc = await peopleRef.get()
    
    if (!doc.exists) {
        return res.sendStatus(400)
    }
    
    res.status(200).send(doc.data()).redirect(`login`);
});

app.post('/login/:user:name:password:mail:phone:', (req, res) => {
    const { user, name, password, mail, phone } = req.params
    
    res.status(200).render(`index`);
})

// Inicial Rote
router.get('/login', async (req, res) => {
    res.render(`login`);
});

router.post('/rpg-game', (req, res) => {
    res.status(200).render(`index`);
});

module.exports = { router }