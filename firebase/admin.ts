import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    // @ts-ignore
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, "\n"),
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  }),
});

export const verifyIdToken = async (idToken: string) => {
  const decodedIdToken = await admin.auth().verifyIdToken(idToken);
  return decodedIdToken.uid;
};

export const getCredentials = (uid: string) => {
  if (uid === process.env.UID_1) {
    return {
      token: process.env.OAUTH_TOKEN_1,
      secret: process.env.OAUTH_TOKEN_SECRET_1,
    };
  } else if (uid === process.env.UID_2) {
    return {
      token: process.env.OAUTH_TOKEN_2,
      secret: process.env.OAUTH_TOKEN_SECRET_2,
    };
  } else {
    return {
      token: "",
      secret: "",
    };
  }
};
