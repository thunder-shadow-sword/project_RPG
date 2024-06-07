import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from "dotenv";
dotenv.config();

const serviceAccount = process.env.SERVICE_ACCOUNT;

initializeApp({
  credential: cert(serviceAccount)
})

const db = getFirestore();

module.exports = { db };