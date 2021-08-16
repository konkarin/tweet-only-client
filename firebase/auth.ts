import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  TwitterAuthProvider,
} from "firebase/auth";

export interface credentials {
  token: string;
  secret: string;
}

const provider = new TwitterAuthProvider();
const auth = getAuth();

export const loginTwitter = async () => {
  const result = await signInWithPopup(auth, provider).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode, errorMessage);

    return null;
  });

  if (result == null) return null;

  // const credential = TwitterAuthProvider.credentialFromResult(result);

  // if (credential === null) return null;

  // const token = credential.accessToken;
  // const secret = credential.secret;

  // if (token == null || secret == null) return null;

  return result.user;
};

export const authStateChange = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("signed in", user);
    } else {
      console.log("signed out");
    }
  });
};

export const logoutTwitter = async () => {
  await auth.signOut();
  console.log("sign out");
};
