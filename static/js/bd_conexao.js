import { initializeApp } from "firebase/app";
import { ref, set, get, update, remove } from "firebase/database";
import * as admin from 'firebase-admin';
import dotenv from "dotenv";
dotenv.config();

const serviceAccount = process.env.SERVICE_ACCOUNT;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_LINK
});

const db = admin.database();

const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

// Funções para interagir com o banco de dados
async function criarNo(no, dados) {
  const novaRef = ref(db, no);
  await set(novaRef, dados);
}

async function lerNo(no) {
  const refDados = ref(db, no);
  const snapshot = await get(refDados);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    console.log("Nenhum dado disponível");
  }
}

async function atualizarNo(no, dados) {
  const refAtualizar = ref(db, no);
  await update(refAtualizar, dados);
}

async function deletarNo(no) {
  const refDeletar = ref(db, no);
  await remove(refDeletar);
}

const functionsBanco = {
  app,
  criarNo,
  lerNo,
  atualizarNo,
  deletarNo,
  db
};

export default functionsBanco;