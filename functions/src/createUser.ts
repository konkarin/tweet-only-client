import * as admin from "firebase-admin";
export type UserRecord = admin.auth.UserRecord;

export const createUser = async (user: UserRecord) => {
  const data = {
    name: user.displayName,
    email: user.email,
    emailVerified: user.emailVerified,
    photoURL: user.photoURL,
    phoneNumber: user.phoneNumber,
  };

  const db = admin.firestore();
  const usersCollectionRef = db.collection("users");

  try {
    await usersCollectionRef.doc(user.uid).set(data);

    console.log("Created user: ", user.uid);
  } catch (e) {
    console.error(e);
  }
};
