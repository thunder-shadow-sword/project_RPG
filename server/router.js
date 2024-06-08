// imports necessários
import express from 'express';
import path from 'path';
import { db } from './firebaseConexao.js';
import getUser from '../static/js/User.js';

// Configura rotas e locations
const router = express.Router();
const __dirname = path.resolve();

// dados de usuários do banco de dados
const getUsers = db.collection('Users');
let user = getUser();

// Função para obter os usuários
const getData = async () => {
  const reference = await getUsers.get();
  const users = [];
    
  reference.forEach(doc => {
    users.push({ id: doc.id, ...doc.data() });
  });
  return users;
};

// Configura middleware para servir arquivos estáticos da pasta 'public'
router.use('/static', express.static(path.join(__dirname, 'static')));

// Apartir daqui, são configurações de rotas Usando metodos HTTP
// redirecionamento do / to login
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
    // Recependo parametros
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
            res.status(200).redirect('/index');
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
      user.avatar.dados.player = params.name;

      // Converte objetos personalizados em objetos simples
      const pessoaPlainObject = JSON.parse(JSON.stringify(user.pessoa));
      const avatarPlainObject = JSON.parse(JSON.stringify(user.avatar));

      // Adiciona um novo documento à coleção com o ID especificado
      await reference.doc(user.id).set({
        pessoa: pessoaPlainObject,
        avatar: avatarPlainObject
      });

      console.log("novo usuário adicionado com sucesso!");
      // Responder com sucesso
      res.status(200).redirect('/index');
    }
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    res.sendStatus(500);
  }
});

router.get('/index', async (req, res) => {
  res.status(200).render('index');
});

// Rota de captura global para rotas não existentes
router.use((req, res) => {
  res.status(404).render('error');
});

export default router; // Exporte o roteador e a função getUser
