import express from 'express';
import path from 'path';
import { db } from './firebaseConexao.js';
import user from '../static/js/User.js';

const router = express.Router();
const __dirname = path.resolve();

// Configura middleware para servir arquivos estáticos da pasta 'public'
router.use('/static', express.static(path.join(__dirname, 'static')));

router.get('/', async (req, res) => {
  try {
    const peopleRef = db.collection('Users').doc('User');
    const doc = await peopleRef.get();

    if (!doc.exists) {
      res.sendStatus(400);
    } else {
      console.log(doc.data());
      res.status(200).render('login');
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.post('/login', (req, res) => {
  const { user, name, password, email, phone } = req.body;

  // Aqui você pode adicionar lógica para autenticar o usuário usando os dados fornecidos

  res.status(200).redirect('index');
});

router.get('/login', async (req, res) => {
  console.table(user);
  res.render('login');
});

router.post('/rpg-game', (req, res) => {
  res.status(200).render('index');
});

export default router;