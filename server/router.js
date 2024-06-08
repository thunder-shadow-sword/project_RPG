import express from 'express';
import path from 'path';
import { db } from './firebaseConexao.js';
import getUser from '../static/js/User.js';

const getUsers = db.collection('Users');
let getDataUser = null;

const router = express.Router();
const __dirname = path.resolve();

const getData = async () => {
    const reference = await getUsers.get();
    const users = [];
    
    reference.forEach(doc => {
        users.push({ id: doc.id, ...doc.data() });
    });
    return users;
};

router.use('/static', express.static(path.join(__dirname, 'static')));

router.get('/', async (req, res) => {
    try {
        res.status(200).redirect('login');
    } catch (err) { 
        console.error(err);
        res.status(500).send('Erro interno');
    }
});

router.get('/login', async (req, res) => {
    try {
        res.status(200).render('login');
    } catch (err) { 
        console.error(err);
        res.status(500).send('Erro interno');
    }
});

router.post('/login', async (req, res) => {
    try {
        const params = req.body;
        const users = await getData();

        const userFound = users.find(user => user.pessoa.password === params.password && user.pessoa.username === params.username);
        if (userFound) {
            getDataUser = userFound;
            return res.status(200).json({ success: true });
        } else {
            return res.status(401).json({ success: false, message: 'Usuário ou senha inválidos' });
        }
    } catch (error) {
        console.error('Erro ao realizar login:', error);
        res.status(500).json({ success: false, message: 'Erro ao realizar login' });
    }
});

router.get('/index', async (req, res) => {
    console.log("Usuário logado!")
    res.status(200).render('index', { user: getDataUser });
});

router.use((req, res) => {
    res.status(404).render('error');
});

export default router;