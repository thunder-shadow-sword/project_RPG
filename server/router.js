import express from 'express';
import path from 'path';
import { db } from './firebaseConexao.js';
import getUser from '../static/js/User.js';

const router = express.Router();
const __dirname = path.resolve();

const reference = db.collection('Users');
let user = getUser();

// Função para obter os usuários
const getData = async () => {
  const snapshot = await reference.get();
  const users = [];
    
  snapshot.forEach(doc => {
    users.push({ id: doc.id, ...doc.data() });
  });

  return users;
}

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
    res.status(200).render('login');
  } catch (err) { 
    console.error(err);
    res.status(500).send('Erro interno');
  }
});

router.post('/login', async (req, res) => {
  try {
    const params = req.body;
    const isLogin = (params.isLogin) === "true"; // Convert to boolean

    // Obtém os usuários
    const users = await getData();

    if (isLogin) {
      let count = 0;
      for (const user of users) {
        if (user.pessoa.password === params.password && user.pessoa.username === params.username ? true : false) {
          count++;
          if (count > 1) {
          } else {
            user = user;
            console.table(user);
            res.redirect('/index');
            break;
          }
        }
      }

      console.error('Erro ao realizar login:', error);
      res.sendStatus(500);
    } else {
      // Atualiza os dados do usuário com os parâmetros recebidos
      user.pessoa.username = params.username;
      user.pessoa.name = params.name;
      user.pessoa.password = params.password;
      user.pessoa.email = params.mail;
      user.pessoa.phone = params.phone;
      user.avatar.
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
