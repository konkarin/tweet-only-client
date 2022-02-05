import admin from "firebase-admin";

// Initialize Firebase
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, "\n"),
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    }),
  });
}

export const verifyIdToken = async (idToken: string) => {
  const decodedIdToken = await admin
    .auth()
    .verifyIdToken(idToken)
    .catch(() => {
      return null;
    });

  if (decodedIdToken == null) return "";

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
