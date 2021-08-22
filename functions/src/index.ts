import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { createUser } from "./createUser";

type UserRecord = admin.auth.UserRecord;

admin.initializeApp({
  credential: admin.credential.cert(require("../serviceAccountKey.json")),
});

const fn = functions.region("asia-northeast1");

exports.createUser = fn.auth
  .user()
  .onCreate((user: UserRecord) => createUser(user));
