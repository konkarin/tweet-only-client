import { getAuth, signInWithPopup, TwitterAuthProvider } from "firebase/auth";

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
  console.log(result);

  return result.user;
};

export const logoutTwitter = async () => {
  await auth.signOut();
  console.log("sign out");
};
