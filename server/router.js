// imports necessários
import express from 'express';
import path from 'path';
import { db } from './firebaseConexao.js';
import getUser from '../static/js/User.js';

// dados de usuários do banco de dados
const getUsers = db.collection('Users');
let user = getUser();
let getDataUser = null;

// Configura rotas e locations
const router = express.Router();
const __dirname = path.resolve();

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

// A partir daqui, são configurações de rotas Usando métodos HTTP

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
    // Recebendo parâmetros
    const params = req.body;
    const isLogin = (params.isLogin) === "true"; // Convert to boolean
    // Obtém os usuários
    const users = await getData();
    // processamento do login
    if (isLogin) {
      let userFound = null;
      for (const user of users) {
        if (user.pessoa.password === params.password && user.pessoa.username === params.username) {
          userFound = user;
          break;
        }
      }
      if (userFound) {
        getDataUser = userFound;
        return res.status(200).redirect('/index');
      } else {
        return res.status(401).render('login', { error: 'Usuário ou senha inválidos' });
      }
    } else {
      // Verificar se o username já existe
      const existingUser = users.find(user => user.pessoa.username === params.username);
      if (existingUser) {
        return res.status(409).render('login', { error: 'Nome de usuário já existe' });
      }

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
      await getUsers.doc(user.id).set({
        pessoa: pessoaPlainObject,
        avatar: avatarPlainObject
      });

      console.log("novo usuário adicionado com sucesso!");
      // Responder com sucesso
      getDataUser = user; // Atualizar getDataUser com o novo usuário
      return res.status(200).redirect('/index');
    }
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    res.status(500).send('Erro ao realizar login');
  }
});

router.get('/index', async (req, res) => {
  res.status(200).render('index');
});

// Rota de captura global para rotas não existentes
router.use((req, res) => {
  res.status(404).render('error');
});

export { router, getDataUser }; // Exporte o roteador e getDataUser