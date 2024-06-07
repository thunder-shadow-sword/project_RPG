import express from 'express';
import path from 'path';
import { db } from './firebaseConexao.js';
import getUser from '../static/js/User.js';

const router = express.Router();
const __dirname = path.resolve();

const reference = db.collection('Users').doc('User');

const user = getUser();
console.log(user);
// Configura middleware para servir arquivos estáticos da pasta 'public'
router.use('/static', express.static(path.join(__dirname, 'static')));

router.get('/', async (req, res) => {
  try {
    const doc = await reference.get();
    res.status(200).redirect('login');
  } catch (err) { 
    console.error(err);
    res.status(500).send('Erro interno');
  }
});

router.get('/login', async (req, res) => { // Obtenha o objeto user
  res.render('login'); // Renderize a página EJS e passe o objeto user como uma variável
});

router.post('/login/:params', async (req, res) => {
  try {
      const params = req.params.params.split('&');
      const user = getUser();

      // Verifica se o usuário existe no banco de dados
      const userRef = db.collection('Users').doc(user.user);
      const doc = await userRef.get();

      if (doc.exists && doc.data().password === user.password) {
          // Se o usuário existe e a senha está correta, redirecione para o índice
          res.redirect('/index');
      } else {
          // Se o usuário não existe ou a senha está incorreta, retorne uma mensagem de erro
          res.status(400).send('Usuário ou senha incorretos');
      }
  } catch (error) {
      console.error('Erro ao realizar login:', error);
      res.sendStatus(500);
  }
});

export default router; // Exporte o roteador e a função getUser