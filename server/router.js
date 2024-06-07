import express from 'express';
import path from 'path';
import { db } from './firebaseConexao.js';
import getUser from '../static/js/User.js';

const router = express.Router();
const __dirname = path.resolve();

const reference = db.collection('Users');
const user = getUser();

const getData = async () => {
  const snapshot = await reference.get();
  const users = [];
    
  snapshot.forEach(doc => {
    users.push({ id: doc.id, ...doc.data() });
  });
  console.log(users.id, users.avatar, users.pessoa);
}

getData();
// Configura middleware para servir arquivos estáticos da pasta 'public'
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
    const params = req.query;
    const isLogin = params.isLogin; // Convert to boolean
    console.log(isLogin);
    console.log(params);
    if (isLogin) {
      
    } else {
      // Atualiza os dados do usuário com os parâmetros recebidos
      user.pessoa.username = params.username;
      user.pessoa.name = params.name;
      user.pessoa.password = params.password;
      user.pessoa.email = params.mail;
      user.pessoa.phone = params.phone;

      // Converte objetos personalizados em objetos simples
      const pessoaPlainObject = JSON.parse(JSON.stringify(user.pessoa));
      const avatarPlainObject = JSON.parse(JSON.stringify(user.avatar));

      // Adiciona um novo documento à coleção com o ID especificado
      await reference.doc(user.id).set({
        pessoa: pessoaPlainObject,
        avatar: avatarPlainObject
      });

      // Responder com sucesso
      res.redirect('/index');
    }
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    res.sendStatus(500);
  }
});

router.get('/index', async (req, res) => {
  res.status(200).render('index');
});

export default router; // Exporte o roteador e a função getUser