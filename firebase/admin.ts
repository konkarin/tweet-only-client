import admin from "firebase-admin";
import { credentials } from "../api/twitter";

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  }),
});

export const verifyIdToken = async (idToken: string) => {
  const decodedIdToken = await admin.auth().verifyIdToken(idToken);
  return decodedIdToken.uid;
};

export const getCredentials = async (uid: string) => {
  // firestoreからuidでcredentilasを取得
  // DEBUG:
  const credentials: credentials = { token: "", secret: "" };
  return credentials;
};
